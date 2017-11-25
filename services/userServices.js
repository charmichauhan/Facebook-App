import { authHeader } from './authHeader';
import {reactLocalStorage} from 'reactjs-localstorage';

export const userService = {
    login,
    logout,
    register,
    getAll,
     getById,
    update,
    Delete,
    likes,
    comments
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    debugger
    return fetch('http://localhost:5000/login/data', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            debugger
            if (user && user.token) {
                console.log('user-token', user.token)
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    debugger
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    debugger
    return fetch('http://localhost:5000/data', requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    debugger
    return fetch('http://localhost:5000/data', requestOptions).then(handleResponse);
}

function getById(_id) {
    const requestOptions = {
        method: 'GET',
         headers: authHeader()
    };
     debugger
     return fetch('http://localhost:5000/data/' + _id, requestOptions).then(handleResponse);
}

function update(user) {

    const user1 = reactLocalStorage.getObject('user');
    console.log('username', user1.user.username)
    //console.log('user---', user)
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    debugger
    return fetch('http://localhost:5000/data/' + user1.user._id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function Delete(_id) {
    const requestOptions = {
        method: 'DELETE',
         headers: authHeader()
    };
    return fetch('http://localhost:5000/data/' + _id, requestOptions).then(handleResponse);
}

function likes() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        //body: JSON.stringify()
    }
    debugger
    return fetch('http://localhost:5000/postLikes', requestOptions).then(handleResponse)
}

function comments(comment) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(comment)
    }
    debugger
    return fetch('http://localhost:5000/comments', requestOptions).then(handleResponse)
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return response.json();
}