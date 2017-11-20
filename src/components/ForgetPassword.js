import React, { Component, PropTypes } from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';
import { Field, reduxForm } from 'redux-form';
//import {getById} from '.././actions/userActions'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';

class ForgetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
                old_password: '',
                new_password: '',
            submitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        //alert('Your password changed successfully')
        event.preventDefault();
        this.setState({ submitted: true });
        debugger
        if (this.state.new_password ) {
            debugger
            this.props.history.push('/login')
        }

        // this.setState({ submitted: true })
        // console.log("Fdg")
        // if(this.state.submitted === true) {
        //     this.props.history.push('/login')
        // }
    }
    render() {

        const { old_password, new_password ,submitted} = this.state;
        const user = reactLocalStorage.getObject('user');
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Forgot Password?</h2>
                            <form name="form" onSubmit={this.handleSubmit}>

                                <label htmlFor="old_password">Old password</label>
                                <div className={'form-group' + (submitted && !old_password ? ' has-error' : '')}>
                                    <input type="text" value= {user.user.password} className="form-control" name="old_password" />
                                    {submitted && !old_password &&
                                    <div className="help-block">Password is required</div>
                                    }
                                </div>

                                <label htmlFor="new_password">New password</label>
                                <div className={'form-group' + (submitted && !new_password ? ' has-error' : '')}>
                                    <input type="password" className="form-control" name="new_password" />
                                    {submitted && !new_password &&
                                    <div className="help-block">Enter your new password</div>
                                    }
                                </div>
                                <div className="form-group">
                                     <button className="btn btn-primary">Submit</button>
                                </div>
                            </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if(!values.old_password){
        errors.old_password = "Password is required"
    }
    if(!values.new_password){
        errors.new_password = "Please enter your new Password"
    }
    return errors;
}
// function mapStateToProps(state) {
//     const {  users, authentication } = state;
//     const { user } = authentication;
//     return {
//         user,
//         users
//     };
// }
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ getById}, dispatch);
// }
//export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);

export default ForgetPassword

