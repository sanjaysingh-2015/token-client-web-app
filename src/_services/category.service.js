import axios from "axios";
import { authHeader } from '../_helpers';
import {isEmpty} from "lodash";

export const categoryService = {
    add,
    getAll,
    getById,
    update,
    delete: _delete
};

function getAll(deptCode) {
    let url = `${process.env.REACT_APP_ROOT_APP_URL}/categories/${deptCode}`
    return axios.get(url, {headers: authHeader()}).then(handleResponseAxios);
}

function getById(deptCode, id) {
    return axios.get(`${process.env.REACT_APP_ROOT_APP_URL}/categories/${deptCode}/${id}`, {headers: authHeader()}).then(handleResponseAxios);
}

function add(deptCode, category) {
    return axios.post(`${process.env.REACT_APP_ROOT_APP_URL}/categories/${deptCode}`, category, {headers: authHeader()}).then(handleResponseAxios);
}

function update(deptCode, category, id) {
    return axios.put(`${process.env.REACT_APP_ROOT_APP_URL}/categories/${deptCode}/${id}`, category, {headers: authHeader()}).then(handleResponseAxios);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return axios.delete(`${process.env.REACT_APP_ROOT_APP_URL}/categories/${id}`,  {headers: authHeader()}).then(handleResponseAxios);
}

function handleResponseAxios(response) {
    if (response.status === 401) {
        const error = (response.data && response.data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response.data.data;
}