import React from 'react';
import { connect } from 'react-redux';
import { getById} from "../actions/userActions";
import {bindActionCreators} from 'redux'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
const customContentStyle = {
    width: '50%',
    maxWidth: 'none',
};
class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            open: false
        }
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    handleUser(_id){
        debugger
        //console.log('id_profile', _id)
        const {user} = this.props
        console.log('name_profile',user.user.username )
        debugger
        return (e) => getById(_id);
    }
    handleSubmit1(){
            debugger
            this.props.history.push('/edit_profile')
    }
    handleOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {
      //  alert('submit')
        const {user} = this.props;
        axios.get('http://localhost:5000/data/'+ user.user._id, {
          //  method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.user.email,
                // then continue this with the other inputs, such as email body, etc.
            })
        })
        //.then((response) => response.json())
        //console.log('response', response)
            .then((responseJson) => {
                console.log('formsent')
                if (responseJson.success) {
                    console.log('formsent1')
                    this.setState({formSent: true})
                }
                else this.setState({formSent: false})
            })
            .catch((error) => {
                console.error(error);
            });
        this.setState({open: false});
    };
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleClose}
            />,
        ];
        const {user, users} = this.props
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>My Profile</h1>
                <p>Hi! {user.user.username}</p>
                <br/>
                <p>Your Email Id is {user.user.email}</p>
                <br/>
                <p>You are a {user.user.role}</p>
                <br/>
                <p>Your profile image:
                    <br/>
                    <img style={{width: '300px', height: '300px'}}
                         src={user.user.image}/>
                </p>
                {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <div key={user._id}>
                            {this.handleUser(user._id)}
                        </div>
                    )}
                </ul>
                }
                <div>
                <RaisedButton label="Change Profile image" href="/edit_profile" backgroundColor="#3498DB"/>
                </div>
                <br/>
                {/*sendgrid page to send email to admin for delete req*/}
                <RaisedButton label="Want to delete account?" onClick={this.handleOpen} backgroundColor="white"/>
                <Dialog
                    title="Send mail"
                    actions={actions}
                    modal={true}
                    contentStyle={customContentStyle}
                    open={this.state.open}
                >
                Your mail is send to Admin regarding request for deleting your account.
                </Dialog>
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
    return bindActionCreators({getById}, dispatch);
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

// <Modal class="modal fade" id="contactsend" role="dialog">
//     <div class="modal-dialog">
//     <div class="modal-content">
//     <form class="form-horizontal">
//     <div class="modal-header">
//     <h4>Send Confirmation</h4>
// </div>
// <div class="modal-body">
//     <div class="form-group">
//     <p>Your message has been send successfully.</p>
// </div>
// </div>
// <div class="modal-footer">
//     <a class="btn btn-primary" data-dismiss="modal">Close</a>
//     </div>
//     </form>
//     </div>
//     </div>
//     </Modal>