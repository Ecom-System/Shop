import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

interface Cart {
  cnt_p1: number;
  cnt_p2: number;
  cnt_p3: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.body;
   
    const order = await new Promise((resolve, reject) => {
      db.query(
        'SELECT cnt_p1, cnt_p2, cnt_p3 FROM `order_table` WHERE user_email = ? AND status = 0',
        [email],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (order && (order as Cart[]).length > 0) {
     
      const { cnt_p1, cnt_p2, cnt_p3 } = (order as Cart[])[0] as Cart;
      res.status(200).json({ cnt_p1, cnt_p2, cnt_p3 });

    } else {
      // No cart found for the given email
      res.status(200).json({ cnt_p1: 0, cnt_p2: 0, cnt_p3: 0 });
    }
  } catch (err) {
    console.error('Error retrieving cart counts: ', err);
    res.status(500).json({ message: 'Error retrieving cart counts' });
  }
}
