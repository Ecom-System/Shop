// pages/api/get-user-orders.ts

// status : 0 --> cart
// status : 1 --> pending order
// status : 2 --> cancelled / rejected
// status : 3 --> supplied

import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email } = req.query;

    // Perform the database query to fetch all orders of the user
    const results = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM `order_table` WHERE user_email = ? AND status != 0', [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    res.status(200).json({ success: true, orders: results });
  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(500).json({ success: false, message: 'Error fetching user orders' });
  }
}
