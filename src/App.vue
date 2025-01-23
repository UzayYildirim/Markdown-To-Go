<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useContentStore } from './stores/content'
import AppFooter from './components/AppFooter.vue'
import AppMenu from './components/AppMenu.vue'
import CookieNotice from './components/CookieNotice.vue'
import { useRevealEffect } from './utils/animations'
import { usePreventClose } from './composables/usePreventClose'
import { watch } from 'vue'

const store = useContentStore()
const revealed = useRevealEffect()
usePreventClose()

// Debug: Monitor revealed state
watch(revealed, (newValue) => {
  console.log('Revealed state changed:', newValue)
})
</script>

<template>
  <div class="app-container">
    <nav class="navbar" :class="{ 'reveal': revealed }">
      <div class="app-title-container">
        <router-link to="/" class="logo-link">
          <img 
            src="/Markdown2Go.svg" 
            alt="Markdown To Go Logo" 
            class="app-logo"
            :class="{ 'reveal': revealed }"
          >
          <h1 class="app-title" :class="{ 'reveal': revealed }">Markdown To Go</h1>
        </router-link>
      </div>
      <div class="nav-controls">
        <button 
          @click="store.printDocument"
          class="print-button"
          :class="{ 
            'reveal': revealed,
            'disabled': !store.hasContent 
          }"
          :disabled="!store.hasContent"
        >
          <i class="mdi mdi-printer"></i>
          <span class="button-text" :class="{ 'reveal': revealed }">Print</span>
        </button>
        <AppMenu />
      </div>
    </nav>
    <div v-if="store.error" class="error-message">
      {{ store.error }}
    </div>
    <RouterView />
    
    <AppFooter />
    <CookieNotice />
    
    <Transition name="toast">
      <div v-if="store.showToast" class="toast-message">
        <div class="toast-content">
          <i class="mdi mdi-information-outline toast-icon"></i>
          <span>You can choose "Save as PDF" option to save as a PDF</span>
        </div>
        <button 
          class="toast-close" 
          @click="store.showToast = false"
          title="Dismiss"
        >
          <i class="mdi mdi-close"></i>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style>
@import '@mdi/font/css/materialdesignicons.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.router-view-container {
  flex: 1;
}

.navbar {
  background: linear-gradient(to right, #2196F3, #a1c027);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

.navbar.reveal {
  opacity: 1;
  transform: translateY(0);
}

.app-title-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
}

.app-logo {
  width: 2rem;
  height: 2rem;
  opacity: 0;
  transform: scale(0.8) rotate(-10deg);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, opacity;
}

.app-logo.reveal {
  opacity: 1;
  transform: scale(1) rotate(0deg);
  transition-delay: 0.2s;
}

.app-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, opacity;
  position: relative;
}

.app-title.reveal {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.4s;
}

.app-title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: white;
  transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: width;
}

.app-title.reveal::after {
  width: 100%;
  transition-delay: 0.8s;
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.print-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  background-color: white;
  color: #2c3e50;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, opacity;
}

.print-button.reveal {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.6s;
}

.print-button i {
  font-size: 1.3rem;
  transition: transform 0.3s ease;
}

.print-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  background-color: #f8f9fa;
}

.print-button:hover i {
  transform: scale(1.1);
}

.button-text {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, opacity;
}

.button-text.reveal {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.8s;
}

.error-message {
  background-color: #ff5252;
  color: white;
  padding: 0.75rem 1rem;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Tooltip styles */
[title] {
  position: relative;
  font-family: 'Montserrat', sans-serif;
}

[title]:hover::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 0.75rem;
  background: rgba(0,0,0,0.8);
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  z-index: 1000;
  margin-bottom: 5px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }

  .app-title {
    font-size: 1.2rem;
  }

  .app-logo {
    width: 1.5rem;
    height: 1.5rem;
  }

  .print-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .print-button i {
    font-size: 1.1rem;
  }
}

/* Update the editor container to account for sticky header */
.editor-container {
  height: calc(100vh - 4rem);
  margin-top: 0;
  padding-top: 1rem;
}

.toast-message {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #323232;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1100;
  font-family: 'Montserrat', sans-serif;
  max-width: 90vw;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.toast-icon {
  font-size: 1.4rem;
  color: #a1c027;
}

.toast-close {
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.toast-close:hover {
  background: rgba(255,255,255,0.1);
  color: white;
  transform: none;
}

/* Toast Animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, 1rem);
}

.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 1rem);
}

/* Responsive adjustments for toast */
@media (max-width: 768px) {
  .toast-message {
    bottom: 1rem;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
  
  .toast-icon {
    font-size: 1.2rem;
  }
}

@media print {
  .toast-message {
    display: none !important;
  }
  
  /* Add this to ensure footer is hidden */
  .app-footer {
    display: none !important;
  }
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
}

.logo-link:hover {
  background: none !important;
}

.print-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.print-button.disabled:hover {
  background: transparent;
}
</style>
