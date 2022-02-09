import React, { useState, useEffect } from 'react'
import { Container, Typography, Box, TextField, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Page from '../components/Page'
import { useNavigate } from 'react-router-dom'
import { toast } from 'material-react-toastify'
import axios from '../axios'

export default function AddProduct() {
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')
	const [count, setCount] = useState('')
	const [loading, setLoading] = useState(false)
	let role = sessionStorage.getItem('role') // An object :D
	let navigate = useNavigate()

	useEffect(() => {
		if (role !== 'ADMIN') {
			navigate('/404')
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const submitProduct = async (e) => {
		e.preventDefault()

		try {
			setLoading(true)
			const result = await axios.post('/products/products/', {
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
		<Page title="Add Product | Mochi">
			<Container maxWidth="xl">
				<div>
					<Typography sx={{ my: 2 }} variant="h6" gutterBottom>
						Add Product
					</Typography>

					<form onSubmit={submitProduct}>
						<TextField
							required
							id="outlined-required"
							label="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							fullWidth
							placeholder="Name"
							sx={{ mb: 3 }}
						/>

						<TextField
							required
							type="number"
							id="outlined-required"
							label="Price"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							fullWidth
							placeholder="Price"
							sx={{ mb: 3 }}
						/>
						<TextField
							required
							id="outlined-required"
							label="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							fullWidth
							placeholder="Description"
							sx={{ mb: 3 }}
						/>
						<TextField
							type="number"
							required
							id="outlined-required"
							label="Quantity"
							value={count}
							onChange={(e) => setCount(e.target.value)}
							fullWidth
							placeholder="Quantity"
							sx={{ mb: 3 }}
						/>

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
					</form>
				</div>
			</Container>
		</Page>
	)
}
