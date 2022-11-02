// import axios from "axios";
import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {useDispatch, useSelector} from 'react-redux';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {menuActions} from "../../_actions/menu.actions";
import MenuItem from "./MenuItem";

const SideBar = () => {
    const user = useSelector(state => state.authentication.user);
    const menus = useSelector(state => state.menus);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(menuActions.getAll());
    }, []);
    return user && menus ? (
            <div className="col-auto bg-secondary text-bg-dark">
                <div
                    className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                        id="menu">
                        {menus?.items?.map((menu, index) =>
                            <>
                                <li className="nav-item">
                                    <a href={menu.uiPageUrl} className="nav-link align-middle px-0 text-white">
                                        <FontAwesomeIcon icon={faBars}/> <span
                                        className="ms-0 d-none d-sm-inline blockquote">{menu.displayName}</span>
                                    </a>
                                </li>
                                <MenuItem items={menu?.childMenu}/>
                            </>
                        )}
                    </ul>

                </div>
            </div>
    ) : ""
}

export default SideBar;