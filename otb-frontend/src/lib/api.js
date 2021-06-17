import axios from 'axios'
import { getToken } from './auth'

const URL = '/api'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

export function loginUser(formData) {
  return axios.post(`${URL}/auth/login/`, formData)
}