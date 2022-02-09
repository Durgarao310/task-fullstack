/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Container, Typography, Box, TextField, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Page from '../components/Page'
import { toast } from 'material-react-toastify'
import Lottie from 'react-lottie'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import animationData from '../lotties/a'
import axios from '../axios'

export default function UpdateCoupon() {
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')
	const [count, setCount] = useState('')
	const [loading, setLoading] = useState(false)
	const [pageLoading, setPageLoading] = useState(false)
	let role = sessionStorage.getItem('role') // An object :D
	let navigate = useNavigate()
	const { id } = useParams()

	useEffect(() => {
		if (role === 'STAFF') {
			navigate('/404')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	}

	useEffect(() => {
		res()
	}, [])

	const res = async () => {
		try {
			setPageLoading(true)
			const result = await axios.get(`/products/products/${id}/`)
			setName(result.data.name)
			setPrice(result.data.price)
			setCount(result.data.count)
			setDescription(result.data.description)
		} catch (error) {
			toast.error(error.response.data.access)
		}
		setPageLoading(false)
	}

	const submitProduct = async (e) => {
		e.preventDefault()

		try {
			setLoading(true)
			const result = await axios.patch(`/products/products/${id}/`, {
				name,
				price,
				description,
				count
			})
			if (result) {
				navigate('/')
			}
		} catch (error) {
			toast.error(error.response.data.access)
		}
		setLoading(false)
	}

	return (
		<Page title="Update Category | Mochi">
			<Container maxWidth="xl">
				{pageLoading ? (
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
					<div>
						<Typography variant="h6" gutterBottom>
							Update Product
						</Typography>

						<form onSubmit={submitProduct}>
							<Box>
								<Box sx={{ my: 2 }}>
									<TextField
										required
										id="outlined-required"
										label="Name"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
										fullWidth
										mb={3}
										placeholder="Name"
									/>
								</Box>

								<Box sx={{ my: 2 }}>
									<TextField
										required
										id="outlined-required"
										label="Price"
										value={price}
										onChange={(e) =>
											setPrice(e.target.value)
										}
										fullWidth
										type="number"
										mb={3}
										placeholder="Price"
									/>
								</Box>

								<Box sx={{ my: 2 }}>
									<TextField
										required
										id="outlined-required"
										label="Description"
										value={description}
										onChange={(e) =>
											setDescription(e.target.value)
										}
										fullWidth
										mb={3}
										placeholder="Description"
									/>
								</Box>

								<Box sx={{ my: 2 }}>
									<TextField
										required
										id="outlined-required"
										label="Quantity"
										value={count}
										type="number"
										onChange={(e) =>
											setCount(e.target.value)
										}
										fullWidth
										mb={3}
										placeholder="Quantity"
									/>
								</Box>

								<Box>
									{loading ? (
										<LoadingButton
											loading
											variant="outlined"
											sx={{ marginTop: 2 }}
										>
											{' '}
											Loading...
										</LoadingButton>
									) : (
										<Button
											variant="contained"
											type="submit"
											sx={{ marginTop: 2 }}
										>
											Submit
										</Button>
									)}
								</Box>
							</Box>
						</form>
					</div>
				)}
			</Container>
		</Page>
	)
}
