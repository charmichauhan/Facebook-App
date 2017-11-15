import { userConstants } from '.././actions/userConstants';

export function alert(state = {}, action) {
    switch (action.type) {
        case userConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        case userConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case userConstants.CLEAR:
            return {};
        default:
            return state
    }
}