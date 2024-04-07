import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.89.182:3000'
})
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token')
  return config;
})
export default instance;