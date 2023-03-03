import { Tabs } from '@mantine/core';
import styles from './../../styles/background.module.css'

export default function BackgroundPage() {
	return (
		<div className={styles.container} style={{ marginTop: '-8%' }}>
			<main className={styles.main}>
				<Tabs color="lime" radius="lg" variant="pills" orientation="vertical" defaultValue="terminology">
					<Tabs.List>
						<Tabs.Tab value="terminology">

							{/* <img src="https://img.icons8.com/ios/40/null/dictionary.png" /> */}
							<img width='35' height='35' src="https://i.ibb.co/XXkQ6QP/dictionary-3.png" />
							&nbsp;Terminology</Tabs.Tab>
						<Tabs.Tab value="problem">
							<img width='35' height='35' src="https://i.ibb.co/mXsCjnc/problem.png" />
							&nbsp;Problem</Tabs.Tab>
						<Tabs.Tab value="methodology">
							<img width='35' height='35' src="https://i.ibb.co/0ZRBmBY/flow-chart.png" />
							&nbsp;Methodology</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="terminology" pl="xs">
						<div className={styles.terminology}>
							<h2>Terminology</h2>
							<div className={styles.termCard}>
								<h3>DNA</h3>
								<p>A molecule that carries genetic information.</p>
							</div>
							<div className={styles.termCard}>
								<h3>String</h3>
								<p>In bioinformatics, a string refers to a sequence of characters that represents a biological molecule,
									such as DNA, RNA, or protein. The characters in a string are typically restricted to a specific alphabet
									of symbols that correspond to the building blocks of the biological molecule. <br /> <br />

									For example, in DNA sequences, the alphabet consists of four symbols, A (adenine), C (cytosine), G (guanine),
									and T (thymine), while in RNA sequences, the alphabet consists of A, C, G, and U (uracil). In protein sequences,
									the alphabet consists of 20 symbols, which correspond to the 20 different amino acids.</p>
							</div>

							<div className={styles.termCard}>
								<h3>Degenerate String</h3>
								<p>In bioinformatics, a degenerate string is a sequence of nucleotides or amino acids that contains
									alternative options at one or more positions. These alternatives can arise due to genetic variation
									or the presence of ambiguous bases. </p>
							</div>
							<div className={styles.termCard}>
								<h3>Hamming distance</h3>
								<p>The Hamming distance between two sequences X and Y is defined as the number of positions in which
									the corresponding symbols differ. Mathematically, it is denoted as δH(X, Y) and is calculated as
									the cardinality of the set of all positions i, such that X[i] ≠ Y[i], where X and Y are sequences
									of the same length. <br /> <br />

									For example, let X = "ATCGGT" and Y = "ATCGCT". Then, the Hamming distance between X and Y is 1,
									since only the 5th position differs between the two sequences.</p>
							</div>
							<div className={styles.termCard}>
								<h3>IUPAC Sequence</h3>
								<p>The IUPAC (International Union of Pure and Applied Chemistry) sequence is a type of nucleotide sequence
									that is commonly used in bioinformatics to represent ambiguous or degenerate DNA or RNA sequences.
									<br /><br />

									The IUPAC character set includes the following characters:

									A (Adenine),
									C (Cytosine),
									G (Guanine),
									T (Thymine),
									U (Uracil),
									R (A or G),
									Y (C or T),
									M (A or C),
									K (G or T),
									S (C or G),
									W (A or T),
									B (C, G, or T),
									D (A, G, or T),
									H (A, C, or T),
									V (A, C, or G),
									N (A, C, G, or T)

								</p>
							</div>
							<div className={styles.termCard}>
								<h3>Inverted Repeat</h3>
								<p>An inverted repeat is a DNA sequence followed downstream by its
									reverse complement, potentially with a gap in the centre.
									<img style={{ marginLeft: 200 }} src="/IR-example.png" />
								</p>
							</div>
							<div className={styles.termCard}>
								<h3>Palindrome</h3>
								<p>A sequence of nucleotides that reads the same forward and backward.</p>
							</div>
						</div>
					</Tabs.Panel>

					<Tabs.Panel value="problem" pl="xs">
						<div className={styles.terminology}>
							<h2>Problem Defination</h2>
							<div className={styles.termCard}>
								<h3>Input</h3>
								<p>IUPAC-encoded string x of length n, a natural number k representing the maximum
									number of permitted mismatches, a pair of natural numbers m and M representing
									the minimum and maximum length respectively of the identified inverted repeats,
									and a natural number g specifying the maximum permitted gap size.
								</p>
							</div>
							<div className={styles.termCard}>
								<h3>Output</h3>
								<p>Array of inverted repeats each represented by 4 indexes (a, b, c, d) such that for some
									string w = x[c...d], it is that case that x[a...b] is a complement of w. Additionally,
									the gap c - b - 1 ≤ g and the length of the inverted repeat is within the stated
									bounds i.e. m ≤ b - a + 1 ≤ M and m ≤ d - c + 1 ≤ M.</p>
							</div>

							<div className={styles.termCard}>
								<h3>Solution</h3>
								<p>We present IUPACpal, an exact tool for efcient identifcation of inverted
									repeats in IUPAC-encoded DNA sequences allowing also for potential mismatches and
									gaps in the inverted repeats.</p>
							</div>

						</div>
					</Tabs.Panel>

					<Tabs.Panel value="methodology" pl="xs">

						<div className={styles.content}>
							<h2>Methodology</h2>
							<p>
								Here, explain how you find the inverted repeat by using various data
								structures and algorithms like sparse table, KMP, suffix array, LCP
								array, etc.

								Need modification....
							</p>
							<p>
								The International Union of Pure and Applied Chemistry (IUPAC) encoding is an extended alphabet that provides
								a single symbol representation for every possible subset of the standard 4-symbol DNA alphabet. This encoding
								includes degenerate symbols that represent a set of possibilities. To determine complements of these symbols,
								the current matching scheme is extended over the full IUPAC alphabet. The current scheme assigns a unique
								complement to every IUPAC symbol by taking complements of the underlying symbols of the represented subset.
								This is known as the simple complement matching scheme. However, this method does not take into account all
								possible match scenarios. To address this, the degenerate complement matching scheme was introduced. Under this
								scheme, two symbols match if there exists a pair of symbols that complement each other.
							</p>


							<p>
								The standard set of IUPAC symbols is Σ+ = (A, C, G, T, R, Y, S, W, K, M, B, D, H, V, N). This raises the
								question of how to determine complements of such IUPAC symbols. The paper presents two complement matching
								schemes, simple and degenerate, and explains how they differ in terms of matching possibilities. Simple
								complement matching assigns a unique complement to each IUPAC symbol based on the underlying characters of the
								represented subset of Σ, whereas degenerate complement matching considers a match to occur whenever two IUPAC
								characters have any possibility of matching between any of their respective associated subsets of characters.
								The underlying algorithm of IUPACpal is independent of the matching scheme used and can be modified to fit the
								intended use case.
							</p>
							<p>
								The algorithm for identifying inverted repeats (IRs) in a DNA sequence examines each position in the sequence
								to determine every valid IR with its center at that position while adhering to the input parameters for maximum
								gap and size range. The algorithm uses the kangaroo method to create a function that identifies the longest
								matching prefix of any two string substrings, called the longest common extension (LCE). To do this, the algorithm
								generates indexing data structures such as the suffix array (SA) and longest common prefix (LCP) array. Then, the
								algorithm considers a range of possible gaps for each location in the sequence and identifies symbols that are
								equidistant from the center and are considered mismatches. It determines the minimal initial gap and increases it
								to extend the IR and reduce the number of mismatches. This extension procedure is repeated to obtain all IRs for a
								given center, considering the maximum gap and size range parameters. The algorithm maintains efficiency by
								calculating only the necessary mismatch locations for a given set of parameters, avoiding unnecessary calculations.
							</p>

							<hr></hr>

							The methodology of the paper "IUPACpal: efficient identification of inverted repeats in IUPAC-encoded DNA sequences" involves
							the development and implementation of an algorithm for identifying inverted repeats in IUPAC-encoded DNA sequences. The
							algorithm builds upon the maximal palindrome identifying algorithm, and focuses on software
							implementation above the underlying algorithm. <br /><br />

							The maximal palindrome identifying algorithm is a method for identifying all maximal palindromic substrings in a given
							DNA sequence. The algorithm first preprocesses the sequence by constructing a suffix tree, which is a data structure
							that stores all possible substrings of the sequence in a compressed form. The algorithm then traverses the suffix tree
							and identifies all pairs of palindromic substrings that overlap or are adjacent to each other, and merges them into
							larger palindromes. This process is repeated until no further palindromes can be merged. The resulting set of
							palindromes is then filtered to remove any non-maximal palindromes, i.e., palindromes that are fully contained within
							larger palindromes. The algorithm has a time complexity of O(n log n) and a space complexity of O(n), where n is the
							length of the input sequence.<br /><br />

							To identify inverted repeats, the algorithm exhaustively examines each position within a sequence and determines every
							valid inverted repeat with its center at that position which adheres to the given input parameters. This is achieved by
							identifying symbols which are equidistant from the center and considered to mismatch, using the kangaroo method. The
							kangaroo method involves preprocessing the sequence to obtain both its suffix tree and the suffix tree of the reverse
							of the sequence.<br /><br />

							Once these mismatches are identified, the algorithm considers a minimal initial gap which is subsequently increased in
							order to reduce the number of mismatches inside the inverted repeat being considered, and thus permits a longer extension.
							This extension is performed repeatedly to obtain all inverted repeats for a given center, while taking into account the
							parameters specifying the maximum gap and the size range for the inverted repeat itself.<br /><br />

							Effort was made to ensure space and time efficiency within the specific components of the implementation, and additional
							steps were included to address gaps and mismatches through the use of the kangaroo method of common extensions. The
							algorithm maintains efficiency by calculating only the necessary mismatch locations needed for a given set of parameters,
							and no more.<br /><br />

							Overall, the methodology of the paper involves the development and implementation of an algorithm that is efficient in
							identifying inverted repeats in IUPAC-encoded DNA sequences, by building upon previous algorithms and incorporating
							additional steps for addressing gaps and mismatches.
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