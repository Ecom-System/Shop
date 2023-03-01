// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { newFunc } from 'src/helpers/someName';

import { exec, ExecException } from 'child_process';

export type Data = {
	name1: string;
	name2: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req

	switch (method) {
		case "GET": {

		}
		case "POST": {
			try {

				const { name1, name2 } = req.body as Data
				const ans = newFunc({ name1, name2 })
				//database save
				//const response= await 
				//cpnsole

				//dummy: just testing... c++


				// Accept input data from the front-end
				let num1 = 5;
				let num2 = 10;

				// Call the C++ program with the input arguments
				exec(`F:\\350\\IR\\pages\\api\\my_cpp_program.exe ${num1} ${num2}`, (error, stdout, stderr) => {
					if (error) {
						console.error(`exec error: ${error}`);
						return;
					}
					console.log(`stdout: ${stdout}`);
					console.error(`stderr: ${stderr}`);
				});


				return res.status(201).json({
					answer: ans
				})
			} catch (err) {
				return res.status(500).json({
					err
				})
			}


		}
		default:
			res.status(400).json({})
	}
}
