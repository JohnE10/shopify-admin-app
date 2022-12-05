
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";


const DraftOrdersTable = (props) => {

    // instantiate table component object and error variable
    const [orders, setOrders] = useState(props.orders);
    const [tableError, setTableError] = useState(null);

    // define Material UI table columns
    const columns = [

        {
            field: 'id',
            headerName: 'Order ID',
            flex: 0.3,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'customerID',
            headerName: 'Customer ID',
            flex: 0.3,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 0.3,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'title',
            headerName: 'Product',
            flex: 1.0,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'total_price',
            headerName: 'Price',
            flex: 0.3,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'qty',
            headerName: 'Qty',
            flex: 0.3,
            align: 'center',
            headerAlign: 'center'
        },
    ];

    return (
        <div>
            {/* show error if there's a delete item issue */}
            {tableError && <div className='bg-danger text-light mb-3 p-3'>{tableError}</div>}

            {/* show list of items in store */}
            {orders && <DataGrid
                sx={{
                    "& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator": {
                        display: "none"
                    }
                }}
                rows={orders}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                autoHeight
                sortable
            />}
        </div>
    );
}

export default DraftOrdersTable;