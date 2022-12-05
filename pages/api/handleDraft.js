// this function is currently handling a fetch from "draft.js" located in "pages"

const handler = async (req, res) => {
    // shopify store credentials
    const APP_ADMIN_TOKEN = process.env.APP_ADMIN_TOKEN;
    const SHOP = process.env.SHOP;

    try {

            // shopify call end point and fetch options
        const options = {
            method: req.method,
            headers: {
                'X-Shopify-Access-Token': APP_ADMIN_TOKEN,
                'content-type': 'application/json',
            },
            body: JSON.stringify(req.body)
        }

        const url = `https://${SHOP}.myshopify.com/admin/draft_orders.json`;

                // make shopify call
        const response = await fetch(url, options);

        // throw error if there are any response errors
        if (!response.ok) {
            throw Error('Could not create order!');
        }

                // get store data when no response errors
        const data = await response.json();

        return res.end(JSON.stringify({ success: data }));

    } catch (err) {
        return res.end(JSON.stringify({ error: err.message }));
    }
}

export default handler;
