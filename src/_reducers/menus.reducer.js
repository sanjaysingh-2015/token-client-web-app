import { menuConstants } from '../_constants';

export function menus(state = {}, action) {
    switch (action.type) {
        case menuConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case menuConstants.GETALL_SUCCESS:
            return {
                items: action.menus
            };
        case menuConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}