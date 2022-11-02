import axios from "axios";
import { authHeader } from '../_helpers';
import {isEmpty} from "lodash";

export const counterService = {
    add,
    getAll,
    getById,
    update,
    addProcessMap,
    delete: _delete
};

function getAll(orgCode, deptCode, catCode, typeCode) {
    let url = `${process.env.REACT_APP_ROOT_APP_URL}/counters?org-code=${orgCode}&dept-code=${deptCode}&cat-code=${catCode}&token-type-code=${typeCode}`
    return axios.get(url, {headers: authHeader()}).then(handleResponseAxios);
}

function getById(orgCode, deptCode, catCode, typeCode, stageCode) {
    let url = `${process.env.REACT_APP_ROOT_APP_URL}/counters/${stageCode}?org-code=${orgCode}&dept-code=${deptCode}&cat-code=${catCode}&token-type-code=${typeCode}`
    return axios.get(url, {headers: authHeader()}).then(handleResponseAxios);
}

function add(counter) {
    return axios.post(`${process.env.REACT_APP_ROOT_APP_URL}/counters`, counter, {headers: authHeader()}).then(handleResponseAxios);
}

function update(stageCode, counter) {
    return axios.put(`${process.env.REACT_APP_ROOT_APP_URL}/counters/${stageCode}`, counter, {headers: authHeader()}).then(handleResponseAxios);
}

function addProcessMap(counterCode, body) {
    return axios.put(`${process.env.REACT_APP_ROOT_APP_URL}/counter-stage-map/${counterCode}`, body, {headers: authHeader()}).then(handleResponseAxios);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    console.log("Service Delete ID: ", id);
    return axios.delete(`${process.env.REACT_APP_ROOT_APP_URL}/counters/${id}`,  {headers: authHeader()}).then(handleResponseAxios);
}

function handleResponseAxios(response) {
    if (response.status === 401) {
        const error = (response.data && response.data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response.data.data;
}