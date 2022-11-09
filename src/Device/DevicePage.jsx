import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    organizationActions,
    departmentActions,
    categoryActions,
    tokenTypeActions,
    deviceActions,
    masterLookupActions, counterActions
} from '../_actions';
import CustomDataTable from "../_components/templates/CustomDataTable";
import IconButton from "@material-ui/core/IconButton";
import {Edit} from "@material-ui/icons";
import Delete from "@material-ui/icons/Delete";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {isEmpty} from "lodash";
import Select from "react-select";


const DevicePage = () => {
    const [devices, setDevices] = useState([]);
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
        getDeviceData(
            param?.state?.orgCode?.value === undefined?'':param?.state?.orgCode?.value,
            param?.state?.deptCode?.value === undefined?'':param?.state?.deptCode?.value,
            param?.state?.catCode?.value === undefined?'':param?.state?.catCode?.value,
            param?.state?.typeCode?.value === undefined?'':param?.state?.typeCode?.value);
    }, []);

    function getDeviceData(orgCode, deptCode, catCode, typeCode) {
        console.log("Start");
        deviceActions.getList(
            orgCode,
            deptCode,
            catCode,
            typeCode).then((response) => {
                console.log("Response: ",response);
                setDevices(response);
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
            getDeviceData(data.value, '','','');
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
            getDeviceData(orgCode.value, dept.value,'','');
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
            getDeviceData(orgCode.value, deptCode.value,cat.value,'');
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
            getDeviceData(orgCode.value, deptCode.value,catCode.value,typeCd.value);
        }
    }
    const handleDeleteClick = (event,data) => {
        dispatch(deviceActions.delete(data.id));
    }

    const handleClick = (event,data) => {
        navigate("/device-edit", {
            state:{
                orgCode,
                deptCode,
                catCode,
                typeCode,
                data
            },
        });
    };

    const handleAddClick = (event) => {
        navigate("/device-add", {
            state:{
                orgCode,
                deptCode,
                catCode,
                typeCode
            },
        });
    };

    const columns = [
        {name: "UID", selector: row => row.deviceUid},
        {name: "Name", selector: row => row.deviceName, sortable: true},
        {name: "IP Address", selector: row => row.ipAddress, sortable: true},
        {name: "Port", selector: row => row.port, sortable: true},
        {name: "Type", selector: row => row.deviceType, sortable: true},
        {name: "Layout", selector: row => row.deviceLayout, sortable: true},
        {name: "Status", selector: row => row.status, sortable: true},
        {
            cell: (row) => (
                <div>
                    <IconButton color="primary" onClick={(e) => handleClick(e, row)}>
                        <Edit/>
                    </IconButton>
                    <IconButton color="secondary"  onClick={(e) => handleDeleteClick(e, row)}>
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
                            <h4>Process Stage</h4>
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
            </div>
            {devices ? (<CustomDataTable tableData={devices} tableColumns={columns} tableTitle={"Process Stage"} subTableTitle={""}/>):""}
        </>
    );
}

export default DevicePage;