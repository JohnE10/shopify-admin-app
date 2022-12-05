import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AbandonedTable from '../../components/AbandonedTable';

export const getStaticProps = async () => {

    // shopify store credentials
    const APP_ADMIN_TOKEN = process.env.APP_ADMIN_TOKEN;
    const SHOP = process.env.SHOP;

    // shopify call end point and fetch options
    const endPoint = 'checkouts.json';
    const url = `https://${SHOP}.myshopify.com/admin/${endPoint}`;

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
        props: { abandoned: data.checkouts },
    }
}

const Abandoned = ({ abandoned }) => {

    // results error 
    const [error, setError] = useState(null);

    // array to help construct full address to show in results
    let addresses = [];

    useEffect(() => {

        try {
            // construct full address, add first name and last to "abandoned checkouts" object
            abandoned.map(abd => {

                let addressFull = '';
                let streetAddress = '';
                let city = '';
                let state = '';
                let fName = '';
                let lName = '';

                if (abd.shipping_address.address1 != null) {
                    streetAddress = abd.shipping_address.address1;
                }

                if (abd.shipping_address.city != null) {
                    city = abd.shipping_address.city;
                }

                if (abd.shipping_address.province_code != null) {
                    state = abd.shipping_address.province_code;
                }

                addressFull = [streetAddress, city, state];
                addressFull = addressFull.filter(Boolean).join(', ');

                if (abd.shipping_address.first_name != null) {
                    fName = abd.shipping_address.first_name;
                }

                if (abd.shipping_address.last_name != null) {
                    lName = abd.shipping_address.last_name;
                }

                abd['address'] = addressFull;
                abd['first_name'] = fName;
                abd['last_name'] = lName;

            })

        } catch (err) {
            setError(err.message);
        }

    }, []);

    return (
        <>
            <div className='container text-start'>
                <h5 className='my-4'>Abandoned Checkouts:</h5>
                {/* show errors if any */}
                {error && <h3 className='text-danger text-center'> Error: {error} </h3>}
                {/* customers count */}
                {abandoned && !error && <div className='mb-3'><span>Count: </span>{abandoned.length}</div>}
                        {/* abandonned checkouts table */}
                {abandoned && !error && <AbandonedTable abandoned={abandoned} />}
            </div>
        </>
    )
}

export default Abandoned;
