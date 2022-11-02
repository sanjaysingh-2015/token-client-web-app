import axios from "axios";
import { authHeader } from '../_helpers';
import {isEmpty} from "lodash";

export const departmentService = {
    add,
    getAll,
    getById,
    update,
    delete: _delete
};

function getAll(orgCode) {
    let url = `${process.env.REACT_APP_ROOT_APP_URL}/departments/${orgCode}`
    return axios.get(url, {headers: authHeader()}).then(handleResponseAxios);
}

function getById(orgCode,id) {
    return axios.get(`${process.env.REACT_APP_ROOT_APP_URL}/departments/${orgCode}/${id}`, {headers: authHeader()}).then(handleResponseAxios);
}

function add(orgCode, department) {
    return axios.post(`${process.env.REACT_APP_ROOT_APP_URL}/departments/${orgCode}`, department, {headers: authHeader()}).then(handleResponseAxios);
}

function update(orgCode,department, deptCode) {
    return axios.put(`${process.env.REACT_APP_ROOT_APP_URL}/departments/${orgCode}/${deptCode}`, department, {headers: authHeader()}).then(handleResponseAxios);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return axios.delete(`${process.env.REACT_APP_ROOT_APP_URL}/departments/${id}`,  {headers: authHeader()}).then(handleResponseAxios);
}

function handleResponseAxios(response) {
    if (response.status === 401) {
        const error = (response.data && response.data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response.data.data;
}