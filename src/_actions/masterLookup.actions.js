import { masterLookupConstants } from '../_constants';
import { masterLookupService } from '../_services';
import { alertActions } from './';

export const masterLookupActions = {
    getAll
};

async function getAll(lookupType, orgCode, deptCode, catCode, typeCode) {
    return await masterLookupService.getAll(lookupType, orgCode, deptCode, catCode, typeCode).then((response) => {
        return response;
    })
    .catch((err) => {
        return err;
    });
}
