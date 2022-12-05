import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Temp = async () => {

  const APP_ADMIN_TOKEN = process.env.APP_ADMIN_TOKEN;
  const SHOP = process.env.SHOP;

  // check if draft already has customer email
  const draftEndpoint = `${draftOrderID}.json`;
  const draftUrl = `https://${SHOP}.myshopify.com/admin/draft_orders/${custEndPoint}`;

  // customer fetch
  const custEndPoint = `${customerID}.json`;
  const custUrl = `https://${SHOP}.myshopify.com/admin/customers/${custEndPoint}`;

  const draftOptions = {
    method: 'GET',
    headers: {
      'X-Shopify-Access-Token': APP_ADMIN_TOKEN,
      'content-type': 'application/json',
    }
  }

  const draftRes = await fetch(custUrl, draftOptions);
  const draftData = await draftRes.json();

  console.log('draftData is: ', draftData);

  return (
    <div>
      nothing for now
    </div>
  );
}

export default Temp;