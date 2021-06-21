/* eslint-disable eqeqeq */
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
  return axios.get(`${URL}/auth/profile/${profileId}/`)
}

export function editUser(profileId, formdata) {
  const formattedFormData = {
    ...formdata,
    dps1: formdata.dps1 && formdata.dps1.id,
    dps2: formdata.dps2 && formdata.dps2.id,
    dps3: formdata.dps3 && formdata.dps3.id,
    tank1: formdata.tank1 && formdata.tank1.id,
    tank2: formdata.tank2 && formdata.tank2.id,
    tank3: formdata.tank3 && formdata.tank3.id,
    support1: formdata.support1 && formdata.support1.id,
    support2: formdata.support2 && formdata.support2.id,
    support3: formdata.support3 && formdata.support3.id,
  }
  return axios.put(`${URL}/auth/profile/${profileId}/`, formattedFormData, headers())
}

export function getTeams() {
  return axios.get(`${URL}/teams/`)
}

export function getSingleTeam(teamId) {
  return axios.get(`${URL}/teams/${teamId}/`)
}

export function getHeroes() {
  return axios.get(`${URL}/heroes/`)
}

export function removePlayerFromTeam(teamId, playerId, formdata) {
  const editedFormData = {
    ...formdata,
  }
  if (formdata.dps1 && formdata.dps1.id == playerId) {
    editedFormData.dps1 = null
  } else if (formdata.dps2 && formdata.dps2.id == playerId) {
    editedFormData.dps2 = null
  } else if (formdata.tank1 && formdata.tank1.id == playerId) {
    editedFormData.tank1 = null
  } else if (formdata.tank2 && formdata.tank2.id == playerId) {
    editedFormData.tank2 = null
  } else if (formdata.support1 && formdata.support1.id == playerId) {
    editedFormData.support1 = null
  } else if (formdata.support2 && formdata.support2.id == playerId) {
    editedFormData.support2 = null
  }
  return editTeam(teamId, editedFormData)
}

export function editTeam(teamId, formdata, name, playerId) {
  const formattedFormData = {
    ...formdata,
    dps1: formdata.dps1 && formdata.dps1.id,
    dps2: formdata.dps2 && formdata.dps2.id,
    tank1: formdata.tank1 && formdata.tank1.id,
    tank2: formdata.tank2 && formdata.tank2.id,
    support1: formdata.support1 && formdata.support1.id,
    support2: formdata.support2 && formdata.support2.id,
  }
  const newFormData = {
    ...formattedFormData,
    [name]: playerId,
  }
  return axios.put(`${URL}/teams/${teamId}/`, newFormData, headers())
}

export function createTeam(formdata) {
  return axios.post(`${URL}/teams/`, formdata, headers())
}

export function deleteTeam(teamId) {
  return axios.delete(`${URL}/teams/${teamId}/`, headers())
}