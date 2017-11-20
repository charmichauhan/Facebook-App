import React from 'react';
import {Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {update, getById} from "../actions/userActions"
import {bindActionCreators} from 'redux'
import ReactAvatarEditor from 'react-avatar-editor'
import {Card, CardTitle} from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {reactLocalStorage} from 'reactjs-localstorage';
import {persistStore} from 'redux-persist'
import  store  from 'redux'
//import 'react-datepicker/dist/react-datepicker.css';
// import { Link } from 'react-router';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
                email:'',
                role: '',
                image:'',
            },
            images:'',
            submitted: false,
            startDate: moment(),
            allowZoomOut: false,
            position: {x: 0.5, y: 0.5},
            scale: 1,
            rotate: 0,
            borderRadius: 0,
            preview: null,
            width: 200,
            height: 200
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.onChange = this.onChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(_id){
        // persistStore(store, {}, () => {
        const {user} = this.props
        console.log('user', user)
        debugger
            console.log('Oldimage', user.user.image)
        //  })
    }
    handleUser(_id){
        return (e) => getById(_id);
    }
    handleChange1(date) {
        this.setState({
            startDate: date
        });
    }
    handleNewImage = e => {
        // const { name, value } = event.target;
        // const { user } = this.state;
        // this.setState({
        //     user: {
        //         image: e.target.files[0],
        //         ...user,
        //         [name]: value
        //     }
        // });
        // this.setState({images: e.target.files[0]})
        this.state.images = e.target.files[0]
        // var images = e.target.files[0]
         console.log('image',this.state.images)
       // user.user.image = images
    }
    // handleSave =data => {
    //     debugger
    //     const img = this.editor.getImageScaledToCanvas().toDataURL()
    //     console.log('img', img)
    //     //const rect = this.editor.getCroppingRect()
    //     this.setState({
    //         preview: {
    //             img,
    //            // rect,
    //             scale: this.state.scale,
    //             width: this.state.width,
    //             height: this.state.height,
    //             borderRadius: this.state.borderRadius
    //         }
    //     })
    // }
    setEditorRef = (editor) => this.editor = editor
    onClickSave = () => {
        debugger
        if (this.editor) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            const canvas = this.editor.getImage()
            console.log('canvas', canvas)
            const url = canvas.toDataURL('image/jpeg', 0.5);
           //const url = (canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, ''))
            console.log('image-url--',url)
            this.downloadURI(url, "profile_image");
            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
            // const canvasScaled = this.editor.getImageScaledToCanvas()
            // console.log('scaled', canvasScaled
        }
    }
     downloadURI(url, name) {
        debugger
        var link = document.createElement("a");
         console.log('link',link)
         console.log('name',name)
         link.download = name;
         console.log('url',url)
         link.href = url;
        document.body.appendChild(link);
        link.click();
        // document.body.removeChild(link);
        // delete link;
    }
    static childContextTypes =
        {
            muiTheme: React.PropTypes.object
        }
    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        }
    }
    onChange (event) {
        this.setState({role: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        debugger
        this.setState({ submitted: true });
        console.log(this.state.user)
        const { user } = this.state;
         if (user.username && user.password && user.email && user.role && user.image) {
            debugger
           update(user);
        }
    }
    //updateUser() {
        // const {user} = this.props;
        // var persons = JSON.parse(localStorage.user);
        // console.log('persons', persons)
        // console.log('user', user.user)
       // localStorage.setItem("user", JSON.stringify(user));  //put the object back
   // }
    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user.user,
                [name]: value
            }
        });
    }
    render() {
        const user = reactLocalStorage.getObject('user');
        // const getUsername = ({input}) => {
        //     const user = reactLocalStorage.getObject('user');
        //     for (var prop in user.user) {
        //         //console.log('  ' + prop + ': ' + user.user[prop]);
        //         console.log('---',user.user.username)
        //     }
        // }
        const {url, users} = this.props;
        const {  submitted } = this.state;
        return (
                <div className="container">
                    <Card>
                        <div className="col-md-6 col-md-offset-3">
                            <h3 style={{fontColor:'#3498DB'}}>Change Profile Photo</h3>
                            <br/>
                            <ReactAvatarEditor
                                //onSave={this.onClickSave}
                                ref={this.setEditorRef}
                                image={this.state.images || user.user.image}
                            />
                            {users.items &&
                            <ul>
                                {users.items.map((user, index) =>
                                    <div key={user._id}>
                                        {this.handleUser(user._id)}
                                    </div>
                                )}
                            </ul>
                            }
                            <br/>
                            <p> To change profile image, click</p>
                            <input name='newImage' type='file' onChange={this.handleNewImage}/>

                            <input type='button' className="btn btn-primary" onClick={this.onClickSave} value='Download' />
                            {/*url to view profile{url}*/}
                                <h2>Update your profile here...</h2>
                                <form  onSubmit={this.handleSubmit}>

                                    <div className={'form-group' + (submitted && !user.user.username ? ' has-error' : '')}>
                                        <label htmlFor="username">Username</label>
                                            <input type="text" className="form-control" name="username" value={user.user.username } onChange={this.handleChange}/>
                                            {submitted && !user.user.username &&
                                            <div className="help-block">Username is required</div>
                                            }
                                    </div>

                                    <div className={'form-group' + (submitted && !user.user.email ? ' has-error' : '')}>
                                        <label htmlFor="email">Email</label>
                                        <input ref="email" type="email" className="form-control" name="email"  value={user.user.email} onChange={this.handleChange}/>
                                        {submitted && !user.user.email &&
                                        <div className="help-block">Email is required</div>
                                        }
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="role">Role</label>
                                        <select ref="role" value={user.user.role} onChange={this.onChange} style={{height: '40px', width:'100%'}}>
                                            <option selected value="User">User</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>

                                    <div className="form-group" >
                                        <label htmlFor="birthdate">Birth Date</label>
                                        <DatePicker
                                            className="setheight"
                                            fixedHeight = {true}
                                            selected={this.state.startDate}
                                            onChange={this.handleChange1}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-primary">Update</button>
                                        <button className="btn btn-red">Cancel</button>
                                    </div>

                                    {/*<button onClick={this.updateUser} >User</button>*/}
                            </form>
                        </div>
                    </Card>
                </div>

        );
    }
}

EditProfile = reduxForm({
    form: 'UpdateForm',
    destroyOnUnmount:false
})(EditProfile);

function mapStateToProps(state) {
    const {  users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({update, getById, update}, dispatch);
}
export default connect(mapStateToProps, {update, getById, update})(EditProfile)