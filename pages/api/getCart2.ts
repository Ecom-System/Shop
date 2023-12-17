import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
        const email = req.query.email;
        const type = req.query.type;
		const user = await new Promise((resolve, reject) => {
			db.query('SELECT * FROM e_commerce.cart WHERE email = ? AND `type` = ? AND `status` = ?', [email, type, 1], (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
		// Successful login
		res.status(200).json({success: true, value: (user as any).length , message: 'Cart fetching successful'});

	} catch (err) {
		console.error('Error during fetching cart: ', err);
		res.status(200).json({success: false, message: 'Error during fetching cart' });
	}
}
