import { useEffect, useState } from 'react';
import DraftOrdersTable from '../../components/DraftOrdersTable';

export const getStaticProps = async () => {

    // shopify store credentials
    const APP_ADMIN_TOKEN = process.env.APP_ADMIN_TOKEN;
    const SHOP = process.env.SHOP;

    // shopify call end point and fetch options
    const endPoint = 'draft_orders.json';
    const url = `https://${SHOP}.myshopify.com/admin/${endPoint}?limit=250`;

    const method = 'GET';

    const options = {
        method: method,
        headers: {
            'X-Shopify-Access-Token': APP_ADMIN_TOKEN,
            'content-type': 'application/json',
        }
    }

    // make shopify call
    const res = await fetch(url, options);

    // get store data
    const data = await res.json();

    return {
        props: { orders: data.draft_orders },
    }
}

const DraftList = ({ orders }) => {

    // results error 
    const [error, setError] = useState(null);

    useEffect(() => {
        try {

            // prepare data for draft order list table
            orders.map(order => {

                let customerID = '';
                let title = '';
                let qty = '';

                if (order.customer != null) {
                    if (order.customer.id != null) {
                        customerID = order.customer.id;
                    }
                }

                if (order.line_items != null) {
                    if (order.line_items[0].title != null) {
                        title = order.line_items[0].title;
                    }
                }

                if (order.line_items != null) {
                    if (order.line_items[0].quantity != null) {
                        qty = order.line_items[0].quantity;
                    }
                }

                order['customerID'] = customerID;
                order['title'] = title;
                order['qty'] = qty;

            })

        } catch (err) {
            setError(err.message);
        }
    }, []);

    return (
        <>
            <div className='container text-start'>
                <h5 className='my-4'>Draft Orders List:</h5>
                {/* show errors if any */}
                {error && <h3 className='text-danger text-center'> Error: {error} </h3>}
                {/* customers count */}
                {orders && !error && <div className='mb-3'><span>Count: </span>{orders.length}</div>}
                {/* draft orders table */}
                {orders && !error && <DraftOrdersTable orders={orders} />}
            </div>
        </>
    )
}

export default DraftList;