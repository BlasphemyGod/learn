<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow-lg" style="width: 25rem;">
      <div class="card-body p-5">
        <h1 class="card-title text-center mb-4">Вход</h1>

        <form @submit.prevent="handleLogin">
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
            />
          </div>

          <div v-if="authStore.error" class="alert alert-danger mt-3" role="alert">
            {{ authStore.error }}
          </div>

          <button
            type="submit"
            :disabled="authStore.isLoading"
            class="btn btn-primary w-100 mt-3"
          >
            <span v-if="authStore.isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ authStore.isLoading ? 'Вход...' : 'Войти' }}
          </button>
        </form>

        <div class="text-center mt-4">
          <p>Нет аккаунта? <router-link to="/register" class="text-decoration-none">Зарегистрироваться</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  const result = await authStore.login(form.username, form.password)
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