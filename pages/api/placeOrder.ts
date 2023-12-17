import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
        const email = req.body.email;
        console.log(email + "sadt")
		const user = await new Promise((resolve, reject) => {
			db.query('UPDATE e_commerce.cart SET `status` = ? WHERE email = ? AND `status` = ? AND `id` > ?', [1, email, 0, 0], (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});

		// Successful buying
		res.status(200).json({success: true , message: 'Buying successful'});

	} catch (err) {
		console.error('Error during fetching cart: ', err);
		res.status(200).json({success: false, message: 'Error during fetching cart' });
	}
}
