// pages/api/add-bank-info.js

import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, acc_no, secret_key } = req.body;

    // Update the user's bank info based on email
    await new Promise((resolve, reject) => {
      db.query('UPDATE ecommerce_users SET account = ?, `secret_key` = ? WHERE email = ?', [acc_no, secret_key, email], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    res.status(200).json({ success: true, message: 'Bank info updated successfully' });
  } catch (err) {
    console.error('Error updating bank info:', err);
    res.status(200).json({ success: false, message: 'Error updating bank info' });
  }
}
