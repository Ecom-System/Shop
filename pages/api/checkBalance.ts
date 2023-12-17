import { request } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
        // console.log(req.body);
		const account = req.body.account;
        const tot = req.body.tot;
        // console.log(account)
        // console.log("bruh " + tot);
		const user = await new Promise((resolve, reject) => {
			db.query('SELECT * FROM e_commerce.users WHERE `account` = ?', [account], (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
        console.log(user);
        console.log(tot)

		if ((user as any)[0].balance < tot) {
			res.status(200).json({success: false, message: 'You do not have enough balance' });
			return;
		}

        res.status(200).json({success: true, avail: (user as any)[0].balance, message: 'You have enough balance' });

	} catch (err) {
		console.error('Error during login: ', err);
		res.status(200).json({success: false, message: 'Error during fetching balance' });
	}
}
