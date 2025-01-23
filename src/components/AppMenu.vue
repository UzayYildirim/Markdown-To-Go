<template>
  <div class="menu-container">
    <button class="menu-button" @click="isOpen = !isOpen" :aria-expanded="isOpen">
      <i class="mdi mdi-menu"></i>
    </button>
    
    <transition name="menu">
      <nav class="menu" v-if="isOpen" @click="isOpen = false">
        <div class="menu-content" @click.stop>
          <router-link to="/" class="menu-item">
            <i class="mdi mdi-home"></i>
            Home
          </router-link>
          <router-link to="/about" class="menu-item">
            <i class="mdi mdi-information"></i>
            About
          </router-link>
          <router-link to="/privacy" class="menu-item">
            <i class="mdi mdi-shield-check"></i>
            Privacy Policy
          </router-link>
          <router-link to="/terms" class="menu-item">
            <i class="mdi mdi-file-document"></i>
            Terms of Service
          </router-link>
        </div>
      </nav>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<style scoped>
.menu-container {
  position: relative;
}

.menu-button {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.menu-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 1000;
}

.menu-content {
  padding: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background: #f5f5f5;
}

.menu-item i {
  font-size: 1.2rem;
}

/* Menu Animation */
.menu-enter-active,
.menu-leave-active {
  transition: all 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style> 