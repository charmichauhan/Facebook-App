import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getAll, Delete, getImage} from "../actions/userActions"
import Like from './Like'
import Comment from './Comment'
import {Card, CardTitle} from 'material-ui/Card';
import {bindActionCreators} from 'redux'

class Post extends React.Component {
    componentDidMount(){
        debugger
        this.props.getAll()
        debugger
        this.props.getImage
        // const {user} = this.props;
        // console.log('name', user.username)
    }
    handleDeleteUser(_id) {
        debugger
       // console.log('id', _id)
        return (e) => this.props.Delete(_id);
    }
    render() {
        const {user, users} = this.props;
        if (!this.props.index) {
            return (
                <div className="container">
                    <Card >
                    <div className="col-md-6 col-md-offset-3 " style={{flexWrap:'wrap'}}>
                        <CardTitle>
                        </CardTitle>
                        {users.loading && <em>Loading users...</em>}
                            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                            {users.items &&
                            <div>
                                {users.items.map((user, index) =>
                                    <div key={user._id}>
                                        {user.username}
                                        {/*{*/}
                                        {/*user.deleting ? <em> - Deleting...</em>*/}
                                        {/*: user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>*/}
                                        {/*: <span> - <a onClick={this.handleDeleteUser(user._id)}>Delete</a></span>*/}
                                        {/*}*/}
                                    </div>
                                )}
                            </div>
                            }
                    <br/>
                    <img style={{width: '450px', height: '450px'}}
                         src="http://www.startupremarkable.com/wp-content/uploads/2015/02/a-book-a-week-image.jpg"/>
                        <Card>
                            <CardTitle>
                                Likes
                                <Like/>
                            </CardTitle>
                        </Card>
                            <br/>
                        <Comment/>
                        <br/>
                    </div>
                    </Card>
                 </div>
            );
        }
        else{
            return<div></div>
        }
    }
}
function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users,
        image:  state.image
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getAll, Delete, getImage}, dispatch);
}
export default connect(mapStateToProps, {getAll, Delete, getImage})(Post)

