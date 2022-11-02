import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {useDispatch, useSelector} from 'react-redux';
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userActions } from "../../_actions"

const TopBar = () => {
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    function logout() {
        dispatch(userActions.logout());
    }

    return user ? (
        <nav
            className="navbar navbar-default navbar-fixed-top off-canvas-active navbar-dark bg-dark text-bg-dark"
            style={{flexWrap: 'inherit'}}
        >
            <div className="navbar-brand">
                <div aria-hidden="true" style={{cursor: 'pointer'}}>
                    <FontAwesomeIcon icon={faBars}/> Token Admin
                </div>
            </div>
            <div className="container-fluid" style={{display: 'inline-block'}}>
                <div title="Sign-out" style={{display: 'flex', float: 'right', alignItems: 'center', cursor: 'pointer'}} onClick={logout}>
                    <FontAwesomeIcon icon={faUser}/>
                    <span className="reception" style={{marginRight: '15px'}}>
                      {`${user.lastName}, ${user.firstName}`}
                    </span>

                </div>
            </div>
        </nav>
    ) : ""
}

export default TopBar;