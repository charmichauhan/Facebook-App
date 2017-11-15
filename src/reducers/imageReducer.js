import { userConstants } from '.././actions/userConstants';

export function image(state = {}, action) {
    switch (action.type) {
        case userConstants.GET_IMAGE_REQUEST:
            return {
                loading: true
            };
        case userConstants.GET_IMAGE_SUCCESS:
            return {
                image: action.image
            };
        case userConstants.GET_IMAGE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}