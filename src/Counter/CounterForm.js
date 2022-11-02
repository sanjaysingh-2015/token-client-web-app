import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import { history } from '../_helpers';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {
    tokenTypeActions,
    categoryActions,
    departmentActions,
    organizationActions,
    counterActions, masterLookupActions
} from "../_actions";
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
    const [processStages, setProcessStages] = useState( [{ label: "Please select", value: "" }]);
    const [orgCode, setOrgCode] = useState(null);
    const [deptCode, setDeptCode] = useState(null);
    const [catCode, setCatCode] = useState(null);
    const [typeCode, setTypeCode] = useState(null);
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
            setProcessStages(response.data.processStages);
        });

    },[]);

    const handleSubmit = (event) => {
        if(orgCode === undefined || isEmpty(orgCode)) setOrgCode('');
        event.preventDefault();
        if(id === undefined) {
            if(orgCode === '') {
            } else {
                dispatch(counterActions.add({
                    organizationCode: orgCode.value,
                    departmentCode: deptCode? deptCode.value:'',
                    tokenCategoryCode: catCode? catCode.value:'',
                    tokenTypeCode: typeCode? typeCode.value:'', counterNo
                }));
            }
        } else {
            dispatch(counterActions.edit(code,
                {organizationCode: orgCode.value,
                    departmentCode: deptCode? deptCode.value:'',
                    tokenCategoryCode: catCode? catCode.value:'',
                    tokenTypeCode: typeCode? typeCode.value:'', counterNo, status}));
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
    function handleOrganizationChange(org) {
        setOrgCode(org);
        dispatch(departmentActions.getAll(org));
    }
    function handleDepartmentChange(dept) {
        setDeptCode(dept);
        dispatch(categoryActions.getAll(dept));
    }
    function handleCategoryChange(cat) {
        setCatCode(cat);
        dispatch(tokenTypeActions.getAll(cat));
    }
    function handleTypeChange(typeCode) {
        setTypeCode(typeCode);
    }
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
    function handleStatusChange(status) {
        setStatus(status);
    }

    return (
        <>
            <div className="container table-container">
                <div className="row form-row" style={{color:'#fff', backgroundColor: '#2a4262',padding:'0.25em'}}>
                    <div className="col-md-6" style={{marginTop:'0.25em'}}>
                        <h4>Counter</h4>
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
                                                <span className="input-group-text required" id="departmentList">Department</span>
                                            </div>
                                            <Select
                                                className="custom-select form-control form-control-1 header-drop-down float-right"
                                                style={{padding: '0px !important'}}
                                                id="deptList"
                                                onChange={handleDepartmentChange}
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
                                                id="catList"
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
                                                <span className="input-group-text required" id="tokenTypeList">Token Type</span>
                                            </div>
                                            <Select
                                                className="custom-select form-control form-control-1 header-drop-down float-right"
                                                style={{padding: '0px !important'}}
                                                id="tokenTypeList"
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
                                                <span className="input-group-text required" id="counterNo">Counter No</span>
                                            </div>
                                            <input className="form-control" placeholder="Enter Counter Number" name="counterNo" value={counterNo} onChange={(e) => setCounterNo(e.target.value)} required/>
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