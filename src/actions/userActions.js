import { userConstants } from './userConstants';
import { userService } from '../../services/userServices';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
import {alertActions} from './alertActions'

// export const userActions = {
//     logout,
//     register,
//     getAll,
//     getById,
//     delete: _delete,
// };

export const login = (email, password) => dispatch => {
        debugger
        dispatch(request({ email,password }));
        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    debugger
                    history.push('/dashboard');
                    dispatch(alertActions.success('Login successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
};

export const  logout= ()=> {
    debugger
    userService.logout();
    return { type: userConstants.LOGOUT };
}

export const register=(user)=> {
    return dispatch => {
        dispatch(request(user));
            debugger
        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

 export const getAll=()=> {
    return dispatch => {
        dispatch(request());
        debugger
        userService.getAll()
            .then(
                users => {
                    dispatch(success(users)),
                        dispatch(alertActions.success('Get all users successfully'));
                },
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

export const getImage=()=> {
    return dispatch => {
        dispatch(getImage());
        debugger
        userService.getImage()
            .then(
                image => {
                    dispatch(success(image)),
                        dispatch(alertActions.success('Get image successfully'));
                },
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: userConstants.GET_IMAGE_REQUEST } }
    function success(image) { return { type: userConstants.GET_IMAGE_SUCCESS, image } }
    function failure(error) { return { type: userConstants.GET_IMAGE_FAILURE, error } }
}

export const getById=(_id)=> {
    return dispatch => {
        dispatch(request(_id));
        debugger
        userService.getById(_id)
            .then(
                users => {
                    dispatch(success(_id)),
                        dispatch(alertActions.success('Get user successfully'));
                },
                error => dispatch(failure(_id, error))
            );
    };
    function request(_id) { return { type: userConstants.GETBYID_REQUEST,_id } }
    function success(_id) { return { type: userConstants.GETBYID_SUCCESS, _id } }
    function failure(_id, error) { return { type: userConstants.GETBYID_FAILURE, _id, error } }
}

export const update=(user)=> {
    return dispatch => {
        dispatch(request(user));
        debugger
        userService.update(user)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success('Update successfully'));
                },
                error => {
                    dispatch(failure(user, error));
                }
            );
    };
    function request(_id) { return { type: userConstants.UPDATE_REQUEST, _id } }
    function success(_id) { return { type: userConstants.UPDATE_SUCCESS, _id } }
    function failure(_id, error) { return { type: userConstants.UPDATE_FAILURE, _id, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
export const Delete=(_id)=> {
    return dispatch => {
        dispatch(request(_id));
        userService.Delete(_id)
            .then(
                user => {
                    dispatch(success(_id));
                    dispatch(alertActions.success('Delete successfully'));
                },
                error => {
                    dispatch(failure(_id, error));
                }
            );
    };
    function request(_id) { return { type: userConstants.DELETE_REQUEST, _id } }
    function success(_id) { return { type: userConstants.DELETE_SUCCESS, _id } }
    function failure(_id, error) { return { type: userConstants.DELETE_FAILURE, _id, error } }
}

export const registerImage=(image)=> {
    return dispatch => {
        dispatch(request(image));
        debugger
        userService.registerImage(image)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('Image Saved successfully'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(image) { return { type: userConstants.REGISTER_IMG_REQUEST, image } }
    function success(image) { return { type: userConstants.REGISTER_IMG_SUCCESS, image } }
    function failure(error) { return { type: userConstants.REGISTER_IMG_FAILURE, error } }
}

export const likes=(counts)=>{
    return dispatch => {
        dispatch(request(counts));
        debugger
        userService.likes(counts)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('Number of likes saved successfully'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(counts) { return { type: userConstants.LIKES_REQUEST, counts } }
    function success(counts) { return { type: userConstants.LIKES_SUCCESS, counts } }
    function failure(error) { return { type: userConstants.LIKES_FAILURE, error } }
}

export const comments=()=>{
    return dispatch => {
        dispatch(request());
        debugger
        userService.comments()
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success(''));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request() { return { type: userConstants.COMMENTS_REQUEST } }
    function success() { return { type: userConstants.COMMENTS_SUCCESS } }
    function failure(error) { return { type: userConstants.COMMENTS_FAILURE, error } }
}


