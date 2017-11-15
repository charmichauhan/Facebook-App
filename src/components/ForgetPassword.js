import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

class ForgetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
                old_password: '',
                new_password: '',
            submitted: false
        };
    }
    handleSubmit() {
        alert('Your password changed successfully')
        // this.setState({ submitted: true })
        // console.log("Fdg")
        // if(this.state.submitted === true) {
        //     this.props.history.push('/login')
        // }
    }
    render() {

        const { old_password, new_password ,submitted} = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Forgot Password?</h2>
                            <form name="form" onSubmit={this.handleSubmit}>

                                <label htmlFor="old_password">Old password</label>
                                <div className={'form-group' + (submitted && !old_password ? ' has-error' : '')}>
                                    <input type="password" className="form-control" name="old_password" />
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

function mapStateToProps({user}) {
    return {
        user: user,

    }
}



export default ForgetPassword;


