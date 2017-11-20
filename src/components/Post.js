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
        debugger
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
                    <Card >
                    <div className="col-md-6 col-md-offset-3 " style={{flexWrap:'wrap'}}>
                        {users.loading && <em>Loading users...</em>}
                            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                            {users.items &&
                            <div>
                                {users.items.map((user, index) =>
                                    <div key={user._id}>
                                        <br/><br/>
                                        {user.username}
                                        <br/>
                                        <img style={{width: '350px', height: '350px'}} src={user.image}/>
                                        <br/>
                                        <Card>
                                            <CardTitle>
                                                Likes
                                                <Like/>
                                            </CardTitle>
                                        </Card>
                                        <br/>
                                        <Comment/>
                                        <br/> <br/> <br/>
                                        {/*{*/}
                                        {/*user.deleting ? <em> - Deleting...</em>*/}
                                        {/*: user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>*/}
                                        {/*: <span> <a onClick={this.handleDeleteUser(user._id)}>Delete Post</a></span>*/}
                                        {/*}*/}
                                    </div>
                                )}
                            </div>
                            }
                    <br/>
                    </div>
                    </Card>
                 </div>
            );
        }
        else{
            return<div> </div>
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

