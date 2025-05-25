import axios from 'axios'
import { API_BASE_URL } from '../consts'

export async function getPosts() {
    const response = (await axios.get(`${API_BASE_URL}/posts`))
    return response.data
}

export async function addPost(title, text) {
    await axios.post(`${API_BASE_URL}/posts`, {"title": title, "text": text})
}

export async function deletePost(id) {
    await axios.delete(`${API_BASE_URL}/posts/${id}`)
}

export async function editPost(id, title, text) {
    await axios.put(`${API_BASE_URL}/posts/${id}`, {"title": title, "text": text})
}