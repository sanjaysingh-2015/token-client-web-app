import React, { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {departmentActions, organizationActions} from '../_actions';
import CustomDataTable from "../_components/templates/CustomDataTable";
import {isEmpty} from "lodash";
import IconButton from "@material-ui/core/IconButton";
import {Edit} from "@material-ui/icons";
import Delete from "@material-ui/icons/Delete";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";


const OrganizationPage = () => {
    const organizations = useSelector(state => state.organizations.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(organizationActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(organizationActions.delete(id));
    }
    const handleAdd = () => {
        navigate("/org-add");
    }

    const handleClick = (event,data) => {
        navigate("/org-edit", {
            state:{
                data
            },
        });
    };

    const columns = [
        {name: "Code", selector: row => row.code},
        {name: "Name", selector: row => row.name, sortable: true},
        {name: "First Name", selector: row => row.firstName},
        {name: "Last Name", selector: row => row.lastName, sortable: true},
        {name: "Email", selector: row => row.email, sortable: true},
        {name: "Phone No", selector: row => row.phoneNo, sortable: true},
        {name: "Country", selector: row => row.country, sortable: true},
        {name: "TokenPrefix", selector: row => row.tokenPrefix},
        {name: "Status", selector: row => row.status, sortable: true},
        {
            cell: (row) => (
                <div>
                    <IconButton color="primary" onClick={(e) => handleClick(e, row)}>
                        <Edit/>
                    </IconButton>
                    <IconButton color="secondary" onClick={(e) => handleDeleteClick(e, row)}>
                        <Delete/>
                    </IconButton>
                </div>
            ),
            button: true,
        }
    ];

    if (isEmpty(organizations)) {
        dispatch(organizationActions.getAll());
    }

    const handleAddClick = () => {
        navigate("/org-add");
    }

    const handleDeleteClick = (event, data) => {
        dispatch(organizationActions.delete(data.id));
    }

    return (
        <>
            <div className="container table-container">
                <div className="row form-row" style={{color:'#fff', backgroundColor: '#2a4262',padding:'0.25em'}}>
                    <div className="col-md-6" style={{marginTop:'0.25em'}}>
                        <h4>Organization</h4>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group text-end" style={{ paddingTop:'0.5em' }}>
                            <IconButton style={{ textDecoration: 'none', color:'#fff',marginTop:'-0.5em' }} onClick={(e) => handleAddClick(e)}>
                                <FontAwesomeIcon icon={faCirclePlus}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
            {organizations ? (<CustomDataTable tableData={organizations} tableColumns={columns} tableTitle={"Organization"} subTableTitle={"Department"}/>):""}
        </>

    );
}

export default OrganizationPage;