import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '../consts'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const isLoading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  const login = async (username, password) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await axios.get(`${API_BASE_URL}/users?username=${username}&password=${password}`)
      
      if (response.data.length > 0) {
        const userData = response.data[0]
        user.value = userData
        token.value = `token_${userData.id}_${Date.now()}`
        localStorage.setItem('token', token.value)
        localStorage.setItem('user', JSON.stringify(userData))
        return { success: true }
      } else {
        error.value = 'Неверные учетные данные'
        return { success: false, error: error.value }
      }
    } catch (err) {
      error.value = 'Ошибка подключения к серверу'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (username, password) => {
    isLoading.value = true
    error.value = null
    
    try {
      const existingUser = await axios.get(`${API_BASE_URL}/users?username=${username}`)
      if (existingUser.data.length > 0) {
        error.value = 'Пользователь с таким именем уже существует'
        return { success: false, error: error.value }
      }

      const newUser = {
        username,
        password
      }
      
      const response = await axios.post(`${API_BASE_URL}/users`, newUser)
      user.value = response.data
      token.value = `token_${response.data.id}_${Date.now()}`
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(response.data))
      
      return { success: true }
    } catch (err) {
      error.value = 'Ошибка при регистрации'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const initAuth = () => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    initAuth
  }
})