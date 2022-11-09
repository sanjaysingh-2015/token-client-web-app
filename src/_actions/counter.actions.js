import { counterConstants } from '../_constants';
import {counterService, masterLookupService} from '../_services';
import { alertActions } from './';

export const counterActions = {
    add,
    edit,
    getById,
    getAll,
    getList,
    addProcessMap,
    addDeviceMap,
    delete: _delete
};

function add(counter) {
    return dispatch => {
        dispatch(request(counter));

        counterService.add(counter)
            .then(
                counter => {
                    dispatch(success());
                    dispatch(alertActions.success('Counter Added Successfully'));
                },
                error => {
                    dispatch(failure(error.response.data.apierror.message));
                    dispatch(alertActions.error(error.response.data.apierror.message));
                }
            );
    };

    function request(counter) { return { type: counterConstants.ADD_REQUEST, counter } }
    function success(counter) { return { type: counterConstants.ADD_SUCCESS, counter } }
    function failure(error) { return { type: counterConstants.ADD_FAILURE, error } }
}

function edit(stageCode, counter) {
    return dispatch => {
        dispatch(request(counter));

        counterService.update(stageCode, counter)
            .then(
                token => {
                    dispatch(success());
                    dispatch(alertActions.success('Counter Edited Successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(counter) { return { type: counterConstants.EDIT_REQUEST, counter } }
    function success(counter) { return { type: counterConstants.EDIT_SUCCESS, counter } }
    function failure(error) { return { type: counterConstants.EDIT_FAILURE, error } }
}

function addProcessMap(counterNo, body) {
    return dispatch => {
        dispatch(request(body));
        counterService.addProcessMap(counterNo,body)
            .then(
                token => {
                    dispatch(success());
                    dispatch(alertActions.success('Counter Edited Successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(counter) { return { type: counterConstants.EDIT_REQUEST, counter } }
    function success(counter) { return { type: counterConstants.EDIT_SUCCESS, counter } }
    function failure(error) { return { type: counterConstants.EDIT_FAILURE, error } }
}

function addDeviceMap(counterNo, body) {
    return dispatch => {
        dispatch(request(body));
        counterService.addDeviceMap(counterNo,body)
            .then(
                token => {
                    dispatch(success());
                    dispatch(alertActions.success('Counter Edited Successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(counter) { return { type: counterConstants.EDIT_REQUEST, counter } }
    function success(counter) { return { type: counterConstants.EDIT_SUCCESS, counter } }
    function failure(error) { return { type: counterConstants.EDIT_FAILURE, error } }
}

function getAll(orgCode, deptCode, catCode, typeCode) {
    return dispatch => {
        dispatch(request());

        counterService.getAll(orgCode, deptCode, catCode, typeCode)
            .then(
                counters => dispatch(success(counters)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: counterConstants.GETALL_REQUEST } }
    function success(counters) { return { type: counterConstants.GETALL_SUCCESS, counters } }
    function failure(error) { return { type: counterConstants.GETALL_FAILURE, error } }
}

function getById(orgCode, deptCode, catCode, typeCode, stageCode) {
    return dispatch => {
        dispatch(request());

        counterService.getById(orgCode, deptCode, catCode, typeCode, stageCode)
            .then(
                counter => dispatch(success(counter)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: counterConstants.GET_REQUEST } }
    function success(counter) { return { type: counterConstants.GET_SUCCESS, counter } }
    function failure(error) { return { type: counterConstants.GET_FAILURE, error } }
}

async function getList(orgCode, deptCode, catCode, typeCode) {
    return await counterService.getAll(orgCode, deptCode, catCode, typeCode).then((response) => {
        return response;
    }).catch((err) => {
        return err;
    });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    console.log("Action Delete ID: ", id);
    return counterService.delete(id).then((response) =>{
        return response;
    }).catch((err) => {
        return err;
    });
}