import { styled } from '@mui/material/styles'
import { Card, Stack, Container, Typography, Box } from '@mui/material'
import Page from '../components/Page'
import { MHidden } from '../components/@material-extend'
import { useLocation, useNavigate } from 'react-router'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import { TextField, Button } from '@mui/material'
import Lottie from 'react-lottie'
import animationData from '../b'
import { toast } from 'material-react-toastify'
import { Link as RouterLink } from 'react-router-dom'

const RootStyle = styled(Page)(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		display: 'flex'
	}
}))

const SectionStyle = styled(Box)(({ theme }) => ({
	width: '100%',
	maxWidth: 600,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	margin: theme.spacing(2, 0, 2, 2)
}))

const ContentStyle = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: 'auto',
	display: 'flex',
	minHeight: '100vh',
	flexDirection: 'column',
	justifyContent: 'center',
	padding: theme.spacing(12, 0)
}))

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	let navigate = useNavigate()
	let location = useLocation()

	let from = location.state?.from?.pathname || '/'

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			const res = await axios.post('http://127.0.0.1:8000/api/login', {
				email,
				password
			})
			if (res) {
				try {
					const response = await axios.get(
						'http://localhost:8000/api/profile',
						{
							headers: {
								Authorization: `Bearer ${res?.data?.access}`
							}
						}
					)
					window.sessionStorage.setItem('role', response.data.role)
					window.sessionStorage.setItem('token', res.data.access)
					window.sessionStorage.setItem('refresh', res.data.refresh)
					if (response) {
						navigate(from, { replace: true })
					}
				} catch (error) {
					toast.error(error.response.data.access)
				}
			}
		} catch (error) {
			toast.error(error.response.data.access)
		}
		setLoading(false)
	}

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	}

	return (
		<RootStyle title="Login | Mochi">
			<MHidden width="mdDown">
				<SectionStyle>
					<Lottie options={defaultOptions} height={400} width={400} />
				</SectionStyle>
			</MHidden>

			<Container maxWidth="sm">
				<ContentStyle>
					<Stack spacing={2}>
						<form onSubmit={handleSubmit}>
							<Typography
								variant="h3"
								sx={{ px: 5, mt: 10, mb: 5 }}
							>
								Hi, Welcome Back
							</Typography>
							<TextField
								fullWidth
								size="small"
								label="Email"
								variant="outlined"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								sx={{ marginTop: 2 }}
							/>
							<TextField
								fullWidth
								size="small"
								label="Password"
								variant="outlined"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								sx={{ marginTop: 2 }}
							/>
							{loading ? (
								<LoadingButton
									loading
									variant="contained"
									fullWidth
									sx={{ marginTop: 2, padding: 2.1 }}
									size="small"
									type="submit"
								>
									{' '}
								</LoadingButton>
							) : (
								<Button
									size="small"
									type="submit"
									fullWidth
									variant="contained"
									sx={{ marginTop: 2 }}
								>
									<Typography variant="h6">Login</Typography>
								</Button>
							)}
						</form>

						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Typography> you don't have account?</Typography>
							<Button component={RouterLink} to="/register">
								Register
							</Button>
						</Box>
					</Stack>
				</ContentStyle>
			</Container>
		</RootStyle>
	)
}
