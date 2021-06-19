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

export function registerUser(formdata) {
  return axios.post(`${URL}/auth/register/`, formdata)
}

export function getSingleUser(profileId) {
  return axios.get(`${URL}/auth/profile/${profileId}`)
}

export function editUser(profileId, formdata) {
  const formattedFormData = {
    ...formdata,
    dps1: formdata.dps1.id,
    dps2: formdata.dps2.id,
    dps3: formdata.dps3.id,
    tank1: formdata.tank1.id,
    tank2: formdata.tank2.id,
    tank3: formdata.tank3.id,
    support1: formdata.support1.id,
    support2: formdata.support2.id,
    support3: formdata.support3.id,
  }
  return axios.put(`${URL}/auth/profile/${profileId}/`, formattedFormData, headers())
}