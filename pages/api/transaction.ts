import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const accountNumber = req.query.account;

    const transactions = await new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM e_commerce.transactions WHERE `from` = ? OR `to` = ?',
        [accountNumber, accountNumber],
        (err, transactions) => {
          if (err) {
            reject(err);
          } else {
            console.log(transactions);
            resolve(transactions);
          }
        }
      );
    });

    res.status(200).json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
}
