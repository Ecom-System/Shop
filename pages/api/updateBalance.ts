import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const account = req.body.account
    const amount  = req.body.tot;
    console.log(amount);
    await new Promise((resolve, reject) => {
      db.query('UPDATE e_commerce.users SET balance = balance - ? WHERE account = ?', [amount, account], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    await new Promise((resolve, reject) => {
        db.query('UPDATE e_commerce.users SET balance = balance + ? WHERE account = ?', [amount, 9876543], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

    res.status(200).json({ success: true, message: 'Balance updated successfully' });
  } catch (err) {
    console.error('Error during balance update: ', err);
    res.status(200).json({ success: false, message: 'Error during balance update' });
  }
}
