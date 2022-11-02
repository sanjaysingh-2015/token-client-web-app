import React from "react";
import DataTable from 'react-data-table-component';
import "./custom-child-styles.css"
import Card from '@material-ui/core/Card';

const CustomDataTable = (props) => {
    return (
        <Card style={{height: '100%'}}>
            <div className="container table-container">
                <DataTable
                    title={props.tableTitle}
                    columns={props.tableColumns}
                    data={props.tableData}
                />
            </div>
        </Card>
    );
};

export default CustomDataTable;
