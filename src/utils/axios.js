import axios from 'axios'
const axiosInstance = axios

axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export default axiosInstance
