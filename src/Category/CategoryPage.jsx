import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { categoryActions } from '../_actions';
import { departmentActions } from '../_actions';
import { organizationActions } from '../_actions';
import CustomDataTable from "../_components/templates/CustomDataTable";
import {isEmpty} from "lodash";
import IconButton from "@material-ui/core/IconButton";
import {Edit} from "@material-ui/icons";
import Delete from "@material-ui/icons/Delete";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";


const CategoryPage = () => {
    const categories = useSelector(state => state.categories.items);
    const departments = useSelector(state => state.departments.items);
    const organizations = useSelector(state => state.organizations.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useLocation();
    const [orgCode, setOrgCode] = useState('');
    const [deptCode, setDeptCode] = useState('');
    const [id, setId] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        setId(param?.state?.data?.id);
        setStatus(param?.state?.data?.status);
        setOrgCode(param?.state?.orgCode);
        setDeptCode(param?.state?.deptCode);
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

    const handleDeleteClick = (event,data) => {
        dispatch(categoryActions.delete(data.id));
    }

    const handleClick = (event,data) => {
        navigate("/cat-edit", {
            state:{
                orgCode,
                deptCode,
                data
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
                    <IconButton color="secondary" onClick={(e) => handleDeleteClick(e, row)}>
                        <Delete/>
                    </IconButton>
                </div>
            ),
            button: true,
        }
    ];
    const handleAddClick = (event) => {
        navigate("/cat-add", {
            state:{
                orgCode,
                deptCode
            },
        });
    };
    return (
        <>
            <div className="container table-container">
                <div style={{backgroundColor: '#fff'}}>
                    <div className="row form-row" style={{color:'#fff', backgroundColor: '#2a4262',padding:'0.25em'}}>
                        <div className="col-md-6" style={{marginTop:'0.25em'}}>
                            <h4>Category</h4>
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
            </div>
            {categories ? (<CustomDataTable tableData={categories} tableColumns={columns} tableTitle={"Category"} subTableTitle={"Token Type"}/>):""}
        </>
    );
}

export default CategoryPage;