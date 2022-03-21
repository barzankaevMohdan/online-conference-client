import axios from 'axios'
import config from "~/config";

const $api = axios.create({
  withCredentials: true,
  baseURL: config.BASE_URL,
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.request.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const data = await axios.get(`${config.BASE_URL}/user/refresh`, {withCredentials: true})
        localStorage.setItem('token', data.data.accessToken)
        return $api.request(originalRequest)
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН')
      }
    }
    throw error
  }
)

export default $api
