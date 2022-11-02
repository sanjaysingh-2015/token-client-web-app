import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGripLines} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const MenuItem = (props) => {
    return (
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu" style={{marginLeft: '1em'}}>
            {props?.items?.map((menu, index) =>
                <li className="nav-item">
                    <a href={menu.uiPageUrl} className="nav-link align-middle px-0 text-white">
                        <FontAwesomeIcon icon={faGripLines}/> <span
                        className="ms-0 d-none d-sm-inline">{menu.displayName}</span>
                    </a>
                </li>
            )}
        </ul>
    )
}

export default MenuItem;