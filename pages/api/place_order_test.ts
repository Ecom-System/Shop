// pages/api/place-order.ts

import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { cnt_p1, cnt_p2, cnt_p3, total, user_email } = req.body;

    // Find the order with status 0 and user_email
    const orderToUpdate = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM order_table WHERE user_email = ? AND status = 0', [user_email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve((results as any)[0]);
        }
      });
    });

    if (!orderToUpdate) {
        console.log('No product in cart for: ' + user_email);
      return res.status(200).json({ success: false, message: 'No product found in the cart' });
    }

    // Update the order with the provided details
    await new Promise((resolve, reject) => {
      db.query(
        'UPDATE order_table SET `status` = 1, cnt_p1 = ?, cnt_p2 = ?, cnt_p3 = ?, total = ? WHERE id = ?',
        [cnt_p1, cnt_p2, cnt_p3, total, (orderToUpdate as any).id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    res.status(200).json({ success: true, message: 'Order placed successfully' });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ success: false, message: 'Error placing order' });
  }
}