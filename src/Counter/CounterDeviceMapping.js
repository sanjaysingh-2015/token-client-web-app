import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import { history } from '../_helpers';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {
    tokenTypeActions,
    categoryActions,
    departmentActions,
    organizationActions,
    counterActions,
    masterLookupActions
} from "../_actions";
import { lookupTypeConstants } from "../_constants";
import {useDispatch, useSelector} from "react-redux";
import "../_components/templates/custom-styles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
import IconButton from "@material-ui/core/IconButton";
import {isEmpty} from "lodash";
import Select from "react-select";

export const CounterForm = () => {
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState('');
    const [code, setCode] = useState('');
    const [counterNo, setCounterNo] = useState('');
    const [status, setStatus] = useState('');
    const [organizations, setOrganizations] = useState([{ label: "Please select", value: "" }]);
    const [departments, setDepartments] = useState([{ label: "Please select", value: "" }]);
    const [categories, setCategories] = useState([{ label: "Please select", value: "" }]);
    const [tokenTypes, setTokenTypes] = useState([{ label: "Please select", value: "" }]);
    const [devices, setDevices] = useState( [{ label: "Please select", value: "" }]);
    const [orgCode, setOrgCode] = useState(null);
    const [deptCode, setDeptCode] = useState(null);
    const [catCode, setCatCode] = useState(null);
    const [typeCode, setTypeCode] = useState(null);
    const [selectedDevices, setSelectedDevices] = useState([]);
    const dispatch = useDispatch();
    const param = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setOrgCode(param?.state?.orgCode);
        setId(param?.state?.data?.id);
        setCode(param?.state?.data?.code);
        setCounterNo(param?.state?.data?.counterNo);
        setStatus(param?.state?.data?.status);
        setDeptCode(param?.state?.deptCode);
        setCatCode(param?.state?.catCode);
        setTypeCode(param?.state?.typeCode);
        setOrganizations(param?.state?.orgCode);
        setDepartments(param?.state?.deptCode);
        setCategories(param?.state?.catCode);
        setTokenTypes(param?.state?.typeCode);
        setDevices(param?.state?.devices);
        param?.state?.data?.mappedDevices?.map((stage) => (setSelectedDevices(current => [...current, {value: stage.code, label: stage.name}])));

        masterLookupActions.getAll("ALL",
            param?.state?.orgCode?.value === undefined ?'':param?.state?.orgCode?.value,
            param?.state?.deptCode?.value === undefined ?'':param?.state?.deptCode?.value,
            param?.state?.catCode?.value === undefined ?'':param?.state?.catCode?.value,
            param?.state?.typeCode?.value === undefined ?'':param?.state?.typeCode?.value
            ).then((response) => {
            setOrganizations(response.data.organizations);
            setDepartments(response.data.departments);
            setCategories(response.data.categories);
            setTokenTypes(response.data.tokenTypes);
            setDevices(response.data.devices);
        });
    },[]);

    const handleSubmit = (event) => {

        if(orgCode === undefined || isEmpty(orgCode)) setOrgCode(null);
        event.preventDefault();
            if(orgCode === '') {
            } else {
                let currentSelectedDevices = [];
                console.log("selectedDevices", selectedDevices);
                selectedDevices?.map((stage) => (currentSelectedDevices.push(stage.value)));
                console.log("Devices Selected: ",currentSelectedDevices);
                dispatch(counterActions.addDeviceMap(counterNo,{
                    organizationCode: orgCode.value,
                    departmentCode: deptCode? deptCode.value:'',
                    tokenCategoryCode: catCode? catCode.value:'',
                    tokenTypeCode: typeCode? typeCode.value:'',
                    counterCode: code,
                    devices: currentSelectedDevices
                }));
            }

        navigate("/counters", {
            state:{
                orgCode,
                deptCode,
                catCode,
                typeCode
            },
        });
    }

    const handleChange = (event) => {
        console.log("event:", event);
        setSelectedDevices([]);
        event.map((device) => (setSelectedDevices(current => [...current, device])));
    };

    const handleBackClick = (event,data) => {
        navigate("/counters", {
            state:{
                orgCode,
                deptCode,
                catCode,
                typeCode
            },
        });
    };

    return (
        <>
            <div className="container table-container">
                <div className="row form-row" style={{color:'#fff', backgroundColor: '#2a4262',padding:'0.25em'}}>
                    <div className="col-md-6" style={{marginTop:'0.25em'}}>
                        <h4>Counter Device Map</h4>
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
                                                isDisabled={true}
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
                                                <span className="input-group-text required" id="departmentList">Department</span>
                                            </div>
                                            <Select
                                                className="custom-select form-control form-control-1 header-drop-down float-right"
                                                style={{padding: '0px !important'}}
                                                id="orgList"
                                                isDisabled={true}
                                                value={deptCode}
                                                options={departments}
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
                                                <span className="input-group-text required" id="categoryList">Category</span>
                                            </div>
                                            <Select
                                                className="custom-select form-control form-control-1 header-drop-down float-right"
                                                style={{padding: '0px !important'}}
                                                id="orgList"
                                                isDisabled={true}
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
                                                <span className="input-group-text required" id="tokenTypeList">Token Type</span>
                                            </div>
                                            <Select
                                                className="custom-select form-control form-control-1 header-drop-down float-right"
                                                style={{padding: '0px !important'}}
                                                id="tokenTypeList"
                                                isDisabled={true}
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
                                                <span className="input-group-text required" id="counterNo">Counter No</span>
                                            </div>
                                            <input className="form-control" placeholder="Enter Counter Number" name="counterNo" value={counterNo} onChange={(e) => setCounterNo(e.target.value)} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text required" id="deviceList">Devices</span>
                                            </div>
                                            <Select
                                                className="custom-select form-control form-control-1 header-drop-down float-right"
                                                style={{padding: '0px !important'}}
                                                id="deviceList"
                                                isMulti
                                                onChange={handleChange}
                                                value={selectedDevices}
                                                options={devices}
                                            />
                                        </div>
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

export default CounterForm;