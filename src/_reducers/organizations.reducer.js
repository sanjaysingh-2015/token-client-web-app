import { organizationConstants } from '../_constants';

export function organizations(state = {}, action) {
    switch (action.type) {
        case organizationConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case organizationConstants.GETALL_SUCCESS:
            return {
                items: action.organizations
            };
        case organizationConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case organizationConstants.GET_REQUEST:
            return {
                loading: true
            };
        case organizationConstants.GET_SUCCESS:
            return {
                items: action.organization
            };
        case organizationConstants.GET_FAILURE:
            return {
                error: action.error
            };
        case organizationConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case organizationConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case organizationConstants.DELETE_FAILURE:
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