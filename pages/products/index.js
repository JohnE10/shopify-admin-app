import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductsTable from '../../components/ProductsTable';

export const getStaticProps = async () => {

    // shopify store credentials
    const APP_ADMIN_TOKEN = process.env.APP_ADMIN_TOKEN;
    const SHOP = process.env.SHOP;

    // shopify call end point and fetch options
    const endPoint = 'products.json';
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
        props: { products: data.products },
    }
}

const Products = ({ products }) => {

    const [error, setError] = useState(null);

    // Array of all product variants
    const productsVariants = [];

    try {
        // populate array of all product variants
        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < products[i].variants.length; j++) {

                // If variant title is "Default Title", then make title the main product's title
                if (products[i].variants[j].title == "Default Title") {
                    products[i].variants[j].combinedTitle = products[i].title;
                }
                // Make variant titles combine "product title" and "variant title"
                if (products[i].variants[j].title != "Default Title" && products[i].variants[j].title != products[i].title && products[i].variants[j].product_id == products[i].id) {
                    products[i].variants[j].combinedTitle = products[i].title + ' - ' + products[i].variants[j].title;
                }

                productsVariants.push(products[i].variants[j]);
            }
        }
    } catch (err) {
        useEffect(() => {
            setError(err.message);
        }, []);
        
    }

    return (
        <div className='container text-start'>
            <h5 className='my-4'>Products:</h5>
            {/* show errors if any */}
            {error && <h3 className='text-danger text-center'> Error: {error} </h3>}
            {/* product count */}
            {products && !error && <div className='mb-3'><span>Count: </span>{productsVariants.length}</div>}
            {/* products table */}
            {products && !error && <ProductsTable products={productsVariants} />}
        </div>
    )
}

export default Products;