import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userActions} from "../actions/userActions"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0 , showMe: false};
       // this.openTextarea = this.openTextarea.bind(this);
        this.increaseCount = this.increaseCount.bind(this);
    }
    increaseCount(){
        this.setState((preState) => {
            return {
                count : preState.count + 1
            };
        });
    }
    render() {
            return (
                <Card>
                    <CardTitle>
                    Comments
                    </CardTitle>
                    <p style={{float:'left'}}> {this.state.count}</p>
                    <img
                        style={{width: '25px', height: '25px',float: 'left'}}
                        src="https://meta.stackexchange.com/content/Sites/stackexchangemeta/img/apple-touch-icon@2.png?v=c34d758b103d" />
                    <br/>
                    <div style={{float:'left'}}><textarea style={{borderColor: '#AED6F1', borderRadius: '10px'}} rows="2" cols="20">Enter comments</textarea></div>
                    <button style={{float:'left'}} className="btn btn-primary" onClick={this.increaseCount}>Enter</button>
                </Card>
            );
    }
}
export default Comment