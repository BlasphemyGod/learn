<template>
  <div class="app-layout d-flex flex-column min-vh-100">
    <!-- Навигационная панель -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">Госы</router-link>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <template v-if="authStore.isAuthenticated">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Главная</router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {{ authStore.user?.username }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownUser">
                  <li><button @click="handleLogout" class="dropdown-item btn btn-link text-danger">Выйти</button></li>
                </ul>
              </li>
            </template>
            
            <template v-else>
              <li class="nav-item">
                <router-link to="/login" class="nav-link">Войти</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/register" class="nav-link">Регистрация</router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Основной контент -->
    <main class="main-content container flex-grow-1 py-4">
      <slot />
    </main>

    <!-- Футер -->
    <footer class="footer mt-auto py-3 bg-light border-top">
      <div class="container text-center">
        <p class="mb-0">&copy; 2025 Госы Практика. Я хочу жить</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
/* Можно удалить специфичные стили, если Bootstrap их перекрывает или делает ненужными */
/* Например, если классы .nav-link, .logout-btn и т.д. больше не нужны */
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
}
</style>