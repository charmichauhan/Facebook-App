
import { combineReducers } from 'redux';
import { authentication } from './authReducer';
import { registration } from './regReducer';
import { users } from './userReducers';
import { alert } from './alertReducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
});

export default rootReducer;
