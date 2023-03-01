import { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, Paper, Transition, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HEADER_HEIGHT, links } from './data';
import useStyles from './styles';
import Link from 'next/link';



// interface HeaderResponsiveProps {
//   links: { link: string; label: string }[];
// }

export default function HeaderResponsive() {
	const [opened, { toggle, close }] = useDisclosure(false);
	const [active, setActive] = useState(links[0].link);
	const { classes, cx } = useStyles();

	const items = links.map((link) => (
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
				<Text color="white" size={28}>IUPACpal.v2</Text>
				<Group spacing={5} className={classes.links}>
					{items}
				</Group>

				<Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

				<Transition transition="pop-top-right" duration={200} mounted={opened}>
					{(styles) => (
						<Paper className={classes.dropdown} withBorder style={styles}>
							{items}
						</Paper>
					)}
				</Transition>
			</Container>
		</Header>
	);
}