// routes
import React from 'react'
import Router from './routes'
import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'
import ScrollToTop from './components/ScrollToTop'
import { ToastContainer } from 'material-react-toastify'

export default function App() {
	return (
		<ThemeConfig>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<div>
				<ScrollToTop />
				<GlobalStyles />
				<Router />
			</div>
		</ThemeConfig>
	)
}
