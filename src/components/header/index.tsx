import { useEffect, useState } from 'react';
import { createStyles, Header, Container, Group, Burger, Paper, Transition, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HEADER_HEIGHT, links , links_user, supplier} from './data';
import useStyles from './styles';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';




export default function HeaderResponsive() {
	const router = useRouter();
	const [opened, { toggle, close }] = useDisclosure(false);
	const [active, setActive] = useState(router.asPath);
	const { classes, cx } = useStyles();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isSupplier, setIsSupplier] = useState(false);
	// Get the current page URL
	const currentUrl = router.asPath;

	useEffect(() => {
		// console.log('active= ' + active + ", URL = " + router.asPath);
		setActive(router.asPath);
		if (Cookies.get('email'))
			setIsLoggedIn(true);
		if (Cookies.get('supplier'))
			setIsSupplier(true);


	}, [router.asPath]);


	const itemsLoggedInSupplier = supplier.map((link) => (
		<Link
			key={link.label}
			href={link.link}
			className={cx(classes.link, { [classes.linkActive]: active === link.link })}
			onClick={(event) => {
				//event.preventDefault();
				setActive(link.link);
				close();
			}}
		>
			{link.label}
		</Link>
	));

	const itemsLoggedIn = links_user.map((link) => (
		<Link
			key={link.label}
			href={link.link}
			className={cx(classes.link, { [classes.linkActive]: active === link.link })}
			onClick={(event) => {
				//event.preventDefault();
				setActive(link.link);
				close();
			}}
		>
			{link.label}
		</Link>
	));
	const itemsLoggedOut = links.map((link) => (
		<Link
			key={link.label}
			href={link.link}
			className={cx(classes.link, { [classes.linkActive]: active === link.link })}
			onClick={(event) => {
				//event.preventDefault();
				setActive(link.link);
				close();
			}}
		>
			{link.label}
		</Link>
	));

	return (
		<Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
			<Container className={classes.header}>
				<Text color="white" size={28}><p className={classes.pp}>PAIKARI</p></Text>
				<Group spacing={5} className={classes.links}>
					{isLoggedIn == true ? (isSupplier == true?itemsLoggedInSupplier :itemsLoggedIn) : itemsLoggedOut}
				</Group>

				<Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

				<Transition transition="pop-top-right" duration={200} mounted={opened}>
					{(styles) => (
						<Paper className={classes.dropdown} withBorder style={styles}>
							{isLoggedIn == true ? itemsLoggedIn : itemsLoggedOut}
						</Paper>
					)}
				</Transition>
			</Container>
		</Header>
	);
}