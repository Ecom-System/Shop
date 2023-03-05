import {
	createStyles,
	Image,
	Container,
	Title,
	Button,
	Group,
	Text,
	List,
	ThemeIcon,
	Input,
	TextInput,
} from '@mantine/core';
import { read } from 'fs';
import { useState } from 'react';
import image from '../../assets/search.jpg';
import Result from './result';
import useStyles from './styles';

export function SearchForm() {
	const [ready, setReady] = useState(false);

	const { classes } = useStyles();
	const [text, setText] = useState("");

	const closeSearch = () => {
		let x = document.getElementById("myOverlay");
		if (x) {
			x.style.display = "none";
		}
	}
	const openSearch = () => {
		let x = document.getElementById("myOverlay");
		if (x) {
			x.style.display = "block";
		}
	}

	const handleText = (event: { target: { value: any; }; }) => {
		setText(event.target.value);
		if (event.target.value.length > 0) {
			const clear = document.getElementById('input_reset');
			if (clear) {
				clear.style.display = 'block';
			}
		}
	};

	const handleClear = () => {
		const clear = document.getElementById('input_reset');
		const inputBox = document.querySelector('.overlay input[type="text"]') as HTMLInputElement;
		if (clear) {
			clear.style.display = 'none';
			if (inputBox)
				inputBox.value = '';
		}
	}

	const showResult = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(text);
		setReady(true);
	}

	return (
		<>
			{!ready && (
				<div className='container' style={{ marginTop: '-75px' }}>
					<Container>
						<div className={classes.inner}>
							<div className={classes.content}>
								<Title className={classes.title} style={{
									textShadow: "#caad7e 0px 3px 0px, #c4dea4 3px 3px 3px",

								}}>
									Inverted Repeat Lookup
								</Title>
								<Text mt="md" style={{
									font: "normal 20px/1.2 Segoe Print,Verdana, Helvetica",
								}}>
									Here you can search for previously obtained Inverted Repeat results by providing
									the name of the DNA sequence. Simply enter the name of the DNA sequence in the
									search box and hit enter to see the list of Inverted Repeats with gaps and mismatches.
								</Text>

								<List
									color='#caad7e'
									mt={30}
									spacing="sm"
									size="sm"
									icon={
										<ThemeIcon size={20} radius="xl" style={{ backgroundColor: '#caad7e' }}>
											<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.25" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
												<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
												<path d="M5 12l5 5l10 -10"></path>
											</svg>

										</ThemeIcon>
									}
								>
									<List.Item>
										<b>Need this?: </b> some dummy text, random text, random random.
									</List.Item>
								</List>

								<Group mt={30}>
									<button className='btn2' onClick={openSearch}>Get started</button>
								</Group>
							</div>
							<Image src={image.src} className={classes.image} />
						</div>
					</Container>

					<div id="myOverlay" className="overlay">
						<span className="closebtn" onClick={closeSearch} title="Close Searching">X</span>
						<div className="overlay-content">
							<form onSubmit={showResult}>
								<TextInput placeholder="Search.." onChange={handleText} required />
								<div id='input_reset' onClick={handleClear}>
									<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
										width="24" height="24"
										viewBox="0 0 50 50">
										<path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
									</svg>
								</div>
								<button type="submit">
									<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
										width="40" height="40"
										viewBox="0 0 50 50">
										<path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
									</svg>
								</button>
							</form>
						</div>
					</div>
				</div>

			)}

			{ready && (
				<Result keyToFind={text} />
			)}

		</>
	);
}