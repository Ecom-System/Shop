import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { email, password } = req.body;
		const user = await new Promise((resolve, reject) => {
			db.query('SELECT * FROM e_commerce.ecommerce_users WHERE email = ? AND password = ?', [email, password], (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});

		if ((user as any).length === 0) {
			// If no user is found with the provided credentials
			res.status(200).json({success: false, message: 'Invalid credentials' });
			return;
		}

		// Successful login
		res.status(200).json({success: true, message: 'Login successful' , account: (user as any)[0].account, secret_key : (user as any)[0].secret_key});

	} catch (err) {
		console.error('Error during login: ', err);
		res.status(200).json({success: false, message: 'Error during login' });
	}
}
