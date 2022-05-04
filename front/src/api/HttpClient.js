import axios from 'axios'

export default (options = {}) => {
    const headers = {
        // 'Accept': 'application/json',
        // 'Content-type': 'application/x-www-form-urlencoded',
    }

    const token = localStorage.getItem('token')
    if(token) {
        headers["Authorization"] = `Bearer ${token}`
    }

    const http = axios.create({
        headers,
    })

    http.interceptors.response.use(
        response => {
            return response
        },
        error => {
            const unauthorized = Boolean(error?.response?.status === 401)
            if (unauthorized) {
                console.error('not authorized...')
                document.location = '/auth/login'
            }
            return Promise.reject(error)
        },
    )

    return http
}
