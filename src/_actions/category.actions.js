import { categoryConstants } from '../_constants';
import { categoryService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const categoryActions = {
    add,
    edit,
    getById,
    getAll,
    delete: _delete
};

function add(deptCode, category) {
    return dispatch => {
        dispatch(request(category));
        categoryService.add(deptCode, category)
            .then(
                category => {
                    dispatch(success());
                    history.push('/cat-list');
                    dispatch(alertActions.success('Category Added Successfully'));
                },
                error => {
                    dispatch(failure(error.response.data.apierror.message));
                    dispatch(alertActions.error(error.response.data.apierror.message));
                }
            );
    };

    function request(category) { return { type: categoryConstants.ADD_REQUEST, category } }
    function success(category) { return { type: categoryConstants.ADD_SUCCESS, category } }
    function failure(error) { return { type: categoryConstants.ADD_FAILURE, error } }
}

function edit(deptCode, category, id) {
    return dispatch => {
        dispatch(request(category));

        categoryService.update(deptCode, category, id)
            .then(
                user => {
                    dispatch(success());
                    history.push('/cat-list');
                    dispatch(alertActions.success('Department Edited Successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(category) { return { type: categoryConstants.EDIT_REQUEST, category } }
    function success(category) { return { type: categoryConstants.EDIT_SUCCESS, category } }
    function failure(error) { return { type: categoryConstants.EDIT_FAILURE, error } }
}

function getAll(deptCode) {
    return dispatch => {
        dispatch(request());

        categoryService.getAll(deptCode)
            .then(
                categories => dispatch(success(categories)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: categoryConstants.GETALL_REQUEST } }
    function success(categories) { return { type: categoryConstants.GETALL_SUCCESS, categories } }
    function failure(error) { return { type: categoryConstants.GETALL_FAILURE, error } }
}

function getById(deptCode, id) {
    return dispatch => {
        dispatch(request());

        categoryService.getById(deptCode, id)
            .then(
                category => dispatch(success(category)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: categoryConstants.GET_REQUEST } }
    function success(category) { return { type: categoryConstants.GET_SUCCESS, category } }
    function failure(error) { return { type: categoryConstants.GET_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        categoryService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: categoryConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: categoryConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: categoryConstants.DELETE_FAILURE, id, error } }
}