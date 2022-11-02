import { counterConstants } from '../_constants';

export function counters(state = {}, action) {
    switch (action.type) {
        case counterConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case counterConstants.GETALL_SUCCESS:
            return {
                items: action.counters
            };
        case counterConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case counterConstants.GET_REQUEST:
            return {
                loading: true
            };
        case counterConstants.GET_SUCCESS:
            return {
                items: action.counter
            };
        case counterConstants.GET_FAILURE:
            return {
                error: action.error
            };
        case counterConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case counterConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case counterConstants.DELETE_FAILURE:
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