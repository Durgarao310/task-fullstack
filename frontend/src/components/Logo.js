import PropTypes from 'prop-types'
// material
import { Box } from '@mui/material'

// ----------------------------------------------------------------------

Logo.propTypes = {
	sx: PropTypes.object
}

export default function Logo({ sx }) {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center'
			}}
		>
			<Box
				component="img"
				src="/static/logo.png"
				sx={{ width: 180, height: 67, ...sx }}
			/>
		</Box>
	)
}
