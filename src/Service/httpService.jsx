import { config } from '@fortawesome/fontawesome-svg-core'
import axios from 'axios'

const instance = axios.create()

const logout = async () => {
  // window.location.href = '/login'
  // localStorage.clear()
  // sessionStorage.clear()
}

instance.interceptors.request.use(
  async config => {
    const JwtToken = sessionStorage.getItem('admin_token')

    if (JwtToken) {
      config.headers.Authorization = `Bearer ${JwtToken}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    if (error.response.status === 401) {
      await logout()
    }
    return Promise.reject(error)
  }
)

export default instance
