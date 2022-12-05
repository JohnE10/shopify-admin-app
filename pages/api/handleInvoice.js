// this function is currently handling a fetch from "draft.js" located in "pages"

const handler = async (req, res) => {
    // shopify store credentials
    const APP_ADMIN_TOKEN = process.env.APP_ADMIN_TOKEN;
    const SHOP = process.env.SHOP;

    // frontend request parameters
    let customerID = req.body.customerID;
    let draftOrderID = req.body.orderID;

    try {

        // check if draft order already has customer email
        const draftEndpoint = `${draftOrderID}.json`;
        const draftUrl = `https://${SHOP}.myshopify.com/admin/draft_orders/${draftEndpoint}`;

        // shopify call end point and fetch options
        const draftOptions = {
            method: 'GET',
            headers: {
                'X-Shopify-Access-Token': APP_ADMIN_TOKEN,
                'content-type': 'application/json',
            }
        }

        // make shopify call for draft order info
        const draftRes = await fetch(draftUrl, draftOptions);

        // get drat order data
        const draftData = await draftRes.json();

        // check for errors
        if (draftData) {
            if (draftData.draft_order) {
                if (draftData.draft_order.status) {
                    if (draftData.draft_order.status == 'completed') {
                        const dateCompleted = draftData.draft_order.completed_at.split('T')[0];
                        throw Error(`This order was completed on ${dateCompleted}.`);
                    } else if (draftData.draft_order.status == 'invoice_sent') {
                        const dateSent = draftData.draft_order.invoice_sent_at.split('T')[0];
                        throw Error(`An invoice for this order was sent on ${dateSent}.`);
                    }
                }
            }
        }

        // get customer email
        const custEndPoint = `${customerID}.json`;
        const custUrl = `https://${SHOP}.myshopify.com/admin/customers/${custEndPoint}`;

        const custOptions = {
            method: 'GET',
            headers: {
                'X-Shopify-Access-Token': APP_ADMIN_TOKEN,
                'content-type': 'application/json',
            }
        }

        // make shopify call for customer info
        const custRes = await fetch(custUrl, custOptions);
        const custData = await custRes.json();

        // check if email doesn't exist
        if (custData) {
            if (custData.customer) {
                if (!custData.customer.email) {
                    throw Error('Customer email not found!');
                } else {
                    console.log('custEmail:', custData.customer.email);
                }
            } else {
                throw Error('Customer data not found!');
            }
        } else {
            throw Error('Customer not found!');
        }

        // if no errors, get customer email
        const custEmail = custData.customer.email;

        // draft order fetch options based on whether draft order has a customer's info attached to it or not
        let postBody = {};

        if (draftData) {
            if (draftData.draft_order) {
                if (draftData.draft_order.email) {
                    postBody = {
                        "draft_order_invoice": {}
                    };
                } else {
                    postBody = {
                        "draft_order_invoice": {
                            "to": custEmail,
                            "from": "jemerson10258@gmail.com",
                            "bcc": ["jemerson10258@gmail.com"],
                            "subject": "Order Invoice",
                            "custom_message": "Thank you for your order!"
                        }
                    };
                }

            }
        }

        // final fetch options
        const options = {
            method: 'POST',
            headers: {
                'X-Shopify-Access-Token': APP_ADMIN_TOKEN,
                'content-type': 'application/json',
            },
            body: JSON.stringify(postBody)
        }

        const url = `https://productze.myshopify.com/admin/draft_orders/${draftOrderID}/send_invoice.json`;

        const response = await fetch(url, options);

        // check if response errors
        if (!response.ok) {
            throw Error('Could not fetch data!');
        }

        // get fetch data if no errors
        const data = await response.json();

        return res.end(JSON.stringify({ success: data }));

    } catch (err) {
        console.log('err message is: ', err.message)
        return res.end(JSON.stringify({ error: err.message }));

    }
}

export default handler;
