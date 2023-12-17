import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, product } = req.body;

    // Query the order table with the given email and status = 0
    const existingOrder = await new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM `order_table` WHERE user_email = ? AND status = 0',
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

    if ((existingOrder as any).length > 0) {
      const order = (existingOrder as any)[0];

      const cnt1 = order.cnt_p1;
      const cnt2 = order.cnt_p2;
      const cnt3 = order.cnt_p3;

      // Delete the existing order
      await new Promise((resolve, reject) => {
        db.query(
          'DELETE FROM `order_table` WHERE user_email = ? AND status = 0',
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

      let c1 = cnt1;
      let c2 = cnt2;
      let c3 = cnt3;

      if(product == 1) c1--;
      if(product == 2) c2--;
      if(product == 3) c3--;

      if(c1 < 0) c1 = 0;
      if(c2 < 0) c2 = 0;
      if(c3 < 0) c3 = 0;
      
      // Insert the new order with updated counts
      await new Promise((resolve, reject) => {
        db.query(
          'INSERT INTO `order_table` (user_email, cnt_p1, cnt_p2, cnt_p3, total, status) VALUES (?, ?, ?, ?, ?, ?)',
          [email, c1, c2, c3, 0, 0],
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });

       // Return a success response
      res.status(200).json({ success: true, message: 'Item removed from cart successfully' });
    } else res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (err) {
    console.error('Error adding item to the cart: ', err);
    res.status(500).json({ message: 'Error adding item to cart' });
  }
}
