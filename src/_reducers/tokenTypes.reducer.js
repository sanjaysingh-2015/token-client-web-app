import { tokenTypeConstants } from '../_constants';

export function tokenTypes(state = {}, action) {
    switch (action.type) {
        case tokenTypeConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case tokenTypeConstants.GETALL_SUCCESS:
            return {
                items: action.tokenTypes
            };
        case tokenTypeConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case tokenTypeConstants.GET_REQUEST:
            return {
                loading: true
            };
        case tokenTypeConstants.GET_SUCCESS:
            return {
                items: action.tokenType
            };
        case tokenTypeConstants.GET_FAILURE:
            return {
                error: action.error
            };
        case tokenTypeConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case tokenTypeConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case tokenTypeConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        default:
            return state
    }
}