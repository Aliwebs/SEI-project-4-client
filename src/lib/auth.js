import axios from 'axios'

export function getToken() {
  return window.localStorage.getItem('token')
}

export function getPayload() {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  return JSON.parse(atob(parts[1]))
}

export function getUserId() {
  return getPayload().sub
}

export function getUsername() {
  return getPayload().user
}

export function isAuthenticated() {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}

export function isOwner(userId) {
  const payload = getPayload()
  if (!payload) return false
  return userId === payload.sub
}


// Login and register
export function login(formdata) {
  return axios.post('/api/auth/login/', formdata)
}

export function register(formdata) {
  return axios.post('/api/auth/register/', formdata)
}