import axios from "axios";
import { authHeader } from '../_helpers';
import {isEmpty} from "lodash";

export const processStageService = {
    add,
    getAll,
    getAllExact,
    getById,
    update,
    delete: _delete
};

function getAll(orgCode, deptCode, catCode, typeCode) {
    let url = `${process.env.REACT_APP_ROOT_APP_URL}/process-stages?org-code=${orgCode}&dept-code=${deptCode}&cat-code=${catCode}&token-type-code=${typeCode}`
    return axios.get(url, {headers: authHeader()}).then(handleResponseAxios);
}

function getAllExact(orgCode, deptCode, catCode, typeCode) {
    let url = `${process.env.REACT_APP_ROOT_APP_URL}/process-stages/level?org-code=${orgCode}&dept-code=${deptCode}&cat-code=${catCode}&token-type-code=${typeCode}`
    return axios.get(url, {headers: authHeader()}).then(handleResponseAxios);
}
function getById(orgCode, deptCode, catCode, typeCode, stageCode) {
    let url = `${process.env.REACT_APP_ROOT_APP_URL}/process-stages/${stageCode}?org-code=${orgCode}&dept-code=${deptCode}&cat-code=${catCode}&token-type-code=${typeCode}`
    return axios.get(url, {headers: authHeader()}).then(handleResponseAxios);
}

function add(processStage) {
    console.log("Service: ",processStage);
    return axios.post(`${process.env.REACT_APP_ROOT_APP_URL}/process-stages`, processStage, {headers: authHeader()}).then(handleResponseAxios);
}

function update(stageCode, processStage) {
    return axios.put(`${process.env.REACT_APP_ROOT_APP_URL}/process-stages/${stageCode}`, processStage, {headers: authHeader()}).then(handleResponseAxios);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return axios.delete(`${process.env.REACT_APP_ROOT_APP_URL}/process-stages/${id}`,  {headers: authHeader()}).then(handleResponseAxios);
}

function handleResponseAxios(response) {
    if (response.status === 401) {
        const error = (response.data && response.data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response.data.data;
}