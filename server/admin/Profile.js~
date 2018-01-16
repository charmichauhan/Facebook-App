import React , {PropTypes} from 'react';
import { connect } from 'react-redux';
import { getById, getAll, Delete, update} from "../actions/userActions";
import {bindActionCreators} from 'redux'
import ReactPaginate from 'react-paginate';
import Tabelify from './Tabelify';

import _ from 'lodash';
let dataU = [];
// const obj = this.state.pancardImage;
// console.log('obj',obj)
// debugger;
// this.formData.append('profile_pic', this.props.mappedObj.obj)
// console.log(this.props.mappedObj.obj)
//let dataU = null;
class Profile extends React.Component {

    constructor(props){
        console.log('super');
        super();
        this.state = {
            open: false,
            tableConfig: {
                columnMetadata: [
                    {
                        "columnName": "username",
                        "displayName": "Username",
                    },
                    {
                        "columnName": "email",
                        "displayName": "EmailID"
                    },
                    ],
                    data:[
                        {
                        'username':'c',
                        'email':'c'
                        },
                        {
                            'username':'a',
                            'email':'a'
                        },
                        {
                            'username':'b',
                            'email':'b'
                        },
                        {
                            'username':'d',
                            'email':'d'
                        },
                        {
                            'username':'z',
                            'email':'z'
                        },
                        {
                            'username':'x',
                            'email':'x'
                        },
                        {
                            'username':'y',
                            'email':'y'
                        },
                        {
                            'username':'cc',
                            'email':'cc'
                        }
                ],
                // data:[dataU],
                currentPage: 1,
                showCheckbox: true,
                onChangeGrid: this.onChangeGrid,
                selectedRows: {},
                onRowClick: this.onRowClick,
                resultsPerPage: 5,
                // CustomRow: require('./CustomRow.js'),
                // CustomHeader: require('./CustomHeader'),
                showHeader:true,
                showFooter: true,
                localSearch: true,
                fixedHeight:'100%',
                width: '425px'
            },
        }
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.onChangeGrid = this.onChangeGrid.bind(this);
    }
    onChangeGrid(event, data) {
        debugger
        var tableConfig = this.state.tableConfig;
        _.extend(this.state.tableConfig, data);
        this.setState({
            tableConfig: tableConfig
        });
    }
    componentDidMount(){
        this.props.getAll()
    }
    handleDeleteUser(_id) {
        return (e) => this.props.Delete(_id);
    }
    handleUpdateUser(_id){
        return (e) => this.props.update(_id);
    }
    handleSubmit1(){
            //this.props.history.push('/')
    }
    render() {
        debugger;
        const { users, user } = this.props;
        console.log('----', users.items);
        let data1 = [];
        console.log('users', users.items)
         dataU = users.items &&
            users.items.map((user) => {
                return data1 = [{
                    'username': user.username,
                    'email': user.email
                }]
            });
        debugger;
        console.log('data1', data1);
        console.log('dataU', dataU);
        // this.setState({rowData : dataU})
        // debugger
        // console.log('rowData', this.state.rowData)
        // const tagOptions = users.items.map(({username, index}) => ({text: username, value: {username, index}, key: index}));
            // tagOptions.map(function (option) {
            //     if (users.items && users.items.includes(option.key)) {
            //         users.items.push(option.value)
            //     }
            // });

       //  const a =[{ username: 'aa', email: 'aa@gmail.com'},{ username: 'zz', email: 'zz@yahoo.com'}]
       //      var sortedArrayRes = array.sort(function (a, b) {
       //          if (a.username < b.username) return -1;
       //          else if (a.username > b.username) return 1;
       //          return 0;
       //      });
       //      console.log('sortedArrayRes', sortedArrayRes);
       //      this.setState({array, sortedArrayRes});
        return (
            <div className="col-md-6 col-md-offset-3">

                <Tabelify style={{margin:'50px'}}
                          {...this.state.tableConfig}
                />
            </div>
        )
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
    return bindActionCreators({getById, getAll, Delete, update}, dispatch);
}
export default connect(mapStateToProps,{getById, getAll, Delete, update} )(Profile)

// <table id="customers">
//     <tr>
//     <th>Username</th>
// <th>Email ID</th>
// <th> </th>
// <th> </th>
// </tr>
// <tr>
//     <td className="fontColor">
//         {users.loading && <em>Loading users...</em>}
//         {users.error && <span className="text-danger">ERROR: {users.error}</span>}
//         {users.items &&
//         <div>
//             {users.items.map((user, index) =>
//                 <div key={user._id}>
//                     <br/>
//                     {user.username}
//                 </div>
//             )}
//         </div>
//         }
//     </td>
//     <td className="fontColor">
//         {users.loading && <em>Loading users...</em>}
//         {users.error && <span className="text-danger">ERROR: {users.error}</span>}
//         {users.items &&
//         <div>
//             {users.items.map((user, index) =>
//                 <div key={user._id}>
//                     <br/>
//                     {user.email}
//                 </div>
//             )}
//         </div>
//         }
//     </td>
//     <td>
//         {users.loading && <em>Loading users...</em>}
//         {users.error && <span className="text-danger">ERROR: {users.error}</span>}
//         {users.items &&
//         <div>
//             {users.items.map((user, index) =>
//                 <div key={user._id}>
//                     <br/>
//                     {
//                         user.deleting ? <em> - Deleting...</em>
//                             : user.deleteError ?
//                             <span className="text-danger"> - ERROR: {user.deleteError}</span>
//                             : <span> <a onClick={this.handleDeleteUser(user._id)}>
//                                                 <i className="fontColor">Delete</i>
//                                             </a></span>
//                     }
//                 </div>
//             )}
//         </div>
//         }
//     </td>
//     <td>
//         {users.loading && <em>Loading users...</em>}
//         {users.error && <span className="text-danger">ERROR: {users.error}</span>}
//         {users.items &&
//         <div>
//             {users.items.map((user, index) =>
//                 <div key={user._id}>
//                     <br/>
//                     {
//                         user.loading ? <em> - Updating...</em>
//                             : user.Error ?
//                             <span className="text-danger"> - ERROR: {user.Error}</span>
//                             : <span> <a onClick={this.handleUpdateUser(user._id)}>
//                                                 <i className="fontColor">Update</i>
//                                             </a></span>
//                     }
//                 </div>
//             )}
//         </div>
//         }
//     </td>
// </tr>
// </table>
