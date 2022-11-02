import { departmentConstants } from '../_constants';
import { departmentService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const departmentActions = {
    add,
    edit,
    getById,
    getAll,
    delete: _delete
};

function add(orgCode, department) {
    return dispatch => {
        dispatch(request(department));
        departmentService.add(orgCode, department)
            .then(
                department => {
                    dispatch(success());
                    dispatch(alertActions.success('Department Added Successfully'));
                },
                error => {
                    dispatch(failure(error.response.data.apierror.message));
                    dispatch(alertActions.error(error.response.data.apierror.message));
                }
            );
    };

    function request(department) { return { type: departmentConstants.ADD_REQUEST, department } }
    function success(department) { return { type: departmentConstants.ADD_SUCCESS, department } }
    function failure(error) { return { type: departmentConstants.ADD_FAILURE, error } }
}

function edit(orgCode, department, deptCode) {
    return dispatch => {
        dispatch(request(department));

        departmentService.update(orgCode, department, deptCode)
            .then(
                user => {
                    dispatch(success());
                    history.push('/dept-list');
                    dispatch(alertActions.success('Department Edited Successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(department) { return { type: departmentConstants.EDIT_REQUEST, department } }
    function success(department) { return { type: departmentConstants.EDIT_SUCCESS, department } }
    function failure(error) { return { type: departmentConstants.EDIT_FAILURE, error } }
}

function getAll(orgCode) {
    return dispatch => {
        dispatch(request());

        departmentService.getAll(orgCode)
            .then(
                departments => dispatch(success(departments)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: departmentConstants.GETALL_REQUEST } }
    function success(departments) { return { type: departmentConstants.GETALL_SUCCESS, departments } }
    function failure(error) { return { type: departmentConstants.GETALL_FAILURE, error } }
}

function getById(orgCode, id) {
    return dispatch => {
        dispatch(request());

        departmentService.getById(orgCode, id)
            .then(
                department => dispatch(success(department)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: departmentConstants.GET_REQUEST } }
    function success(department) { return { type: departmentConstants.GET_SUCCESS, department } }
    function failure(error) { return { type: departmentConstants.GET_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        departmentService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: departmentConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: departmentConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: departmentConstants.DELETE_FAILURE, id, error } }
}