import { organizationConstants } from '../_constants';
import { organizationService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const organizationActions = {
    add,
    edit,
    getById,
    getAll,
    refreshAuthToken,
    delete: _delete
};

function add(organization) {
    return dispatch => {
        dispatch(request(organization));

        organizationService.add(organization)
            .then(
                organization => {
                    dispatch(success(organization));
                    history.push('/org-list');
                    dispatch(alertActions.success('Organization Added Successfully'));
                },
                error => {
                    dispatch(failure(error.response.data.apierror.message));
                    dispatch(alertActions.error(error.response.data.apierror.message));
                }
            );
    };

    function request(organization) { return { type: organizationConstants.ADD_REQUEST, organization } }
    function success(organization) { return { type: organizationConstants.ADD_SUCCESS, organization } }
    function failure(error) { return { type: organizationConstants.ADD_FAILURE, error } }
}

function edit(organization, id) {
    return dispatch => {
        dispatch(request(organization));
        organizationService.update(organization, id)
            .then(
                organization => {
                    dispatch(success(organization));
                    dispatch(alertActions.success('Organization Edited Successfully'));
                },
                error => {
                    dispatch(failure('There is some issue with while saving data'));
                    dispatch(alertActions.error('There is some issue with while saving data'));
                }
            );
    };

    function request(organization) { return { type: organizationConstants.EDIT_REQUEST, organization } }
    function success(organization) { return { type: organizationConstants.EDIT_SUCCESS, organization } }
    function failure(error) { return { type: organizationConstants.EDIT_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        organizationService.getAll()
            .then(
                organizations => dispatch(success(organizations)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: organizationConstants.GETALL_REQUEST } }
    function success(organizations) { return { type: organizationConstants.GETALL_SUCCESS, organizations } }
    function failure(error) { return { type: organizationConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        organizationService.getById(id)
            .then(
                organization => dispatch(success(organization)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: organizationConstants.GET_REQUEST } }
    function success(organization) { return { type: organizationConstants.GET_SUCCESS, organization } }
    function failure(error) { return { type: organizationConstants.GET_FAILURE, error } }
}

function refreshAuthToken(orgCode) {
    return dispatch => {
        dispatch(request());

        organizationService.refreshAuthToken(orgCode)
            .then(
                organizations => dispatch(success(orgCode)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: organizationConstants.REFRESH_REQUEST } }
    function success(organizations) { return { type: organizationConstants.REFRESH_SUCCESS, organizations } }
    function failure(error) { return { type: organizationConstants.REFRESH_FAILURE, error } }
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        organizationService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: organizationConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: organizationConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: organizationConstants.DELETE_FAILURE, id, error } }
}