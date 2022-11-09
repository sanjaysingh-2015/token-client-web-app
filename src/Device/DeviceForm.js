import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import { history } from '../_helpers';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {
    tokenTypeActions,
    categoryActions,
    departmentActions,
    organizationActions,
    deviceActions, masterLookupActions
} from "../_actions";
import {useDispatch, useSelector} from "react-redux";
import "../_components/templates/custom-styles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
import IconButton from "@material-ui/core/IconButton";
import {isEmpty} from "lodash";
import Select from "react-select";

export const DeviceForm = () => {
    const [tokenTypes, setTokenTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [orgCode, setOrgCode] = useState({value: 'Loading', label:'Please select'});
    const [deptCode, setDeptCode] = useState({value: 'Loading', label:'Please select'});
    const [catCode, setCatCode] = useState({value: 'Loading', label:'Please select'});
    const [typeCode, setTypeCode] = useState({value: 'Loading', label:'Please select'});
    const [deviceUid, setDeviceUid] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const [port, setPort]  = useState('');
    const [deviceType, setDeviceType] = useState('');
    const [deviceLayout,setDeviceLayout] = useState('');
    const [id, setId] = useState('');
    const [status, setStatus] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useLocation();

    useEffect(() => {
        console.log("Data: ", param?.state?.data);
        setId(param?.state?.data?.id);
        setStatus(param?.state?.data?.status);
        setCatCode(param?.state?.catCode);
        setDeptCode(param?.state?.deptCode);
        setOrgCode(param?.state?.orgCode);
        setTypeCode(param?.state?.typeCode);
        setDeviceUid(param?.state?.data?.deviceUid);
        setDeviceName(param?.state?.data?.deviceName);
        setIpAddress(param?.state?.data?.ipAddress);
        setPort(param?.state?.data?.port);
        setDeviceType(param?.state?.data?.deviceType);
        setDeviceLayout(param?.state?.data?.deviceLayout);
        masterLookupActions.getAll("ALL",
            param?.state?.orgCode?.value,
            param?.state?.deptCode?.value,
            param?.state?.catCode?.value,
            param?.state?.typeCode?.value).then((response) => {
            setOrganizations(response.data.organizations);
            setDepartments(response.data.departments);
            setCategories(response.data.categories);
            setTokenTypes(response.data.tokenTypes);
        });
    },[]);

    const handleSubmit = (event) => {
        if(orgCode === undefined || isEmpty(orgCode)) setOrgCode(null);
        event.preventDefault();
        if(id === undefined) {
            if(orgCode === undefined) {
            } else {
                dispatch(deviceActions.add({
                    organizationCode: orgCode.value,
                    departmentCode: deptCode? deptCode.value:'',
                    tokenCategoryCode: catCode? catCode.value:'',
                    tokenTypeCode: typeCode? typeCode.value:'', deviceUid, deviceName, ipAddress, port, deviceType, deviceLayout
                }));
            }
        } else {
            dispatch(deviceActions.edit(deviceUid, {organizationCode: orgCode.value,
                departmentCode: deptCode? deptCode.value:'',
                tokenCategoryCode: catCode? catCode.value:'',
                tokenTypeCode: typeCode? typeCode.value:'', deviceUid, deviceName, ipAddress, port, deviceType, deviceLayout, status}));
        }
        navigate("/devices", {
            state:{
                orgCode,
                deptCode,
                catCode,
                typeCode
            },
        });
    }
    function handleOrganizationChange(data) {
        setOrgCode(data);
        if(data === undefined || isEmpty(data)) {
            setOrgCode({value: 'Loading', label:'Please select'});
            setDeptCode({value: 'Loading', label:'Please select'});
            setCatCode({value: 'Loading', label:'Please select'});
            setTypeCode({value: 'Loading', label:'Please select'});
            masterLookupActions.getAll("ALL",
                '',
                '',
                '',
                '').then((response) => {
                setOrganizations(response.data.organizations);
                setDepartments(response.data.departments);
                setCategories(response.data.categories);
                setTokenTypes(response.data.tokenTypes);
            });
        } else {
            masterLookupActions.getAll("ALL",
                data.value,
                '',
                '',
                '').then((response) => {
                setOrganizations(response.data.organizations);
                setDepartments(response.data.departments);
                setCategories(response.data.categories);
                setTokenTypes(response.data.tokenTypes);
            });
        }
    }
    function handleDepartmentChange(dept) {
        setDeptCode(dept);
        if(dept === undefined  || isEmpty(dept)) {
            setDeptCode({value: 'Loading', label:'Please select'});
            setCatCode({value: 'Loading', label:'Please select'});
            setTypeCode({value: 'Loading', label:'Please select'});
            masterLookupActions.getAll("ALL",
                '',
                '',
                '',
                '').then((response) => {
                setOrganizations(response.data.organizations);
                setDepartments(response.data.departments);
                setCategories(response.data.categories);
                setTokenTypes(response.data.tokenTypes);
            });
        } else {
            masterLookupActions.getAll("ALL",
                orgCode.value,
                dept.value,
                '',
                '').then((response) => {
                setOrganizations(response.data.organizations);
                setDepartments(response.data.departments);
                setCategories(response.data.categories);
                setTokenTypes(response.data.tokenTypes);
            });
        }
    }
    function handleCategoryChange(cat) {
        console.log("Selected Cat -> ", {cat});
        setCatCode(cat);
        if(cat === undefined  || isEmpty(cat)) {
            setCatCode({value: 'Loading', label:'Please select'});
            setTypeCode({value: 'Loading', label:'Please select'});
            masterLookupActions.getAll("ALL",
                '',
                '',
                '',
                '').then((response) => {
                setOrganizations(response.data.organizations);
                setDepartments(response.data.departments);
                setCategories(response.data.categories);
                setTokenTypes(response.data.tokenTypes);
            });
        } else {
            masterLookupActions.getAll("ALL",
                orgCode.value,
                deptCode.value,
                cat.value,
                '').then((response) => {
                setOrganizations(response.data.organizations);
                setDepartments(response.data.departments);
                setCategories(response.data.categories);
                setTokenTypes(response.data.tokenTypes);
            });
        }
    }
    function handleTypeChange(typeCd) {
        setTypeCode(typeCd);
        if(typeCd === undefined  || isEmpty(typeCd)) {
            setTypeCode({value: 'Loading', label:'Please select'});
            masterLookupActions.getAll("ALL",
                '',
                '',
                '',
                '').then((response) => {
                setOrganizations(response.data.organizations);
                setDepartments(response.data.departments);
                setCategories(response.data.categories);
                setTokenTypes(response.data.tokenTypes);
            });
        } else {
            masterLookupActions.getAll("ALL",
                orgCode.value,
                deptCode.value,
                catCode.value,
                typeCd.value).then((response) => {
                setOrganizations(response.data.organizations);
                setDepartments(response.data.departments);
                setCategories(response.data.categories);
                setTokenTypes(response.data.tokenTypes);
            });
        }
    }
    const handleBackClick = (event,data) => {
        navigate("/devices", {
            state:{
                orgCode,
                deptCode,
                catCode,
                typeCode
            },
        });
    };
    function handleStatusChange(status) {
        setStatus(status);
    }

    return (
        <>
            <div className="container table-container">
                <div className="row form-row" style={{color:'#fff', backgroundColor: '#2a4262',padding:'0.25em'}}>
                    <div className="col-md-6" style={{marginTop:'0.25em'}}>
                        <h4>Process Stage</h4>
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
                                            <Select
                                                className="custom-select form-control form-control-1 header-drop-down float-right"
                                                style={{padding: '0px !important'}}
                                                id="orgList"
                                                onChange={handleOrganizationChange}
                                                value={orgCode}
                                                options={organizations}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="departmentList">Department</span>
                                            </div>
                                            <Select
                                                className="custom-select form-control form-control-1 header-drop-down float-right"
                                                style={{padding: '0px !important'}}
                                                id="orgList"
                                                onChange={handleDepartmentChange}
                                                value={deptCode}
                                                options={departments}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="categoryList">Category</span>
                                            </div>
                                            <Select
                                                className="custom-select form-control form-control-1 header-drop-down float-right"
                                                style={{padding: '0px !important'}}
                                                id="orgList"
                                                onChange={handleCategoryChange}
                                                value={catCode}
                                                options={categories}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="tokenTypeList">Token Type</span>
                                            </div>
                                            <Select
                                                className="custom-select form-control form-control-1 header-drop-down float-right"
                                                style={{padding: '0px !important'}}
                                                id="orgList"
                                                onChange={handleTypeChange}
                                                value={typeCode}
                                                options={tokenTypes}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text required" id="deviceUid">Name</span>
                                            </div>
                                            <input className="form-control" placeholder="Enter Device UID" name="deviceUid" value={deviceUid} onChange={(e) => setDeviceUid(e.target.value)} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text required" id="name">Name</span>
                                            </div>
                                            <input className="form-control" placeholder="Enter Name" name="name" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text required" id="ipAddress">IP Address</span>
                                            </div>
                                            <input className="form-control" placeholder="Enter IP Address" name="ipAddress" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text required" id="port">Port</span>
                                            </div>
                                            <input className="form-control" placeholder="Enter Port" name="port" value={port} onChange={(e) => setPort(e.target.value)} required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text required" id="deviceType">Device Type</span>
                                            </div>
                                            <input className="form-control" placeholder="Enter Device Type" name="deviceType" value={deviceType} onChange={(e) => setDeviceType(e.target.value)} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text required" id="deviceLayout">Device Layout</span>
                                            </div>
                                            <input className="form-control" placeholder="Enter Device Layout" name="deviceLayout" value={deviceLayout} onChange={(e) => setDeviceLayout(e.target.value)} required/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row form-row">
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

export default DeviceForm;