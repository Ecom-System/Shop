import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import useStyles from './styles';

import {
	Table,
	TextInput,
	Paper,
	Title,
	Text,
	Container,
	NumberInput,
	Code,
} from "@mantine/core";
interface Data {
	id: number;
	input_file_link: string;
	output_file_link: string;
	seq_name: string;
	max_gap: number;
	max_mis: number;
	min_len: number;
	max_len: number;
	status: number;
}


export function Library() {
	const { classes } = useStyles();
	const [data, setData] = useState<Data[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [selectedRow, setSelectedRow] = useState<Data | null>(null);

	const tableRef = useRef<HTMLTableElement>(null);

	useEffect(() => {
		axios.get<{ data: Data[]; totalPages: number }>(`/api/get-data?page=${currentPage}`)
			.then(response => {
				console.log("bro")
				console.log(response.data);
				setData(response.data.data);
				setTotalPages(response.data.totalPages);
			}
			).catch(error => console.error(error));
	}, [currentPage]);

	const handlePageClick = (page: number) => {
		setCurrentPage(page);
		setSelectedRow(null);
	};
	const handleRowClick = (row: Data) => {
		console.log(row)
		setSelectedRow(row);
	};

	const handleClickOutsideTable = (event: MouseEvent) => {
		if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
			setSelectedRow(null);
		}
	};
	useEffect(() => {
		document.addEventListener('click', handleClickOutsideTable);
		return () => {
			document.removeEventListener('click', handleClickOutsideTable);
		};
	}, []);

	const paginationItems = [];
	for (let i = 1; i <= totalPages; i++) {
		paginationItems.push(
			<li key={i}>
				<button className='myButton' disabled={i === currentPage} onClick={() => handlePageClick(i)}>
					{i}
				</button>
			</li>
		);
	}
	console.log(data)
	return (<>
		<div className='container' style={{ marginTop: '-5%' }}>

			<Container>
				<Title className={classes.title} style={{
					textShadow: "#caad7e 0px 3px 0px, #c4dea4 3px 3px 3px",

				}}>
					Library of IR
				</Title>
				<Text mt="md" style={{
					font: "normal 20px/1.2 Segoe Print,Verdana, Helvetica",
				}}>
					You can view a history of previously analyzed DNA sequences, as well as the input parameters and identified IRs for each analysis.
				</Text>

				<Paper withBorder shadow="md" p={30} mt={30} radius="md">


					<table ref={tableRef} className="myTable">
						<thead>
							<tr>
								<th>Sequence name</th>
								<th>Max Gap</th>
								<th>Max mismatch</th>
								<th>Min length</th>
								<th>Max length</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item) => (
								<tr key={item.id} onClick={() => handleRowClick(item)}>
									<td>{item.seq_name}</td>
									<td>{item.max_gap}</td>
									<td>{item.max_mis}</td>
									<td>{item.min_len}</td>
									<td>{item.max_len}</td>
								</tr>
							))}
						</tbody>
						<tfoot>

							<tr>
								<td colSpan={5}>
									<div className="links">
										<ul style={{ listStyleType: 'none', display: 'flex', flex: 'horizontal' }}>{paginationItems}</ul>
									</div></td>

							</tr>
						</tfoot>
					</table>
				</Paper>
			</Container>
		</div>

		{selectedRow && (
			<div>
				<h2>Details for Row {selectedRow?.output_file_link}</h2>
			</div>
		)}
	</>
	)
}