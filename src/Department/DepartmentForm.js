import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import { history } from '../_helpers';
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Typography } from '@mui/material';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {departmentActions, organizationActions } from "../_actions";
import {useDispatch, useSelector} from "react-redux";
import "../_components/templates/custom-styles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
import IconButton from "@material-ui/core/IconButton";

export const DepartmentForm = () => {
    const [id, setId] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [tokenPrefix, setTokenPrefix] = useState('');
    const [status, setStatus] = useState('');
    const organizations = useSelector(state => state.organizations.items);
    const dispatch = useDispatch();
    const [orgCode, setOrgCode] = useState('');
    const param = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(organizationActions.getAll());
        setId(param?.state?.id);
        setOrgCode(param?.state?.orgCode);
        setId(param?.state?.data?.id);
        setCode(param?.state?.data?.code);
        setName(param?.state?.data?.name);
        setTokenPrefix(param?.state?.data?.tokenPrefix);
        setStatus(param?.state?.data?.status);
    },[]);

    function handleStatusChange(status) {
        setStatus(status);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(id === undefined) {
            dispatch(departmentActions.add(orgCode, {name,tokenPrefix}));
        } else {
            dispatch(departmentActions.edit(orgCode, {name, tokenPrefix, status}, code));
        }
        navigate("/department", {
            state: {
                orgCode
            },
        });
    }
    function handleOrganizationChange(org) {
        setOrgCode(org);
    }
    const handleBackClick = (event,data) => {
        navigate("/department", {
            state:{
                orgCode
            },
        });
    };

    return (
        <>
            <div className="container table-container">
                <div className="row form-row" style={{color:'#fff', backgroundColor: '#2a4262',padding:'0.25em'}}>
                    <div className="col-md-6" style={{marginTop:'0.25em'}}>
                        <h4>Department</h4>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group text-end" style={{ paddingTop:'0.5em' }}>
                            <IconButton style={{ textDecoration: 'none', color:'#fff',marginTop:'-0.5em' }} onClick={(e) => handleBackClick(e)}>
                                <FontAwesomeIcon icon={faCircleArrowLeft}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container table-container">
                <div style={{backgroundColor: '#fff', padding: "1em"}}>
                    <div style={{backgroundColor: '#efefef', padding: "1em"}}>
                        <form onSubmit={handleSubmit}>
                            <div className="row form-row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text required" id="organizationList">Organization</span>
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
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text required" id="name">Name</span>
                                            </div>
                                            <input className="form-control" placeholder="Enter Name" name="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="tokenPrefix">Token Prefix</span>
                                            </div>
                                            <input className="form-control" placeholder="Enter Token Prefix(Max 4 Characters)" id="tokenPrefix" name="tokenPrefix" value={tokenPrefix} onChange={(e) => setTokenPrefix(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                { id &&
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                <span className="input-group-text required" id="status">Status</span>
                                                </div>
                                                <select value={status}
                                                        className="custom-select form-control header-drop-down float-right"
                                                        id="status"
                                                        onChange={(e) => handleStatusChange(e.target.value)}>
                                                    <option key="ACTIVE" value="ACTIVE">ACTIVE</option>
                                                    <option key="INACTIVE" value="INACTIVE">INACTIVE</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                             <hr/>
                            <div className="row form-row">
                                <div className="col-md-12 text-end">
                                    <Button variant="primary" type="submit" className="text-end">
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DepartmentForm;