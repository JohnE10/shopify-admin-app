import Link from "next/link";
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";


const ProductTable = (props) => {

    // instantiate table component object and error variable
    const [orders, setOrders] = useState(props.products);
    const [tableError, setTableError] = useState(null);

    // define Material UI table columns
    const columns = [

        {
            field: 'id',
            headerName: 'ID',
            flex: 0.6,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <div>
                        <Link href={`/products/${params.row.id}`}>{params.row.id}</Link>
                    </div>
                )
            }
        },
        {
            field: 'combinedTitle',
            headerName: 'Title',
            flex: 2,
            align: 'center',
            headerAlign: 'center'
        },
        {
            headerName: 'Price',
            field: 'price',
            flex: 0.5,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'inventory_quantity',
            headerName: 'Quantity',
            flex: 0.5,
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

export default ProductTable;