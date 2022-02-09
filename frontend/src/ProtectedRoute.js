import { Navigate, useLocation } from 'react-router'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	let location = useLocation()
	var token = sessionStorage.getItem('token') // An object :D
	if (!token) {
		return <Navigate to="/login" state={{ from: location }} />
	}
	return children
}
export default ProtectedRoute
