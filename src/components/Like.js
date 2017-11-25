import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {likes} from "../actions/userActions"
import {bindActionCreators} from 'redux'

class Like extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
        this.increaseCount = this.increaseCount.bind(this);
    }
    increaseCount(){
        this.setState((preState) => {
            return {
                count : preState.count + 1
            };
        });
        debugger
        console.log('count', this.state.count + 1)
        const counts = this.state.count + 1
        this.props.likes();
    }

    render() {
        return (
            <div>
                <p style={{float:'left'}}> {this.state.count}</p>
                <img
                    onClick={this.increaseCount}
                    style={{width: '25px', height: '25px',float: 'left'}}
                    src="http://images.clipartpanda.com/like-clipart-facebook-like-clipart-1.jpg" />
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
    return bindActionCreators({likes}, dispatch)
}
export default connect(mapStateToProps, {likes})(Like)