import CustomersTable from '../../components/CustomersTable';
import { useEffect, useState } from 'react';

export const getStaticProps = async () => {

  // shopify store credentials
  const APP_ADMIN_TOKEN = process.env.APP_ADMIN_TOKEN;
  const SHOP = process.env.SHOP;

  // shopify call end point and fetch options
  const endPoint = 'customers.json';
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
    props: { customers: data.customers },
  }
}

const Customers = ({ customers }) => {

  // results error 
  const [error, setError] = useState(null);

  useEffect(() => {
    try {

      // array to help construct full address to show in results
      let addresses = [];

      // construct full address
      customers.map(customer => {

        let addressFull = '';
        let streetAddress = '';
        let city = '';
        let state = '';

        if (customer.default_address.address1 != null) {
          streetAddress = customer.default_address.address1;
        }

        if (customer.default_address.city != null) {
          city = customer.default_address.city;
        }

        if (customer.default_address.province_code != null) {
          state = customer.default_address.province_code;
        }

        addressFull = [streetAddress, city, state];
        addressFull = addressFull.filter(Boolean).join(', ');
        customer['address'] = addressFull;

      })

    } catch (err) {
      setError(err.message);
    }
  }, []);

  return (
    <>
      <div className='container text-start'>
        <h5 className='my-4'>Customers:</h5>
        {/* show errors if any */}
        {error && <h3 className='text-danger text-center'> Error: {error} </h3>}
        {/* customers count */}
        {customers && !error && <div className='mb-3'><span>Count: </span>{customers.length}</div>}
        {/* customers table */}
        {customers && !error && <CustomersTable customers={customers} />}
      </div>
    </>
  )
}

export default Customers;