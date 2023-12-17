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

      // Insert the new order with updated counts
      await new Promise((resolve, reject) => {
        db.query(
          'INSERT INTO `order_table` (user_email, cnt_p1, cnt_p2, cnt_p3, total, status) VALUES (?, ?, ?, ?, ?, ?)',
          [email, cnt1 + (product == 1 ? 1 : 0), cnt2 + (product == 2 ? 1 : 0), cnt3 + (product == 3 ? 1 : 0), 0, 0],
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });
    } else {
      // Insert a new order with the updated count of the selected product
      await new Promise((resolve, reject) => {
        db.query(
          'INSERT INTO `order_table` (user_email, cnt_p1, cnt_p2, cnt_p3, total, status) VALUES (?, ?, ?, ?, ?, ?)',
          [email, (product == 1 ? 1 : 0), (product == 2 ? 1 : 0), (product == 3 ? 1 : 0), 0, 0],
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });
    }

    // Return a success response
    res.status(200).json({success:true, message: 'Item added to cart successfully' });
  } catch (err) {
    console.error('Error adding item to the cart: ', err);
    res.status(500).json({ message: 'Error adding item to cart' });
  }
}
