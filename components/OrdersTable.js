
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";


const ProductTable = (props) => {

    // instantiate table component object and error variable
    const [orders, setOrders] = useState(props.orders);
    const [tableError, setTableError] = useState(null);

    // define Material UI table columns
    const columns = [

        {
            field: 'id',
            headerName: 'ID',
            flex: 0.6,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'first_name',
            headerName: 'First Name',
            flex: 0.5,
            align: 'center',
            headerAlign: 'center'
        },
        {
            headerName: 'Last Name',
            field: 'last_name',
            flex: 0.5,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 0.8,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'phone',
            headerName: 'Phone',
            flex: 0.5,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'address',
            headerName: 'Address',
            flex: 1.5,
            align: 'left',
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

export default ProductTable;