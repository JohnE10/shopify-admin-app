import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const SendInvoice = () => {

  // shopify store credentials
  const APP_ADMIN_TOKEN = process.env.APP_ADMIN_TOKEN;
  const SHOP = process.env.SHOP;

  // initial states
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // onclick function
  const getData = async (d, e) => {
    e.preventDefault();
    const orderID = d.orderID;
    const customerID = d.customerID;
    setData('');
    setError('');
    setLoading(true);

    // fetch method
    const method = 'POST';

    // draft order input data
    let postBody = {
      "orderID": orderID,
      "customerID": customerID,
    };

    // fetch options
    const options = {
      method: method,
      headers: {
        'X-Shopify-Access-Token': APP_ADMIN_TOKEN,
        'content-type': 'application/json',
      },
      body: JSON.stringify(postBody)
    }

    // the purpose of this fetch is so that the actual fetch is run on the backend (via its own API Route (handleDraft)); otherwise CORS is triggered if fetch is run on the frontend
    const res = await fetch('/api/handleInvoice', options);

    // get data back from the backend
    const final = await res.json();

    if (final.error) { // if response from shopify is not OK show error
      setError(final.error);
      setLoading(false);
    } else { // if no errors, get data
      setData(final.success);
      setLoading(false);
    }
    // reset the form
    reset({});
  }

  console.log('error is: ', error);

  return (
    <div>
      <div className='container text-start'>
        {/* page loading indicator */}
        {loading && <div className='text-center mt-5'>...Loading</div>}
        {/* show errors if any */}
        {error && !loading && <h4 className='text-danger text-center mt-5'>Error: {error}</h4>}
        {/* show success message if no errors */}
        {data && !loading && !error && <h5 className='mt-5 text-success text-center'>Success. Your invoice has been sent.</h5>}
        {!data && !error && !loading && <h5 className='my-4'>Send Invoice: </h5>}
        {/* option to create another customer after successful creation of previous customer */}
        {data && !error && !loading && <h5 className='my-4'>Send another: </h5>}
        {/* option to create another customer after successful creation of previous customer */}
        {error && !loading && <h5 className='mb-2 mt-4'>Try again: </h5>}
        {/* initial form */}
        {!loading && <div>
          <form onSubmit={handleSubmit(getData)}>
            <div className='my-2'>
              <label className='form-ckeck-label me-3'>Enter Draft Order ID:</label>
              <input className='border border-2 border-light rounded-3'
                type="text"
                name="orderID"
                placeholder='i.e. 12345678901234'
                {...register('orderID', {
                  required: 'Order ID is required',
                  pattern: { value: /^[0-9]*$/, message: 'Please enter numbers only.' }
                })}
              />
              {errors.orderID && <div className='formError text-danger mb-3'>{errors.orderID.message}</div>}
            </div>

            <div className='my-2'>
              <label className='form-ckeck-label me-3'>Enter Customer ID:</label>
              <input className='border border-2 border-light rounded-3'
                type="text"
                name="customerID"
                placeholder='i.e. 12345678901234'
                {...register('customerID', {
                  required: 'Customer ID is required',
                  pattern: { value: /^[0-9]*$/, message: 'Please enter numbers only.' }
                })}
              />
              {errors.customerID && <div className='formError text-danger mb-3'>{errors.customerID.message}</div>}
            </div>
            <div className='my-3'>
              <button className='ms-3 bg-success text-white border-0 rounded-3'>Create</button>
            </div>

          </form>
        </div>}
      </div>
    </div>
  );
}

export default SendInvoice;