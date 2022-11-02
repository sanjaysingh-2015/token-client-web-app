import { processStageConstants } from '../_constants';
import {counterService, processStageService} from '../_services';
import { alertActions } from './';

export const processStageActions = {
    add,
    edit,
    getById,
    getAll,
    getList,
    getAllExact,
    delete: _delete
};

function add(processStage) {
    return dispatch => {
        dispatch(request(processStage));
        processStageService.add(processStage)
            .then(
                processStage => {
                    dispatch(success());
                    dispatch(alertActions.success('Process Stage Added Successfully'));
                },
                error => {
                    dispatch(failure(error.response.data.apierror.message));
                    dispatch(alertActions.error(error.response.data.apierror.message));
                }
            );
    };

    function request(processStage) { return { type: processStageConstants.ADD_REQUEST, processStage } }
    function success(processStage) { return { type: processStageConstants.ADD_SUCCESS, processStage } }
    function failure(error) { return { type: processStageConstants.ADD_FAILURE, error } }
}

function edit(stageCode, processStage) {
    return dispatch => {
        dispatch(request(processStage));

        processStageService.update(stageCode, processStage)
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

    function request(processStage) { return { type: processStageConstants.EDIT_REQUEST, processStage } }
    function success(processStage) { return { type: processStageConstants.EDIT_SUCCESS, processStage } }
    function failure(error) { return { type: processStageConstants.EDIT_FAILURE, error } }
}

function getAll(orgCode, deptCode, catCode, typeCode) {
    return dispatch => {
        dispatch(request());

        processStageService.getAll(orgCode, deptCode, catCode, typeCode)
            .then(
                processStages => dispatch(success(processStages)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: processStageConstants.GETALL_REQUEST } }
    function success(processStages) { return { type: processStageConstants.GETALL_SUCCESS, processStages } }
    function failure(error) { return { type: processStageConstants.GETALL_FAILURE, error } }
}

async function getList(orgCode, deptCode, catCode, typeCode) {
    return await processStageService.getAll(orgCode, deptCode, catCode, typeCode).then((response) => {
        return response;
    }).catch((err) => {
        return err;
    });
}
function getAllExact(orgCode, deptCode, catCode, typeCode) {
    return dispatch => {
        dispatch(request());

        processStageService.getAllExact(orgCode, deptCode, catCode, typeCode)
            .then(
                processStages => dispatch(success(processStages)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: processStageConstants.GETALL_REQUEST } }
    function success(processStages) { return { type: processStageConstants.GETALL_SUCCESS, processStages } }
    function failure(error) { return { type: processStageConstants.GETALL_FAILURE, error } }
}

function getById(orgCode, deptCode, catCode, typeCode, stageCode) {
    return dispatch => {
        dispatch(request());

        processStageService.getById(orgCode, deptCode, catCode, typeCode, stageCode)
            .then(
                processStage => dispatch(success(processStage)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: processStageConstants.GET_REQUEST } }
    function success(processStage) { return { type: processStageConstants.GET_SUCCESS, processStage } }
    function failure(error) { return { type: processStageConstants.GET_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        processStageService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: processStageConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: processStageConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: processStageConstants.DELETE_FAILURE, id, error } }
}