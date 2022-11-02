import axios from "axios";
import { authHeader } from '../_helpers';

export const masterLookupService = {
    getAll
};

async function getAll(lookupType,orgCode, deptCode, catCode, typeCode) {
    orgCode = (orgCode === undefined)? '':orgCode;
    deptCode = (deptCode === undefined)? '':deptCode;
    catCode = (catCode === undefined)? '':catCode;
    typeCode = (typeCode === undefined)? '':typeCode;
    let url = `${process.env.REACT_APP_ROOT_APP_URL}/lookup/${lookupType}?org-code=${orgCode}&dept-code=${deptCode}&cat-code=${catCode}&token-type-code=${typeCode}`
    return await axios.get(url, {headers: authHeader()}).then((response) => {
        return {success: true, data:response.data.data};
    })
    .catch((err) => {
        return err;
    });
}

function handleResponseAxios(response) {
    if (response.status === 401) {
        const error = (response.data && response.data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response.data.data.json();
}