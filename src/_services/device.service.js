import axios from "axios";
import { authHeader } from '../_helpers';
import {isEmpty} from "lodash";

export const deviceService = {
    add,
    getAll,
    getAllExact,
    getById,
    update,
    delete: _delete
};

function getAll(orgCode, deptCode, catCode, typeCode) {
    console.log("Start - Service");
    let url = `${process.env.REACT_APP_ROOT_APP_URL}/devices?org-code=${orgCode}&dept-code=${deptCode}&cat-code=${catCode}&token-type-code=${typeCode}`
    return axios.get(url, {headers: authHeader()}).then(handleResponseAxios);
}

function getAllExact(orgCode, deptCode, catCode, typeCode) {
    let url = `${process.env.REACT_APP_ROOT_APP_URL}/devices/level?org-code=${orgCode}&dept-code=${deptCode}&cat-code=${catCode}&token-type-code=${typeCode}`
    return axios.get(url, {headers: authHeader()}).then(handleResponseAxios);
}
function getById(orgCode, deptCode, catCode, typeCode, stageCode) {
    let url = `${process.env.REACT_APP_ROOT_APP_URL}/devices/${stageCode}?org-code=${orgCode}&dept-code=${deptCode}&cat-code=${catCode}&token-type-code=${typeCode}`
    return axios.get(url, {headers: authHeader()}).then(handleResponseAxios);
}

function add(processStage) {
    console.log("Service: ",processStage);
    return axios.post(`${process.env.REACT_APP_ROOT_APP_URL}/devices`, processStage, {headers: authHeader()}).then(handleResponseAxios);
}

function update(stageCode, processStage) {
    return axios.put(`${process.env.REACT_APP_ROOT_APP_URL}/devices/${stageCode}`, processStage, {headers: authHeader()}).then(handleResponseAxios);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return axios.delete(`${process.env.REACT_APP_ROOT_APP_URL}/devices/${id}`,  {headers: authHeader()}).then(handleResponseAxios);
}

function handleResponseAxios(response) {
    if (response.status === 401) {
        const error = (response.data && response.data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response.data.data;
}