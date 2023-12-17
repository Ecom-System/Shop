// import the necessary dependencies and modules
import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

interface User {
    email: string;
    password: string;
    account: number;
    key: string;
  }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.body;
    // console.log("Get: " + email);
    // console.log("Get: " + password);

    // Perform the database query to fetch the user data
    const results: User[] = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM ecommerce_users WHERE email = ?', [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results as User[]);
        }
      });
    });
    
    if ( (results).length === 0) {
      // User with the provided email does not exist
      console.log(results.length);
      res.status(200).json({ success: false, message: "An internal error occured" });
      return;
    }
    // console.log(results);
    const user = results[0];
    if(user.account == null){
      res.status(200).json({ success: false, message: "account not added" });
      return;
    }
    res.status(200).json({ success: true, message: user.account })
  } catch (err) {
    console.error('Error in login:', err);
    res.status(200).json({ success: false, message: 'An internal error occured' });
  }
}