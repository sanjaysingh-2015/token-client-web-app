import { menuConstants } from '../_constants';
import { menuService } from '../_services';


export const menuActions = {
    getAll
};

function getAll() {
    return dispatch => {
        dispatch(request());

        menuService.getAll()
            .then(
                menus => dispatch(success(menus)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: menuConstants.GETALL_REQUEST } }
    function success(menus) { return { type: menuConstants.GETALL_SUCCESS, menus } }
    function failure(error) { return { type: menuConstants.GETALL_FAILURE, error } }
}
