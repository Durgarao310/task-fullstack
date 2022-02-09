import React, { useEffect } from 'react'
import { Container, Typography, Box, Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Page from '../components/Page'
import { Link as RouterLink } from 'react-router-dom'
import animationData from '../lotties/a'
import { toast } from 'material-react-toastify'
import Lottie from 'react-lottie'
import Product from '../components/products/Product'
import axios from '../axios'

export default function Products() {
	const [products, setProducts] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	let role = sessionStorage.getItem('role')

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	}

	useEffect(() => {
		fetchProducts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const fetchProducts = async () => {
		try {
			setLoading(true)
			const res = await axios.get('/products/products/')
			setProducts(res.data)
		} catch (error) {
			toast.error(error.response.data.access)
		}
		setLoading(false)
	}

	return (
		<Page title="Products | Mochi">
			<Container maxWidth="xl">
				{role === 'STAFF' ? (
					<div>
						<Box>
							<Dialog
								open={true}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<DialogContent>
									<DialogContentText id="alert-dialog-description">
										<Typography>
											if you want learn css flex? click
											the link{' '}
											<a href="https://flexguide.netlify.app/">
												click
											</a>
										</Typography>
									</DialogContentText>
								</DialogContent>
							</Dialog>
						</Box>
					</div>
				) : (
					<div>
						{' '}
						{loading ? (
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								minHeight="80vh"
							>
								<Lottie
									options={defaultOptions}
									height={200}
									width={200}
								/>
							</Box>
						) : (
							<>
								{role === 'STAFF' ? (
									<p></p>
								) : (
									<Box>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'space-between'
											}}
										>
											<Typography
												sx={{ my: 2 }}
												variant="h6"
											>
												Products
											</Typography>
											<Box
												sx={{ display: 'flex', my: 2 }}
											>
												{role === 'ADMIN' && (
													<Button
														component={RouterLink}
														sx={{
															display:
																'inline-flex'
														}}
														to="/add-product"
														variant="contained"
													>
														Add Product
													</Button>
												)}
											</Box>
										</Box>
										<Product rows={products} />
									</Box>
								)}
							</>
						)}
					</div>
				)}
			</Container>
		</Page>
	)
}
