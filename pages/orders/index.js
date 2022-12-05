import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import OrdersTable from '../../components/OrdersTable';

export const getStaticProps = async () => {

  // shopify store credentials
  const APP_ADMIN_TOKEN = process.env.APP_ADMIN_TOKEN;
  const SHOP = process.env.SHOP;

  // shopify call end point and fetch options
  const endPoint = 'orders.json';
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
    props: { orders: data.orders },
  }
}

const Orders = ({ orders }) => {

  // results error 
  const [error, setError] = useState(null);

  // array to help construct full address to show in results
  let addresses = [];

  useEffect(() => {
    try {

      // construct full address
      orders.map(order => {

        let addressFull = '';
        let streetAddress = '';
        let city = '';
        let state = '';
        let fName = '';
        let lName = '';

        if (order.billing_address.address1 != null) {
          streetAddress = order.billing_address.address1;
        }

        if (order.billing_address.city != null) {
          city = order.billing_address.city;
        }

        if (order.billing_address.province_code != null) {
          state = order.billing_address.province_code;
        }

        addressFull = [streetAddress, city, state];
        addressFull = addressFull.filter(Boolean).join(', ');

        if (order.billing_address.first_name != null) {
          fName = order.billing_address.first_name;
        }

        if (order.billing_address.last_name != null) {
          lName = order.billing_address.last_name;
        }

        order['address'] = addressFull;
        order['first_name'] = fName;
        order['last_name'] = lName;

      })

    } catch (err) {
      setError(err.message);
    }

  }, []);

  return (
    <div className='container text-start'>
      <h5 className='my-4'>Orders:</h5>
      {/* show errors if any */}
      {error && <h3 className='text-danger text-center'> Error: {error} </h3>}
      {/* customers count */}
      {orders && !error && <div className='mb-3'><span>Count: </span>{orders.length}</div>}
      {/* orders table */}
      {orders && !error && <OrdersTable orders={orders} />}
    </div>
  )
}

export default Orders;