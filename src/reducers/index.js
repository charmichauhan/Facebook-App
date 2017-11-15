
import { combineReducers } from 'redux';
import { authentication } from './authReducer';
import { registration } from './regReducer';
import { users } from './userReducers';
import { alert } from './alertReducer';
import { image } from './imageReducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    image
});

export default rootReducer;
