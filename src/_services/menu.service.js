import axios from "axios";
import { authHeader } from '../_helpers';
import { userService } from "./user.service";

export const menuService = {
    getAll
};


function getAll() {
    return axios.get(`${process.env.REACT_APP_ROOT_APP_URL}/menus`, {headers: authHeader()}).then(handleResponseAxios);
}

function handleResponseAxios(response) {
    if (response.status === 401) {
        userService.logout();
        //location.reload(true);
        const error = (response.data && response.data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response.data.data;
}