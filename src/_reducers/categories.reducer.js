import { categoryConstants } from '../_constants';

export function categories(state = {}, action) {
    switch (action.type) {
        case categoryConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case categoryConstants.GETALL_SUCCESS:
            return {
                items: action.categories
            };
        case categoryConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case categoryConstants.GET_REQUEST:
            return {
                loading: true
            };
        case categoryConstants.GET_SUCCESS:
            return {
                items: action.category
            };
        case categoryConstants.GET_FAILURE:
            return {
                error: action.error
            };
        case categoryConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case categoryConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case categoryConstants.DELETE_FAILURE:
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