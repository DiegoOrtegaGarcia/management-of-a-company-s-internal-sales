import axios from "axios";
import { getAuthCookies } from "../utils/userCookies";

const apiService = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: { 'Content-Type': 'application/json' },
    timeout : 5000
})


apiService.interceptors.request.use(
  config => {
    const token = getAuthCookies()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export default apiService
