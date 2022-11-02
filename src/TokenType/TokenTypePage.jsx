import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { organizationActions, departmentActions, categoryActions, tokenTypeActions } from '../_actions';
import CustomDataTable from "../_components/templates/CustomDataTable";
import IconButton from "@material-ui/core/IconButton";
import {Edit} from "@material-ui/icons";
import Delete from "@material-ui/icons/Delete";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";


const TokenTypePage = () => {
    const tokenTypes = useSelector(state => state.tokenTypes.items);
    const categories = useSelector(state => state.categories.items);
    const departments = useSelector(state => state.departments.items);
    const organizations = useSelector(state => state.organizations.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useLocation();
    const [orgCode, setOrgCode] = useState('');
    const [deptCode, setDeptCode] = useState('');
    const [catCode, setCatCode] = useState('');
    const [id, setId] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        setId(param?.state?.data?.id);
        setStatus(param?.state?.data?.status);
        setCatCode(param?.state?.catCode);
        setDeptCode(param?.state?.deptCode);
        setOrgCode(param?.state?.orgCode);
        dispatch(organizationActions.getAll());
    }, []);

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
    const handleDeleteClick = (event,data) => {
        dispatch(tokenTypeActions.delete(data.id));
    }

    const handleClick = (event,data) => {
        navigate("/token-type-edit", {
            state:{
                orgCode,
                deptCode,
                catCode,
                data
            },
        });
    };

    const handleAddClick = (event) => {
        navigate("/token-type-add", {
            state:{
                orgCode,
                deptCode,
                catCode
            },
        });
    };

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
                            <h4>Token Type</h4>
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
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="departmentList">Department</span>
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
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="categoryList">Category</span>
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
                </div>
            </div>
            {tokenTypes ? (<CustomDataTable tableData={tokenTypes} tableColumns={columns} tableTitle={"Token Type"} subTableTitle={""}/>):""}
        </>
    );
}

export default TokenTypePage;