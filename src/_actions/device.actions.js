import { deviceConstants } from '../_constants';
import {counterService, deviceService} from '../_services';
import { alertActions } from './';

export const deviceActions = {
    add,
    edit,
    getById,
    getAll,
    getList,
    getAllExact,
    delete: _delete
};

function add(device) {
    return dispatch => {
        dispatch(request(device));
        deviceService.add(device)
            .then(
                device => {
                    dispatch(success());
                    dispatch(alertActions.success('Process Stage Added Successfully'));
                },
                error => {
                    dispatch(failure(error.response.data.apierror.message));
                    dispatch(alertActions.error(error.response.data.apierror.message));
                }
            );
    };

    function request(device) { return { type: deviceConstants.ADD_REQUEST, device } }
    function success(device) { return { type: deviceConstants.ADD_SUCCESS, device } }
    function failure(error) { return { type: deviceConstants.ADD_FAILURE, error } }
}

function edit(stageCode, device) {
    return dispatch => {
        dispatch(request(device));

        deviceService.update(stageCode, device)
            .then(
                token => {
                    dispatch(success());
                    dispatch(alertActions.success('Process Stage Edited Successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(device) { return { type: deviceConstants.EDIT_REQUEST, device } }
    function success(device) { return { type: deviceConstants.EDIT_SUCCESS, device } }
    function failure(error) { return { type: deviceConstants.EDIT_FAILURE, error } }
}

function getAll(orgCode, deptCode, catCode, typeCode) {
    return dispatch => {
        dispatch(request());

        deviceService.getAll(orgCode, deptCode, catCode, typeCode)
            .then(
                devices => dispatch(success(devices)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: deviceConstants.GETALL_REQUEST } }
    function success(devices) { return { type: deviceConstants.GETALL_SUCCESS, devices } }
    function failure(error) { return { type: deviceConstants.GETALL_FAILURE, error } }
}

async function getList(orgCode, deptCode, catCode, typeCode) {
    console.log("Start - Action");
    return await deviceService.getAll(orgCode, deptCode, catCode, typeCode).then((response) => {
        return response;
    }).catch((err) => {
        return err;
    });
}
function getAllExact(orgCode, deptCode, catCode, typeCode) {
    return dispatch => {
        dispatch(request());

        deviceService.getAllExact(orgCode, deptCode, catCode, typeCode)
            .then(
                devices => dispatch(success(devices)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: deviceConstants.GETALL_REQUEST } }
    function success(devices) { return { type: deviceConstants.GETALL_SUCCESS, devices } }
    function failure(error) { return { type: deviceConstants.GETALL_FAILURE, error } }
}

function getById(orgCode, deptCode, catCode, typeCode, stageCode) {
    return dispatch => {
        dispatch(request());

        deviceService.getById(orgCode, deptCode, catCode, typeCode, stageCode)
            .then(
                device => dispatch(success(device)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: deviceConstants.GET_REQUEST } }
    function success(device) { return { type: deviceConstants.GET_SUCCESS, device } }
    function failure(error) { return { type: deviceConstants.GET_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        deviceService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: deviceConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: deviceConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: deviceConstants.DELETE_FAILURE, id, error } }
}