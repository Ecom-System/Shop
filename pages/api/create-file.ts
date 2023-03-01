import { NextApiRequest, NextApiResponse } from 'next';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app, storage } from 'src/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { name, content } = req.body;
			//const storageRef = ref(getStorage(app), name);
			const storageRef = ref(storage, `files/${name}`);
			const fileData = new Blob([content], { type: 'text/plain' });

			await uploadBytes(storageRef, fileData);
			const downloadURL = await getDownloadURL(storageRef);

			res.status(200).json({ downloadURL });
		} catch (error: any) {
			console.error(error);
			res.status(500).send(error.message);
		}
	} else {
		res.status(405).send('Method Not Allowed');
	}
}
