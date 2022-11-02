import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { departmentActions } from '../_actions';
import { organizationActions } from '../_actions';
import CustomDataTable from "../_components/templates/CustomDataTable";
import {isEmpty} from "lodash";
import IconButton from "@material-ui/core/IconButton";
import {Edit} from "@material-ui/icons";
import Delete from "@material-ui/icons/Delete";
import Button from "react-bootstrap/Button";
import DepartmentForm from "./DepartmentForm";
import Add from "@material-ui/icons/Add";
import ArrowBack from "@material-ui/icons/ArrowBack";
import {Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";


const DepartmentPage = () => {
    const departments = useSelector(state => state.departments.items);
    const organizations = useSelector(state => state.organizations.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ orgCode, setOrgCode] = useState('');
    const param = useLocation();

    useEffect(() => {
        setOrgCode(param?.state?.orgCode);
        dispatch(organizationActions.getAll());
    }, []);

    function handleOrganizationChange(org) {
        setOrgCode(org);
        dispatch(departmentActions.getAll(org));
    }

    function handleDeleteUser(id) {
        dispatch(departmentActions.delete(id));
    }

    const handleAddClick = () => {
        navigate("/dept-add", {
            state:{
                orgCode
            }
        });
    }

    const handleClick = (event,data) => {
        navigate("/dept-edit", {
            state:{
                orgCode,
                data
            },
        });
    };

    const handleDeleteClick = (event, data) => {
        dispatch(departmentActions.delete(data.id));
    }
    const columns = [
        {name: "Code", selector: row => row.code},
        {name: "Name", selector: row => row.name, sortable: true},
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

    return (
        <>
            <div className="container table-container">
                <div style={{backgroundColor: '#fff'}}>
                    <div className="row form-row" style={{color:'#fff', backgroundColor: '#2a4262',padding:'0.25em'}}>
                        <div className="col-md-6" style={{marginTop:'0.25em'}}>
                            <h4>Department</h4>
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
            </div>
            <div className="container table-container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="organizationList">Organization</span>
                                </div>
                                <select value={orgCode} className="custom-select form-control header-drop-down float-right" id="organizationList" onChange={(e)=>handleOrganizationChange(e.target.value)}>
                                    <option key={0} value=''>Choose...</option>
                                    {organizations?.map((org) => (
                                        <option key={org.code} value={org.code}>{org.name}</option>
                                    ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {departments ? (<CustomDataTable tableData={departments} tableColumns={columns} tableTitle={"Department"}  subTableTitle={"Category"}/>):""}
        </>
    );
}

export default DepartmentPage;