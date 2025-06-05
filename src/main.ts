import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Global error handling
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue error:', err, info)
  // In production, you might want to send this to an error reporting service
}

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  event.preventDefault()
})

app.use(createPinia())
app.use(router)

app.mount('#app')
