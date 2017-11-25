import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {comments} from "../actions/userActions"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {bindActionCreators} from 'redux';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0 , showMe: false, value:''};
        this.increaseCount = this.increaseCount.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    getInitialState() {
        return {
            value: this.props.name
        };
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    showComment() {
        alert('comment');
        return(
            <div>
                <p>{this.state.value}</p>
            </div>
        )
    }
    increaseCount(){
        this.setState((preState) => {
            return {
                count : preState.count + 1
            };
        })
        debugger
        console.log('value:', this.state.value)
        this.props.comments(this.state.value);
    }
    render() {
            return (
                <div>
                    <div>
                    <p style={{float:'left'}}> {this.state.count}</p>
                    <img
                        style={{width: '25px', height: '25px',float: 'left'}}
                        src="https://meta.stackexchange.com/content/Sites/stackexchangemeta/img/apple-touch-icon@2.png?v=c34d758b103d" />
                    </div>
                    <br/>
                    <div style={{float:'left'}}>
                        <textarea
                            id="comment"
                            name="textarea"
                            value={this.state.value}
                            onChange={this.handleChange}
                            style={{borderColor: '#AED6F1', borderRadius: '10px'}}
                            rows="2" cols="20">
                            Enter comments</textarea>
                    </div>
                    <button style={{float:'left'}} className="btn btn-primary"
                            onSubmit={this.showComment}
                            onClick={this.increaseCount}>Enter</button>
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
    return bindActionCreators({comments}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)