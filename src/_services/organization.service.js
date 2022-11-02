import axios from "axios";
import { authHeader } from '../_helpers';

export const organizationService = {
    add,
    getAll,
    getById,
    update,
    refreshAuthToken,
    delete: _delete
};

function getAll() {
    return axios.get(`${process.env.REACT_APP_ROOT_APP_URL}/organizations`, {headers: authHeader()}).then(handleResponseAxios);
}

function refreshAuthToken(orgCode) {
    return axios.get(`${process.env.REACT_APP_ROOT_APP_URL}/organizations/auth-code/${orgCode}`, {headers: authHeader()}).then(handleResponseAxios);
}

function getById(id) {
    return axios.get(`${process.env.REACT_APP_ROOT_APP_URL}/organizations/${id}`, {headers: authHeader()}).then(handleResponseAxios);
}

function add(organization) {
    return axios.post(`${process.env.REACT_APP_ROOT_APP_URL}/organizations`, organization, {headers: authHeader()}).then(handleResponseAxios);
}

function update(organization, id) {
    return  axios.put(`${process.env.REACT_APP_ROOT_APP_URL}/organizations/${id}`, organization, {headers: authHeader()}).then(handleResponseAxios);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return axios.delete(`${process.env.REACT_APP_ROOT_APP_URL}/organizations/${id}`,  {headers: authHeader()}).then(handleResponseAxios);
}

function handleResponseAxios(response) {
    if (response.status === 401) {
        const error = (response.data && response.data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response.data.data;
}