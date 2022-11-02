import React, {useState} from "react";
import DataTable from 'react-data-table-component';
import "./custom-styles.css"

import differenceBy from 'lodash/differenceBy';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Delete from '@material-ui/icons/Delete';
import {Checkbox} from "@material-ui/core";
import CustomChildDataTable from "./CustomChildDataTable";
import {Link, useNavigate} from "react-router-dom";

const sortIcon = <ArrowDownward/>;
const selectProps = {indeterminate: isIndeterminate => isIndeterminate};

const CustomDataTable = (props) => {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const [data, setData] = useState([]);
    const selectableRows = true;
    const expandableRows = true;

    const childColumns = [
        {name: "Code", selector: row => row.code},
        {name: "Name", selector: row => row.name, sortable: true},
        {name: "Token Prefix", selector: row => row.tokenPrefix},
        {name: "Status", selector: row => row.status, sortable: true}
    ];

    const ExpandedComponent = ({data}) => {
        let childData = [];
        switch(props.subTableTitle) {
            case 'Department':
                childData = data.departments; break;
            case 'Category' :
                childData = data.tokenCategories; break;
            case 'Token Type' :
                childData = data.tokenTypes; break;
        }
        return (
            <pre>
                <CustomChildDataTable tableData={childData}
                                      tableColumns={childColumns}
                                      tableTitle={props.subTableTitle}/>
            </pre>)
    };

    // const contextActions = deleteHandler => (
    //     <IconButton color="secondary" onClick={deleteHandler}>
    //         <Delete/>
    //     </IconButton>
    // );

    const handleChange = (rows) => {
        console.log("Rows: ",rows.selectedRows);
    };

    const handleRowClicked = row => {
        console.log(`${row.name} was clicked!`);
    };

    return (
        <div className="container table-container">
            <DataTable
                columns={props.tableColumns}
                data={props.tableData}
                selectableRows={selectableRows}
                highlightOnHover
                defaultSortField="name"
                sortIcon={sortIcon}
                selectableRowsComponent={Checkbox}
                selectableRowsComponentProps={selectProps}
                onSelectedRowsChange={handleChange}
                clearSelectedRows={toggleCleared}
                onRowClicked={handleRowClicked}
                pagination
                expandableRows={expandableRows}
                expandableRowsComponent={ExpandedComponent}
                pointerOnHover
            />
        </div>
    );
};

export default CustomDataTable;
