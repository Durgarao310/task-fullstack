import { styled } from '@mui/material/styles'
import { Card, Stack, Container, Typography, Box } from '@mui/material'
import Page from '../components/Page'
import { MHidden } from '../components/@material-extend'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import { TextField, Button } from '@mui/material'
import Lottie from 'react-lottie'
import animationData from '../b'
import { toast } from 'material-react-toastify'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
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

// ----------------------------------------------------------------------

export default function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [phone, setPhone] = useState('')
	const [username, setUsername] = useState('')
	const [role, setRole] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [loading, setLoading] = useState(false)
	let navigate = useNavigate()

	let from = '/login'
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			toast.warning("password dosn't match!")
		} else {
			setLoading(true)
			try {
				const res = await axios.post(
					'http://127.0.0.1:8000/api/register',
					{
						email,
						password,
						username,
						role,
						phone_number: phone,
						confirm_password: confirmPassword
					}
				)
				if (res) {
					navigate(from, { replace: true })
				}
			} catch (error) {
				toast.error(error.response.data.access)
			}
			setLoading(false)
		}
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
		<RootStyle title="Register | Mochi">
			<MHidden width="mdDown">
				<SectionStyle>
					<Lottie options={defaultOptions} height={400} width={400} />
				</SectionStyle>
			</MHidden>

			<Container maxWidth="sm">
				<ContentStyle>
					<Stack spacing={2}>
						<form onSubmit={handleSubmit}>
							<TextField
								size="small"
								fullWidth
								label="Name"
								variant="outlined"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								sx={{ marginTop: 2 }}
								required
							/>
							<TextField
								size="small"
								fullWidth
								label="Phone Number"
								variant="outlined"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								sx={{ marginTop: 2 }}
								required
								type="number"
							/>
							<TextField
								size="small"
								required
								fullWidth
								label="Email"
								variant="outlined"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								sx={{ marginTop: 2 }}
							/>
							<TextField
								size="small"
								required
								fullWidth
								label="Password"
								variant="outlined"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								sx={{ marginTop: 2 }}
							/>
							<TextField
								size="small"
								required
								fullWidth
								label="Confirm Password"
								variant="outlined"
								type="password"
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								sx={{ marginTop: 2 }}
							/>
							<FormControl
								fullWidth
								sx={{
									my: 2
								}}
							>
								<InputLabel size="small">Role</InputLabel>
								<Select
									sx={{
										alignItems: 'center'
									}}
									size="small"
									required
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={role}
									label="Role"
									onChange={(e) => setRole(e.target.value)}
								>
									<MenuItem value="ADMIN">Admin</MenuItem>
									<MenuItem value="MANAGER">Manager</MenuItem>
									<MenuItem value="STAFF">Staff</MenuItem>
								</Select>
							</FormControl>
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
									<Typography variant="h6">
										Register
									</Typography>
								</Button>
							)}
						</form>

						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Typography>do you have account?</Typography>
							<Button component={RouterLink} to="/login">
								Login
							</Button>
						</Box>
					</Stack>
				</ContentStyle>
			</Container>
		</RootStyle>
	)
}
