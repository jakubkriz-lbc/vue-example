import axios from 'axios'

export default () => {
  if (!process.env.VUE_APP_API_BASE_URL) {
    throw new Error('Please set VUE_APP_API_BASE_URL in .env file')
  }

  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
    }
  })

  instance.interceptors.response.use(res => {
    if (res.status !== 200 || typeof res.data !== 'object') {
      return Promise.reject(res)
    }

    return res.data
  }, error => {
    return Promise.reject(error)
  })

  return instance
}
