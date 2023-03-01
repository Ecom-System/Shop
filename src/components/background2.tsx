import { Tabs } from '@mantine/core';
import styles from './../../styles/background.module.css'

export default function BackgroundPage() {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<Tabs color="teal" radius="lg" variant="pills" orientation="vertical" defaultValue="terminology">
					<Tabs.List>
						<Tabs.Tab value="terminology">Terminology</Tabs.Tab>
						<Tabs.Tab value="methodology">Methodology</Tabs.Tab>
						<Tabs.Tab value="settings">Settings</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="terminology" pl="xs">
						<div className={styles.terminology}>
							<h2>Terminology</h2>
							<div className={styles.termCard}>
								<h3>String</h3>
								<p>A sequence of characters.</p>
							</div>
							<div className={styles.termCard}>
								<h3>DNA</h3>
								<p>A molecule that carries genetic information.</p>
							</div>
							<div className={styles.termCard}>
								<h3>IUPAC Sequence</h3>
								<p>A DNA sequence that uses ambiguous nucleotide codes to represent multiple possibilities at a single position.</p>
							</div>
							<div className={styles.termCard}>
								<h3>Inverted Repeat</h3>
								<p>A sequence of nucleotides that is the reverse complement of another sequence, with some gap in between.</p>
							</div>
							<div className={styles.termCard}>
								<h3>Palindrome</h3>
								<p>A sequence of nucleotides that reads the same forward and backward.</p>
							</div>
						</div>
					</Tabs.Panel>

					<Tabs.Panel value="methodology" pl="xs">
						<div className={styles.methodology}>
							<h2>Methodology</h2>
							<p>Here, explain how you find the inverted repeat by using various data structures and algorithms like sparse table, KMP, suffix array, LCP array, etc.</p>
						</div>
					</Tabs.Panel>

					<Tabs.Panel value="settings" pl="xs">
						Settings tab content
					</Tabs.Panel>
				</Tabs>
			</main>
		</div>
	);
}