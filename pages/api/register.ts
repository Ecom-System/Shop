import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password, repeatPassword, accountNumber, key } = req.body;
    console.log(accountNumber)

    // Validate email, password, secret key, and their repeats
    if (!email || !password || !repeatPassword || !key || !accountNumber) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    if (password !== repeatPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
      return;
    }

    // Check if the email is already registered
    const existingUser = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM e_commerce.ecommerce_users WHERE email = ?', [email], (err, results) => {
        if (err) {
          reject(err);
          
        } else {
          resolve(results);
          
        }
      });
    });

    
    if ((existingUser as any).length > 0) {
      res.status(200).json({ success: false, message: 'Email is already registered' });
      return;
    }


    const existingAccount = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM e_commerce.users WHERE `account` = ? AND `secret_key` = ?', [parseInt(accountNumber), key], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    console.log("preityyy   "+(existingAccount as any).length );

    if ((existingAccount as any).length < 1) {
      console.log("preityyy   "+(existingAccount as any).length );
      res.status(200).json({ success: false, message: 'Check your bank account information again!' });
      return;
    }



    // Insert the new user into the database
    await new Promise((resolve, reject) => {
      db.query('INSERT INTO e_commerce.ecommerce_users (email, `password`, `account`, `secret_key`) VALUES (?, ?, ?, ?)', [email, password, accountNumber, key], (err) => {
        if (err) {
          reject(err);
        } else {
            res.status(200).json({ success: true, message: 'Registration successful' });
        }
      });
    });


  } catch (err) {
    console.error('Error during registration: ', err);
    res.status(200).json({ success: false, message: 'Error during registration' });
  }
}
