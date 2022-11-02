import { processStageConstants } from '../_constants';

export function processStages(state = {}, action) {
    switch (action.type) {
        case processStageConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case processStageConstants.GETALL_SUCCESS:
            return {
                items: action.processStages
            };
        case processStageConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case processStageConstants.GET_STAGES_REQUEST:
            return {
                loading: true
            };
        case processStageConstants.GET_STAGES_SUCCESS:
            return {
                items: action.processStages
            };
        case processStageConstants.GET_STAGES_FAILURE:
            return {
                error: action.error
            };
        case processStageConstants.GET_REQUEST:
            return {
                loading: true
            };
        case processStageConstants.GET_SUCCESS:
            return {
                items: action.processStage
            };
        case processStageConstants.GET_FAILURE:
            return {
                error: action.error
            };
        case processStageConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case processStageConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case processStageConstants.DELETE_FAILURE:
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