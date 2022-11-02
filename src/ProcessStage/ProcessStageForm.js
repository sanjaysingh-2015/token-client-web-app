import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import { history } from '../_helpers';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {
    tokenTypeActions,
    categoryActions,
    departmentActions,
    organizationActions,
    processStageActions
} from "../_actions";
import {useDispatch, useSelector} from "react-redux";
import "../_components/templates/custom-styles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
import IconButton from "@material-ui/core/IconButton";
import {isEmpty} from "lodash";

export const ProcessStageForm = () => {
    const [id, setId] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const organizations = useSelector(state => state.organizations.items);
    const departments = useSelector(state => state.departments.items);
    const categories = useSelector(state => state.categories.items);
    const tokenTypes = useSelector(state => state.tokenTypes.items);
    const dispatch = useDispatch();
    const [orgCode, setOrgCode] = useState('');
    const [deptCode, setDeptCode] = useState('');
    const [catCode, setCatCode] = useState('');
    const [typeCode, setTypeCode] = useState('');
    const param = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(organizationActions.getAll());
        setOrgCode(param?.state?.orgCode);
        setDeptCode(param?.state?.deptCode);
        setCatCode(param?.state?.catCode);
        setTypeCode(param?.state?.typeCode);
        setId(param?.state?.data?.id);
        setCode(param?.state?.data?.code);
        setName(param?.state?.data?.name);
        setStatus(param?.state?.data?.status);
    },[]);

    const handleSubmit = (event) => {
        if(orgCode === undefined || isEmpty(orgCode)) setOrgCode('');
        event.preventDefault();
        if(id === undefined) {
            if(orgCode === '') {
            } else {
                dispatch(processStageActions.add({
                    organizationCode: orgCode,
                    departmentCode: deptCode? deptCode:'',
                    tokenCategoryCode: catCode? catCode:'',
                    tokenTypeCode: typeCode? typeCode:'', name
                }));
            }
        } else {
            dispatch(processStageActions.edit(code, {orgCode, deptCode, catCode, typeCode, name, status}));
        }
        navigate("/process-stage", {
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
        navigate("/process-stage", {
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
                                                <span className="input-group-text required" id="departmentList">Department</span>
                                            </div>
                                            <select value={deptCode} className="custom-select form-control header-drop-down float-right" id="departmentList" onChange={(e)=>handleDepartmentChange(e.target.value)}>
                                                <option key={0} value=''>Choose...</option>
                                                {departments?.map((dept) => (
                                                    <option key={dept.code} value={dept.code}>{dept.name}</option>
                                                ))
                                                }
                                            </select>
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
                                            <select value={catCode} className="custom-select form-control header-drop-down float-right" id="categoryList" onChange={(e)=>handleCategoryChange(e.target.value)}>
                                                <option key={0} value=''>Choose...</option>
                                                {categories?.map((cat) => (
                                                    <option key={cat.code} value={cat.code}>{cat.name}</option>
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
                                                <span className="input-group-text required" id="tokenTypeList">Token Type</span>
                                            </div>
                                            <select value={typeCode} className="custom-select form-control header-drop-down float-right" id="tokenTypeList" onChange={(e)=>handleTypeChange(e.target.value)}>
                                                <option key={0} value=''>Choose...</option>
                                                {tokenTypes?.map((tokenType) => (
                                                    <option key={tokenType.code} value={tokenType.code}>{tokenType.name}</option>
                                                ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-row">
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

export default ProcessStageForm;