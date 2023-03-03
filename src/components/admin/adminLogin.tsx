import {
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
	useMantineTheme,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useForm } from "@mantine/form";
import { showNotification } from '@mantine/notifications';
import Cookies from "js-cookie";
import { useEffect } from 'react';

export function AdminLogin() {
	const theme = useMantineTheme();
	const router = useRouter();


	useEffect(() => {
		const isLoggedIn = Cookies.get('admin');
		if (isLoggedIn) {
			router.push('./home');
		}

	}, []);

	function handleSubmit(values: any) {

		if (values.email == 'admin@admin.com' && values.pass == 'admin') {
			showNotification({
				title: "Logged In",
				message: "Log in successful",
				color: "teal",
				autoClose: 5000,
			});
			// Set cookie to expire in 1 hour
			const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
			Cookies.set("admin", "true", { expires });
			router.push('./home');
		}
		else {
			showNotification({

				title: "Invalid information",
				message: "Your email/pass is incorrect",
				color: "red",
				autoClose: 5000,
			});
		}

	}

	const form = useForm({
		validateInputOnChange: true,

		initialValues: {

			email: '',
			pass: '',

		},

		validate: (values) => ({

			email:
				values.email === undefined
					? 'email is required'
					: (/^\S+@\S+$/.test(values.email) ? null : 'Invalid email'),
			pass:
				values.pass === undefined
					? 'password is required'
					: null,
		}),

	});

	return (
		<div className='container' style={{ marginTop: '-5%' }}>
			<Container size={420} my={40} >
				<Title
					align="center"
					sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
				>
					Welcome back Admin!
				</Title>

				<Paper withBorder shadow="md" p={30} mt={30} radius="md">

					<form onSubmit={form.onSubmit(handleSubmit)}>



						<TextInput
							required
							label="Email"
							placeholder="Enter your email"
							{...form.getInputProps('email')}
						/>


						<TextInput
							required
							label="Password"
							placeholder="Enter your password"
							style={{ marginTop: theme.spacing.md }}
							{...form.getInputProps('pass')}
						/>

						<button className="btn1" type='submit'

						> Login</button>
					</form>

				</Paper>
			</Container>
		</div>
	);
}


