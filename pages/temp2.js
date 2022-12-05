import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Temp2 = () => {

  const APP_ADMIN_TOKEN = process.env.APP_ADMIN_TOKEN;
  const SHOP = process.env.SHOP;

  const [data, setData] = useState('');
  const [variantID, setVariantID] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSent(true);
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

    const options = {
      method: method,
      headers: {
        'X-Shopify-Access-Token': APP_ADMIN_TOKEN,
        'content-type': 'application/json',
      },
      body: JSON.stringify(postBody)
    }

    // this fetch needs to run on the backend (via its own API Route (handleDraft)); otherwise CORS is triggered 
    const res = await fetch('/api/handleDraft', options);
    // const res = await fetch(url);

    const final = await res.json();
    // setData(await res.json());

    setData(final);

  }

  useEffect(() => {
    console.log('data is: ', data);
    setLoading(false);
  }, [data]);

  return (
    <div>
      <div className='container text-start'>
        { loading && <div className='text-center mt-5'>...Loading</div>}
        {!data && !loading && <h5 className='my-4'>Create Draft Order: </h5>}
        {data && !loading && <h5 className='mt-4'>Success. Your draft order has been created.</h5>}
        {data && <div className='mt-4'><span className='fw-bold'>Order ID:</span> {data.draft_order.id}</div>}
        {/* {draftOrder && <div>Draft Order ID: {draftOrder.id}</div>} */}
        {!sent && <div>
          <form onSubmit={getData}>
            <label className='me-3'>Enter Order ID (numbers only):</label>
            <input type="text"
              required
              value={variantID}
              onChange={(e) => setVariantID(e.target.value)}
            />
            <button className='ms-3 bg-success text-white border-0 rounded-3'>Create</button>
          </form>
        </div>}
      </div>
    </div>
  );
}

export default Temp2;