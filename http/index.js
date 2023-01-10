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

export default $api
