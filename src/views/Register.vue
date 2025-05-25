<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow-lg" style="width: 25rem;">
      <div class="card-body p-5">
        <h1 class="card-title text-center mb-4">Регистрация</h1>

        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label for="username" class="form-label">Имя пользователя</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              :disabled="authStore.isLoading"
              class="form-control"
              placeholder="Введите имя пользователя"
              minlength="3"
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Пароль</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              :disabled="authStore.isLoading"
              class="form-control"
              placeholder="Введите пароль"
              minlength="6"
            />
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Подтвердите пароль</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              :disabled="authStore.isLoading"
              class="form-control"
              placeholder="Подтвердите пароль"
              minlength="6"
            />
          </div>

          <div v-if="validationError" class="alert alert-warning mt-3" role="alert">
            {{ validationError }}
          </div>

          <div v-if="authStore.error" class="alert alert-danger mt-3" role="alert">
            {{ authStore.error }}
          </div>

          <button
            type="submit"
            :disabled="authStore.isLoading || !!validationError"
            class="btn btn-primary w-100 mt-3"
          >
            <span v-if="authStore.isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ authStore.isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
          </button>
        </form>

        <div class="text-center mt-4">
          <p>Уже есть аккаунт? <router-link to="/login" class="text-decoration-none">Войти</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const validationError = computed(() => {
  if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
    return 'Пароли не совпадают'
  }
  if (form.username && form.username.length < 3) {
    return 'Имя пользователя должно содержать минимум 3 символа'
  }
  if (form.password && form.password.length < 6) {
    return 'Пароль должен содержать минимум 6 символов'
  }
  return null
})

const handleRegister = async () => {
  if (validationError.value) return
  
  const result = await authStore.register(form.username, form.password)
  if (result.success) {
    router.push('/')
  }
}
</script>

<style scoped>
/* Можно удалить специфичные стили, если Bootstrap их перекрывает или делает ненужными */
.min-vh-100 {
  min-height: 100vh;
}
</style>