import { userConstants } from './userConstants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: userConstants.SUCCESS, message };
}

function error(message) {
    return { type: userConstants.ERROR, message };
}

function clear() {
    return { type: userConstants.CLEAR };
}
