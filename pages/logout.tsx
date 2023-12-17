import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import Cookies from "js-cookie";
import { useEffect } from 'react';

export default function AdminLogout() {
	const router = useRouter();

	useEffect(() => {

		const isLoggedIn = Cookies.get('email');
		router.push('/');
		if(isLoggedIn == "admin@admin.com") {
			Cookies.remove("supplier");
		}
		if (isLoggedIn) {
			Cookies.remove("email");
            Cookies.remove("account");
			router.reload();

			showNotification({
				title: "Logged Out",
				message: "Log out successful",
				color: "teal",
				autoClose: 5000,
			});
		}

	}, []);

	return (
		<></>
	);
}

