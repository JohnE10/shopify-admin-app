import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateDraft = () => {

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
    const variantID = d.variantID;
    setData('');
    setError('');
    setLoading(true);

    // fetch method
    const method = 'POST';

    // draft order input data
    let postBody = {
      "draft_order": {
        "line_items": [{
          "variant_id": variantID,
          "quantity": 1
        }]
      }
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
    const res = await fetch('/api/handleDraft', options);

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

  return (
    <div>
      <div className='container text-start'>
        {/* page loading indicator */}
        {loading && <div className='text-center mt-5'>...Loading</div>}
        {/* show errors if any */}
        {error && !loading && <h4 className='text-danger text-center mt-5'>Error: {error}</h4>}
        {/* show success message if no errors */}
        {data && !loading && !error && <h5 className='mt-5 text-success text-center'>Success. Your draft order has been created.</h5>}
        {/* Order count */}
        {data && !loading && !error && <div className='mt-1 mb-2 text-center'><span className='fw-bold'>Order ID:</span> {data.draft_order.id}</div>}
        {/* initial page */}
        {!data && !error && !loading && <h5 className='my-4'>Create draft order: </h5>}
        {/* option to create another customer after successful creation of previous customer */}
        {data && !error && !loading && <h5 className='my-4'>Create another: </h5>}
        {/* option to create another customer after successful creation of previous customer */}
        {error && !loading && <h5 className='mb-2 mt-4'>Try again: </h5>}
        {/* initial form */}
        {!loading && <div>
          <form onSubmit={handleSubmit(getData)}>

            <label className='form-ckeck-label me-3'>Enter Variant ID:</label>
            <input className='border border-2 border-light rounded-3'
              type="text"
              name="variantID"
              placeholder='i.e. 12345678901234'
              {...register('variantID', {
                required: 'Variant ID is required',
                pattern: { value: /^[0-9]*$/, message: 'Please enter numbers only.' }
              })}
            />

            <button className='ms-3 bg-success text-white border-0 rounded-3'>Create</button>
            {errors.variantID && <div className='formError text-danger mb-3'>{errors.variantID.message}</div>}

          </form>
        </div>}
      </div>
    </div>
  );
}

export default CreateDraft;