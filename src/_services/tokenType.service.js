import axios from "axios";
import { authHeader } from '../_helpers';
import {isEmpty} from "lodash";

export const tokenTypeService = {
    add,
    getAll,
    getById,
    update,
    delete: _delete
};

function getAll(catCode) {
    let url = `${process.env.REACT_APP_ROOT_APP_URL}/tokenTypes/${catCode}`
    return axios.get(url, {headers: authHeader()}).then(handleResponseAxios);
}

function getById(catCode, id) {
    return axios.get(`${process.env.REACT_APP_ROOT_APP_URL}/tokenTypes/${catCode}/${id}`, {headers: authHeader()}).then(handleResponseAxios);
}

function add(catCode, tokenType) {
    return axios.post(`${process.env.REACT_APP_ROOT_APP_URL}/tokenTypes/${catCode}`, tokenType, {headers: authHeader()}).then(handleResponseAxios);
}

function update(catCode,tokenType, id) {
    return axios.put(`${process.env.REACT_APP_ROOT_APP_URL}/tokenTypes/${catCode}/${id}`, tokenType, {headers: authHeader()}).then(handleResponseAxios);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return axios.delete(`${process.env.REACT_APP_ROOT_APP_URL}/tokenTypes/${id}`,  {headers: authHeader()}).then(handleResponseAxios);
}

function handleResponseAxios(response) {
    if (response.status === 401) {
        const error = (response.data && response.data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response.data.data;
}