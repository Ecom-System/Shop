// import { Button, TextInput } from '@mantine/core'
// import { useForm } from '@mantine/form'
// import React from 'react'
// import { useState } from 'react'
// import TestForm from 'src/components/ir/irForm2'
// import SearchForm from 'src/components/search/SearchForm'

// export default function Test(){
// 	const form = useForm({
// 		initialValues: {
// 		  name1: '',
// 		  name2:"",
// 		},

// 		// validate: {
// 		//   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
// 		// },
// 	  });




//   return (
//     <>
//     {/* <TestForm />
//     <SearchForm /> */}
//     </>
//   )
// }

// import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import { axios } from 'src/lib/axios';
// import { Data } from './api/find-ir-test';

// export default function Demo() {
// 	const form = useForm({
// 		initialValues: {
// 			name1: '',
// 			name2: "",
// 		},
// 	});

// 	const handleSubmit = async (values: Data) => {
// 		try {
// 			const response = await axios.post("/find-ir-test", values)
// 			const { answer } = response.data
// 			console.log(answer)
// 		} catch (e) {
// 			console.log(e)
// 		}
// 	}

// 	return (
// 		<Box sx={{ maxWidth: 300 }} mx="auto">
// 			<form onSubmit={form.onSubmit(handleSubmit)}>
// 				<TextInput
// 					withAsterisk
// 					label="name1"
// 					placeholder="your@email.com"
// 					{...form.getInputProps('name1')}
// 				/>

// 				<TextInput
// 					withAsterisk
// 					label="name2"
// 					placeholder="name2"
// 					{...form.getInputProps('name2')}
// 				/>

// 				<Group position="right" mt="md">
// 					<Button type="submit">Submit</Button>
// 				</Group>
// 			</form>
// 		</Box>
// 	);
// }



import { useState } from "react";
import styles from "../styles/toggle.module.css";

export default function Toggle() {
	const [toggleContent, setToggleContent] = useState("Photo");

	const handleToggle = () => {
		toggleContent === "Photo"
			? setToggleContent("Video")
			: setToggleContent("Photo");
	};

	return (
		<div className={styles.toggleContainer}>
			<div className={styles.switchButton}>
				<input
					className={styles.switchButtonCheckbox}
					type="checkbox"
					onChange={handleToggle}
				/>
				<label className={styles.switchButtonLabel}>
					<span className={styles.switchButtonLabelSpan}>
						String
					</span>
				</label>
			</div>
		</div>
	);
}
