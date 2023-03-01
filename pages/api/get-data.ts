import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const results = await new Promise((resolve, reject) => {
			db.query('SELECT * FROM IRtable', (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
		res.status(200).json(results);
	} catch (err) {
		console.error('Error fetching data from IRtable: ', err);
		res.status(500).json({ message: 'Error getting data' });
	}
}
