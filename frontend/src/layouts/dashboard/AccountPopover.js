import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function AccountPopover() {
	let navigate = useNavigate()

	return (
		<>
			<Button
				onClick={() => {
					window.sessionStorage.clear()
					navigate('/login')
				}}
				fullWidth
				variant="outlined"
			>
				Logout
			</Button>
		</>
	)
}
