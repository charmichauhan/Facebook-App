import React ,{PropTypes} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
 import {  getById } from ".././actions/userActions"
import Post from './Post';
import {Tabs, Tab} from 'material-ui/Tabs';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Profile from "./Profile";
import {bindActionCreators} from 'redux'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FileFolder from 'material-ui/svg-icons/file/folder';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
        width: 100
    },
};
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
            active: true,
            open: false,
            valueSingle: '3',
        };
    }
    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };
    static childContextTypes =
        {
            muiTheme: React.PropTypes.object
        }
    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        }
    }
    handleChangeSingle = (event, value) => {
        this.setState({
            valueSingle: value,
        });
        console.log(this.state.valueSingle)
    };
    render() {
        const {user} = this.props
        return (
            <Card>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab styles={styles.headline}
                         label="Home"
                        // icon={<i className="fa fa-home"></i>}
                        // icon={<FontIcon className="muidocs-icon-action-home" />}
                        //icon={<FontIcon><i className="muidocs-icon-action-home" style={{color: 'white'}}></i></FontIcon>}
                        // onActive={this.loadData}
                        >
                            <Post />
                    </Tab>
                    <Tab styles={styles.headline}
                        // icon={<IconButton><MoreVertIcon /></IconButton>}
                        label="Settings"
                        onActive={this.handleChangeSingle}
                        value={this.state.valueSingle}
                    >
                           <MenuItem containerElement={<Link to="/edit_profile" />}
                               value="2" primaryText="Edit Profile" />
                            <MenuItem containerElement={<Link to="/login" />}
                                      value="3" primaryText="Sign out" />
                    </Tab>
                    <Tab
                        styles={styles.headline}
                         icon= { <Avatar
                             src={user.user.image} />}
                        label={user.user.username}
                    >
                        <Profile/>
                    </Tab>
                </Tabs>

                </Card>
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)