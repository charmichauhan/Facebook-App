import React from 'react';
import {  reduxForm } from 'redux-form';
import {reactLocalStorage} from 'reactjs-localstorage';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {userActions, register} from '../actions/userActions'
import {bindActionCreators} from 'redux';

class Registration extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
                email:'',
                role: 'user'
            },
            submitted: false,
        };
        this.onChange = this.onChange.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
        // console.log('submit', this.state.submitted)
        //  console.log('user', this.state.user)
        // reactLocalStorage.setObject('username',  this.refs.name.value);
        // reactLocalStorage.setObject('email', this.refs.email.value);
        // reactLocalStorage.setObject('role', this.refs.role.value);
        // this.setState({ submitted: true })
        // if(this.state.submitted === true) {
        //     this.props.history.push('/login')
        //}
        handleSubmit(event) {
            event.preventDefault();
            this.setState({ submitted: true });
            const { user } = this.state;
          //  const { dispatch } = this.props;
            if (user.username && user.password && user.email && user.role) {
                debugger
               this.props.register(user);
            }
        }
    onChange (event) {
        this.setState({role: event.target.value});
    }
    render(){
        const {  registering} = this.props;
        const { user, submitted } = this.state;
        return(
            <div className="col-md-6 col-md-offset-3">
                <h2>Register Facebook account here...</h2>
                <form name="form" onSubmit={this.handleSubmit}>

                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input ref="name" type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input ref="password" type="password" className="form-control" name="password" value={user.password}  onChange={this.handleChange} />
                        {submitted && !user.password  &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input ref="email" type="email" className="form-control" name="email" value={user.email}  onChange={this.handleChange} />
                        {submitted && !user.email &&
                        <div className="help-block">Email is required</div>
                        }
                    </div>

                    <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select ref="role" value={this.state.role} onChange={this.onChange} style={{height: '40px', width:'100%'}}>
                        <option selected value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        <button className="btn btn-red">Cancel</button>
                    </div>
                    {registering &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    <div className="form-group">
                        <p style={{float:'left'}}>Already have an account?</p>
                        <Link style={{float:'center'}}to="/login" className="btn btn-link">LogIn</Link>
                    </div>
                </form>
            </div>
        )
    }
}
 function validate(values)
{
    const errors = {};
    // if (!values.email) {
    //     errors.email = 'Email is Required';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = 'Invalid email address';
    // }
    const pass =  /^[A-Za-z]\w{7,12}$/;
    if(!values.password1){
        errors.password1 = 'Password is required'
    }
    else if( !pass.test(values.password1)){
        errors.password1 = 'password length should be greater than 6 characters ans less than 10 characters'
    }
    return errors;
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({register},dispatch);
}

Registration = reduxForm({
    validate,
    form: 'SignupForm',
    destroyOnUnmount:false
})(Registration);

export default connect(mapStateToProps,  {register})(Registration);