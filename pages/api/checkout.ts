// pages/api/checkout.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { bankAPI } from 'src/lib/bankAPI';
import { eCommerceAPI } from 'src/lib/eCommerceAPI';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { cnt_p1, cnt_p2, cnt_p3, acc_no, total_price, secret_key, user_email } = req.body;

    // Call the checkSecretKey API to validate the secret key
    // const secretKeyResponse = await bankAPI.get(`/check-secret-key?accNo=${acc_no}&secretKey=${secret_key}`);
    // if (!secretKeyResponse.data.success) {
    //   return res.status(200).json({ success: false, message: 'Invalid secret key' });
    // }

    // Call the getBalance API to check the account balance
    // const balanceResponse = await bankAPI.get(`/get-balance?accNo=${acc_no}`);
    // const balance = balanceResponse.data.balance;

    // if (balance < total_price) {
    //   return res.status(200).json({ success: false, message: 'Insufficient balance' });
    // }
    
    // Call the placeOrder API to place the order
    const placeOrderResponse = await eCommerceAPI.post('/place_order_test', {
      cnt_p1,
      cnt_p2,
      cnt_p3,
      total: total_price,
      user_email,
    });

    if (!placeOrderResponse.data.success) {
      return res.status(200).json({ success: false, message: placeOrderResponse.data.message });
    }

    //order placed

    //now transfer money to admin
    // const toAccNo = 10000000;
    // console.log("ettuk thik ache");
    // const responseTransfer = await bankAPI.post('/transfer-money', {
    //     fromAccNo:acc_no,
    //     toAccNo:toAccNo,
    //     amount:total_price,
    //   });
    // console.log(responseTransfer.data);
    res.status(200).json({ success: true, message: 'Order placed successfully' });
  } catch (err) {
    console.error('Error during checkout:', err);
    res.status(200).json({ success: false, message: 'Error during checkout' });
  }
}