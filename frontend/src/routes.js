import { Navigate, useRoutes } from 'react-router-dom'
import DashboardLayout from './layouts/dashboard'
import LogoOnlyLayout from './layouts/LogoOnlyLayout'
import Login from './pages/Login'
import UpdateCoupon from './pages/UpdateCoupon'
import NotFound from './pages/Page404'
import ProtectedRoute from './ProtectedRoute'
import Products from './pages/Products'
import Register from './pages/Register'
import AddProduct from './pages/AddProduct'

export default function Router() {
	return useRoutes([
		{
			path: '/',
			element: <DashboardLayout />,
			children: [
				{
					path: 'update-product/:id',
					element: (
						<ProtectedRoute>
							<UpdateCoupon />
						</ProtectedRoute>
					)
				},
				{
					path: '',
					element: (
						<ProtectedRoute>
							<Products />
						</ProtectedRoute>
					)
				},

				{
					path: 'add-product',
					element: (
						<ProtectedRoute>
							<AddProduct />
						</ProtectedRoute>
					)
				}
			]
		},
		{
			path: '/',
			element: <LogoOnlyLayout />,
			children: [
				{ path: 'register', element: <Register /> },
				{ path: 'login', element: <Login /> },
				{ path: '404', element: <NotFound /> },
				{ path: '*', element: <Navigate to="/404" /> }
			]
		},
		{ path: '*', element: <Navigate to="/404" replace /> }
	])
}
