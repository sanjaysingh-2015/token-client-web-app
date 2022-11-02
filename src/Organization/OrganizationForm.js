import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import Button from 'react-bootstrap/Button';
import { history } from '../_helpers';
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Typography } from '@mui/material';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {organizationActions} from "../_actions";
import {useDispatch} from "react-redux";
import "../_components/templates/custom-styles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft, faRotate} from "@fortawesome/free-solid-svg-icons";
import IconButton from "@material-ui/core/IconButton";

export const OrganizationForm = () => {
    const [id, setId] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail]  = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress ] = useState('');
    const [city, setCity ] = useState('');
    const [state, setState ] = useState('');
    const [country, setCountry ] = useState('');
    const [tokenPrefix, setTokenPrefix] = useState('');
    const [status, setStatus] = useState('');
    const [authCode, setAuthCode] = useState('');
    const dispatch = useDispatch();
    const param = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setId(param?.state?.data?.id);
        setCode(param?.state?.data?.code);
        setName(param?.state?.data?.name);
        setEmail(param?.state?.data?.email);
        setPhoneNo(param?.state?.data?.phoneNo);
        setMiddleName(param?.state?.data?.middleName);
        setFirstName(param?.state?.data?.firstName);
        setLastName(param?.state?.data?.lastName);
        setAddress(param?.state?.data?.address);
        setCity(param?.state?.data?.city);
        setState(param?.state?.data?.state);
        setCountry(param?.state?.data?.country);
        setTokenPrefix(param?.state?.data?.tokenPrefix);
        setStatus(param?.state?.data?.status);
        setAuthCode(param?.state?.data?.authCode);
    },[]);

    const handleBackClick = () => {
        navigate("/organization");
    }
    const handleAuthTokenRefresh = () => {
        dispatch(organizationActions.refreshAuthToken(code));
        navigate("/organization");
    }

    function handleStatusChange(status) {
        setStatus(status);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(id === undefined) {
            dispatch(organizationActions.add({name, email, phoneNo, firstName, middleName, lastName, address, city, state, country, tokenPrefix}));
        } else {
            dispatch(organizationActions.edit({name, email, phoneNo, firstName, middleName, lastName, address, city, state, country, tokenPrefix, status}, id));
        }
        navigate("/organization");
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
                            <IconButton style={{ textDecoration: 'none', color:'#fff',marginTop:'-0.5em' }} onClick={handleBackClick}>
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
                                            <span className="input-group-text required" id="name">Name</span>
                                        </div>
                                        <input className="form-control" placeholder="Enter Name" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text required" id="tokenPrefix">Token Prefix</span>
                                        </div>
                                        <input className="form-control" placeholder="Enter Token Prefix(Max 4 Characters)" name="tokenPrefix" id="tokenPrefix" value={tokenPrefix} onChange={(e) => setTokenPrefix(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row form-row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text required" id="email">Email</span>
                                        </div>
                                        <input className="form-control" placeholder="Enter Email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text required" id="phoneNo">Phone Number</span>
                                        </div>
                                        <input className="form-control" placeholder="Enter Phone Number" id="phoneNo" name="phoneNo" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row form-row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text required" id="firstName">First Name</span>
                                        </div>
                                        <input className="form-control" placeholder="Enter First Name" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="middleName">Middle Name</span>
                                        </div>
                                        <input className="form-control" placeholder="Enter Middle Name" id="middleName" name="middleName" value={middleName} onChange={(e) => setMiddleName(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row form-row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text required" id="lastName">Last Name</span>
                                        </div>
                                        <input className="form-control" placeholder="Enter Last Name" name="lastName" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text required" id="address">Address</span>
                                        </div>
                                        <input className="form-control" placeholder="Enter Address" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row form-row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text required" id="city">City</span>
                                        </div>
                                        <input className="form-control" placeholder="Enter City" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="state">State</span>
                                        </div>
                                        <input className="form-control" placeholder="Enter State" name="state" id="state" value={state} onChange={(e) => setState(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row form-row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="country">Country</span>
                                        </div>
                                        <input className="form-control" placeholder="Enter Country" id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            { id &&
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text required"
                                                      id="status">Status</span>
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
                        <div className="row form-row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text required" id="authCode">Auth Code</span>
                                        </div>
                                        <input className="form-control" placeholder="Auth Code" name="authCode" id="authCode" value={authCode} disabled={true}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <IconButton style={{ textDecoration: 'none', color:'#677b9b',marginTop:'-0.5em' }} onClick={handleAuthTokenRefresh}>
                                        <FontAwesomeIcon icon={faRotate}/>
                                    </IconButton>
                                </div>
                            </div>
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

export default OrganizationForm;