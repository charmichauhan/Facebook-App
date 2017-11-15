import React from 'react';
import Registration from "./components/Registration";
import Login from "./components/Login";
import { Router , Route ,browserHistory  } from 'react-router';
import ForgetPassword from "./components/ForgetPassword";
import Dashboard from "./components/Dashboard";
import EditProfile from "./components/EditProfile";
import Profile from "./components/Profile";

class Routes extends React.Component {
    render() {
        return(
        <div>
            <Router history={browserHistory}>
                <Route path="/" component={Registration}/>
                <Route path="/login" component={Login} />
                <Route path="/forgot_password" component={ForgetPassword} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/edit_profile" component={EditProfile} />
                <Route path="/my_profile" component={Profile} />
                <Route path="/url" component="" />

            </Router>
        </div>
)}

}
export default Routes