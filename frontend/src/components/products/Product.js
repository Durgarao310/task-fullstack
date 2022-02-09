import * as React from 'react'
import { Icon } from '@iconify/react'
import editOutline from '@iconify/icons-eva/edit-outline'
import {
	TableCell,
	Table,
	Paper,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Avatar,
	Box,
	Button,
	TablePagination
} from '@mui/material'
// eslint-disable-next-line no-unused-vars
import { Link, Link as RouterLink } from 'react-router-dom'

export default function Product(props) {
	const [data, setData] = React.useState([])
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(10)

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	React.useEffect(() => {
		setData(props.rows)
	}, [props.rows])

	return (
		<React.Fragment>
			<Paper elevation={2}>
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#id</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Price</TableCell>
								<TableCell>Created</TableCell>
								<TableCell>Description</TableCell>
								<TableCell>Total</TableCell>
								<TableCell>Update</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row) => {
									return (
										<TableRow key={row.id}>
											<TableCell
												component="th"
												scope="row"
											>
												{row.id}
											</TableCell>

											<TableCell
												component="th"
												scope="row"
											>
												{row.name}
											</TableCell>
											<TableCell
												component="th"
												scope="row"
											>
												{row.price}
											</TableCell>
											<TableCell
												component="th"
												scope="row"
											>
												{row.created}
											</TableCell>
											<TableCell
												component="th"
												scope="row"
											>
												{row.description}
											</TableCell>
											<TableCell
												component="th"
												scope="row"
											>
												{row.count}
											</TableCell>

											<TableCell
												component="th"
												scope="row"
											>
												<Box
													sx={{
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'start',
														mx: -1
													}}
												>
													<Link
														to={`/update-product/${row.id}`}
													>
														<Button>
															<Icon
																fontSize={24}
																color="gray"
																icon={
																	editOutline
																}
															/>
														</Button>
													</Link>
												</Box>
											</TableCell>
										</TableRow>
									)
								})}
						</TableBody>
					</Table>
					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component="div"
						count={props.rows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</TableContainer>
			</Paper>
		</React.Fragment>
	)
}
