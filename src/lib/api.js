import axios from 'axios'

import { getToken, getUserId } from './auth'
import { baseUrl } from '../config'

function getHeaders() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

export function getProfile(id) {
  if (!id) id = getUserId()
  return axios.get(`${baseUrl}/auth/profile/${id}/`, getHeaders())
}

export function getAllPosts() {
  return axios.get(`${baseUrl}/posts/`, getHeaders())
}

export function getPosts(id) {
  if (!id) id = getUserId()
  return axios.get(`${baseUrl}/posts/by/${id}/`, getHeaders())
}

export function postPost(formdata) {
  return axios.post(`${baseUrl}/posts/`, formdata, getHeaders())
}

export function deletePost(id) {
  return axios.delete(`${baseUrl}/posts/${id}/`, getHeaders())
}

export function toggleLikePost(id, formdata) {
  return axios.post(`${baseUrl}/posts/${id}/`, formdata, getHeaders())
}

export function toggleFollowUser(formdata) {
  return axios.put(`${baseUrl}auth/profile/${getUserId()}/`, formdata, getHeaders())
}

export function followUser(id) {
  return axios.post(`${baseUrl}/auth/profile/${getUserId()}/${id}/`, null, getHeaders())
}

export function postComment(id, formdata) {
  return axios.post(`${baseUrl}/posts/${id}/comments/`, formdata, getHeaders())
}

export function deleteComment(id) {
  return axios.delete(`${baseUrl}/posts/comments/${id}/`, getHeaders())
}
