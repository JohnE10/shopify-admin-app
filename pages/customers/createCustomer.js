import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateCustomer = () => {

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
    setData('');
    setError('');
    setLoading(true);

    // fetch method
    const method = 'POST';

    // draft order POST data
    let postBody = {
      "customer": {
        "first_name": d.fName,
        "last_name": d.lName,
        "email": d.email,
        "phone": d.phone,
        "verified_email": true,
        "addresses": [{
          "address1": d.streetAddress,
          "city": d.city,
          "province": d.state,
          "phone": d.phone,
          "zip": d.zip,
          "last_name": d.lName,
          "first_name": d.fName,
          "country": d.country
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
    const res = await fetch('/api/handleCustomer', options);
    const final = await res.json();

    // array to store errors
    let errorArr = [];

    // parse response from backend
    if (final.error) {  // if response from shopify is not OK show error
      setError(final.error);
      setLoading(false);

    } else if (final.dataErrors) { // if response from shopify is ok but contains errors show errors

      Object.keys(final.dataErrors.errors).map((t) => {
        if (!final.dataErrors.errors[t][0].toLowerCase().includes(t.toLowerCase())) { // avoid word repetition
          let message = t + ' ' + final.dataErrors.errors[t][0]
          message = message.charAt(0).toUpperCase() + message.slice(1); // capitalize first letter of string
          errorArr.push(message); // populate error array
        } else {
          errorArr.push(final.dataErrors.errors[t][0]); // populate error array
        }
      });

      // turn error array to string
      setError(errorArr.join('. ') + '.');
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
        {data && !loading && !error && <h5 className='mt-5 text-success text-center'>Success. Your customer has been created.</h5>}
        {/* initial page */}
        {!data && !error && !loading && <h5 className='my-4'>Create customer: </h5>}
        {/* option to create another customer after successful creation of previous customer */}
        {data && !error && !loading && <h5 className='my-4'>Create another: </h5>}
        {/* option to create another customer after successful creation of previous customer */}
        {error && !loading && <h5 className='mb-2 mt-4'>Try again: </h5>}
        {!loading && <div className='container'>
          {/* initial form */}
          <form onSubmit={handleSubmit(getData)}>

            <div className='row my-2'>
              <div className='col-sm-6 col-lg-3 my-1'>
                <label className='form-ckeck-label me-2'>First Name:</label>
                <input className='border border-2 border-light rounded-3'
                  type="text"
                  name="fName"
                  placeholder='i.e. John'
                  {...register('fName', {
                    required: 'First name is required',
                  })}
                />
                {errors.fName && <div className='formError text-danger mb-3'>{errors.fName.message}</div>}
              </div>
              <div className='col-sm-6 col-lg-3 my-1'>
                <label className='form-ckeck-label me-2'>Last Name:</label>
                <input className='border border-2 border-light rounded-3'
                  type="text"
                  name="lName"
                  placeholder='i.e. Smith'
                  {...register('lName', {
                    required: 'Last name is required',
                  })}
                />
                {errors.lName && <div className='formError text-danger mb-3'>{errors.lName.message}</div>}
              </div>
              <div className='col-sm-6 col-lg-3 my-1'>
                <label className='form-ckeck-label me-2'>Email:</label>
                <input className='border border-2 border-light rounded-3'
                  type="text"
                  name="email"
                  placeholder='i.e. example@email.com'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, message: 'Please enter a valid email.' }
                  })}
                />
                {errors.email && <div className='formError text-danger mb-3'>{errors.email.message}</div>}
              </div>
              <div className='col-sm-6 col-lg-3 my-1'>
                <label className='form-ckeck-label me-2'>Phone:</label>
                <input className='border border-2 border-light rounded-3'
                  type="text"
                  name="phone"
                  placeholder='i.e. 212-555-1212'
                  {...register('phone')}
                />
              </div>
            </div>

            <div className='row my-2'>
              <div className='col-sm-6 col-lg-3 my-1'>
                <label className='form-ckeck-label me-2'>Address:</label>
                <input className='border border-2 border-light rounded-3'
                  type="text"
                  name="streetAddress"
                  placeholder='i.e. 123 Main St'
                  {...register('streetAddress')}
                />

              </div>
              <div className='col-sm-6 col-lg-3 my-1'>
                <label className='form-ckeck-label me-2'>City:</label>
                <input className='border border-2 border-light rounded-3'
                  type="text"
                  name="city"
                  placeholder='i.e. New York'
                  {...register('city')}
                />
              </div>
              <div className='col-sm-6 col-lg-3 my-1'>
                <label className='form-ckeck-label me-2'>State:</label>
                <input className='border border-2 border-light rounded-3'
                  type="text"
                  name="state"
                  placeholder='i.e. NY'
                  {...register('state')}
                />
              </div>
              <div className='col-sm-6 col-lg-3 my-1'>
                <label className='form-ckeck-label me-2'>Country:</label>
                <input className='border border-2 border-light rounded-3'
                  type="text"
                  name="country"
                  placeholder='i.e. USA'
                  {...register('country')}
                />
              </div>

            </div>

            <div className='row my-2'>
              <div className='col-sm-3 col-lg-3 my-1'>
                <label className='form-ckeck-label me-2'>Zip:</label>
                <input className='border border-2 border-light rounded-3'
                  type="text"
                  name="zip"
                  placeholder='i.e. 11111'
                  {...register('zip')}
                />
              </div>
            </div>

            <button className='ms-3 mt-3 bg-success text-white border-0 rounded-3'>Create</button>
            {errors.variantID && <div className={`${styles.formError} text-danger mb-3`}>{errors.variantID.message}</div>}

          </form>
        </div>}
      </div>
    </div>
  );
}

export default CreateCustomer;