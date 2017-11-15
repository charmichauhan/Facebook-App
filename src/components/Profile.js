import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getById} from "../actions/userActions";
import {bindActionCreators} from 'redux'

class Profile extends React.Component {
    handleUser(_id){
        debugger
        //console.log('id_profile', _id)
        const {user} = this.props
        console.log('name_profile',user.user.username )
        debugger
        return (e) => getById(_id);
    }
    render() {
        const {user, users} = this.props
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>My Profile</h1>
                <p>Hi! {user.user.username}</p>
                <br/>
                <p>Your Email-id: {user.user.email}</p>
                <br/>
                <p>You are a: {user.user.role}</p>
                {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <div key={user._id}>
                            {this.handleUser(user._id)}
                        </div>
                    )}
                </ul>
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    const {  users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getById},dispatch);
}
export default connect(mapStateToProps,{getById} )(Profile)

// onImageChange={this.onClickSave}
//onImageChange = {this.handleSave}
//ref={this.setEditorRef}
// onClickSave = () => {
//     debugger
//     if (this.editor) {
//         // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
//         // drawn on another canvas, or added to the DOM.
//         const canvas = this.editor.getImage()
//         console.log('canvas', canvas)
//         const url = canvas.toDataURL();
//         // If you want the image resized to the canvas size (also a HTMLCanvasElement)
//         const canvasScaled = this.editor.getImageScaledToCanvas()
//         console.log('scaled', canvasScaled)
//     }
// }
// setEditorRef = (editor) => this.editor = editor