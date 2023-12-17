import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("amare call diche")
  try {
    const { email, account, type, quantity, price } = req.body;
    console.log(email+account+type+quantity+price);

    // Insert the new item into the cart
    await new Promise((resolve, reject) => {
      db.query('INSERT INTO e_commerce.cart (email, `account`, `type`, `quantity`, `price`) VALUES (?, ?, ?, ?, ?)', [email, account, type, quantity, price ], (err) => {
        if (err) {
            
          reject(err);
        } else {
            
            res.status(200).json({ success: true, message: 'Added to cart' });
        }
      });
    });


  } catch (err) {
    console.error('Error during adding to  cart: ', err);
    res.status(200).json({ success: false, message: 'Error during adding to  cart' });
  }
}
