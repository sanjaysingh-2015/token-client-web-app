import { tokenTypeConstants } from '../_constants';
import { tokenTypeService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const tokenTypeActions = {
    add,
    edit,
    getById,
    getAll,
    delete: _delete
};

function add(catCode, tokenType) {
    return dispatch => {
        dispatch(request(tokenType));

        tokenTypeService.add(catCode, tokenType)
            .then(
                tokenType => {
                    dispatch(success());
                    history.push('/token-type-list');
                    dispatch(alertActions.success('Department Added Successfully'));
                },
                error => {
                    dispatch(failure(error.response.data.apierror.message));
                    dispatch(alertActions.error(error.response.data.apierror.message));
                }
            );
    };

    function request(tokenType) { return { type: tokenTypeConstants.ADD_REQUEST, tokenType } }
    function success(tokenType) { return { type: tokenTypeConstants.ADD_SUCCESS, tokenType } }
    function failure(error) { return { type: tokenTypeConstants.ADD_FAILURE, error } }
}

function edit(catCode, tokenType, id) {
    return dispatch => {
        dispatch(request(tokenType));

        tokenTypeService.update(catCode, tokenType, id)
            .then(
                token => {
                    dispatch(success());
                    history.push('/token-type-list');
                    dispatch(alertActions.success('Department Edited Successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(tokenType) { return { type: tokenTypeConstants.EDIT_REQUEST, tokenType } }
    function success(tokenType) { return { type: tokenTypeConstants.EDIT_SUCCESS, tokenType } }
    function failure(error) { return { type: tokenTypeConstants.EDIT_FAILURE, error } }
}

function getAll(catCode) {
    return dispatch => {
        dispatch(request());

        tokenTypeService.getAll(catCode)
            .then(
                tokenTypes => dispatch(success(tokenTypes)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: tokenTypeConstants.GETALL_REQUEST } }
    function success(tokenTypes) { return { type: tokenTypeConstants.GETALL_SUCCESS, tokenTypes } }
    function failure(error) { return { type: tokenTypeConstants.GETALL_FAILURE, error } }
}

function getById(catCode, id) {
    return dispatch => {
        dispatch(request());

        tokenTypeService.getById(catCode, id)
            .then(
                tokenType => dispatch(success(tokenType)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: tokenTypeConstants.GET_REQUEST } }
    function success(tokenType) { return { type: tokenTypeConstants.GET_SUCCESS, tokenType } }
    function failure(error) { return { type: tokenTypeConstants.GET_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        tokenTypeService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: tokenTypeConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: tokenTypeConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: tokenTypeConstants.DELETE_FAILURE, id, error } }
}