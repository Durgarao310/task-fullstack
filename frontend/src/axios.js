import axios from 'axios'
const baseUrl = 'http://localhost:8000/api'

axios.defaults.baseURL = baseUrl

axios.interceptors.request.use(
	(config) => {
		const accessToken = sessionStorage.getItem('token')
		if (accessToken) {
			config.headers.Authorization = accessToken
				? `Bearer ${accessToken}`
				: ''
		}
		return config
	},
	(error) => {
		Promise.reject(error)
	}
)

//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
	(response) => {
		return response
	},
	function (error) {
		const originalRequest = error.config
		let refreshToken = sessionStorage.getItem('refresh')
		if (
			refreshToken &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true
			return axios
				.post(`${baseUrl}/token/refresh`, {
					refresh: refreshToken
				})
				.then((res) => {
					if (res.status === 200) {
						window.sessionStorage.setItem('token', res.data.access)
						console.log('Access token refreshed!')
						return axios(originalRequest)
					}
				})
		}
		return Promise.reject(error)
	}
)

export default axios
