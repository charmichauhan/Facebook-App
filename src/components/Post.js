import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getAll, Delete} from "../actions/userActions"
import Like from './Like'
import Comment from './Comment'
import {Card, CardTitle} from 'material-ui/Card';
import {bindActionCreators} from 'redux'

class Post extends React.Component {
    componentDidMount(){
        debugger
        this.props.getAll()
    }
    handleDeleteUser(_id) {
        debugger
        return (e) => this.props.Delete(_id);
    }
    render() {
        const {user, users} = this.props;
        if (!this.props.index) {
            return (
                <div className="container">
                    <div >
                    <div className="col-md-6 col-md-offset-3" style={{flexWrap:'wrap'}}>
                        {users.loading && <em>Loading users...</em>}
                            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                            {users.items &&
                            <Card>
                                {users.items.map((user, index) =>
                                    <div key={user._id}>
                                        <br/><br/>
                                        <h4>{user.username}</h4>
                                        <br/>
                                        <img style={{width: '525px', height: '525px'}} src={user.image}/>
                                        <br/>
                                        <Card>
                                            <CardTitle>
                                                Likes
                                                <Like/>
                                            </CardTitle>
                                        </Card>
                                        <Card>
                                            <CardTitle>
                                                Comments
                                                <Comment/>
                                            </CardTitle>
                                        </Card>
                                       <br/> <br/>
                                        {/*{*/}
                                        {/*user.deleting ? <em> - Deleting...</em>*/}
                                        {/*: user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>*/}
                                        {/*: <span> <a onClick={this.handleDeleteUser(user._id)}>*/}
                                                {/*<i className="fa fa-delete">Delete</i>*/}
                                            {/*</a></span>*/}
                                        {/*}*/}
                                    </div>
                                )}
                            </Card>
                            }
                    <br/>
                    </div>
                    </div>
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
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getAll, Delete}, dispatch);
}
export default connect(mapStateToProps, {getAll, Delete})(Post)

