<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useContentStore } from './stores/content'
import AppFooter from './components/AppFooter.vue'
import AppMenu from './components/AppMenu.vue'
import CookieNotice from './components/CookieNotice.vue'
import { useRevealEffect } from './utils/animations'
import { usePreventClose } from './composables/usePreventClose'
import { watch, computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const store = useContentStore()
const revealed = useRevealEffect()
const route = useRoute()
const fileInputRef = ref<HTMLInputElement>()

// Only show export buttons on home route
const showExportButtons = computed(() => route.name === 'home')

usePreventClose()

// Import functionality
const triggerFileImport = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

const handleFileImport = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  if (!store.validateFileType(file)) {
    store.error = 'Please select a valid file type (MD, TXT, HTML)'
    return
  }
  
  store.importFile(file, () => {
    // Reset the file input so the same file can be imported again
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
  })
}

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
        <!-- Import and Export buttons group - only visible on home route -->
        <div v-if="showExportButtons" class="export-controls" :class="{ 'reveal': revealed }">
          <!-- Import button -->
          <button 
            @click="triggerFileImport"
            class="export-btn import"
            data-tooltip="Import File (MD, TXT, HTML)"
          >
            <i class="mdi mdi-file-import"></i>
            <span class="btn-text" :class="{ 'reveal': revealed }">Import</span>
          </button>

          <!-- Print button -->
          <button 
            @click="store.printDocument"
            class="export-btn primary"
            :disabled="!store.hasContent"
            data-tooltip="Print document"
          >
            <i class="mdi mdi-printer"></i>
            <span class="btn-text" :class="{ 'reveal': revealed }">Print</span>
          </button>

          <!-- Export group -->
          <div class="export-group">
            <button 
              @click="store.exportHtml"
              class="export-btn secondary"
              :disabled="!store.hasContent"
              data-tooltip="Export as HTML"
            >
              <i class="mdi mdi-language-html5"></i>
              <span class="btn-text" :class="{ 'reveal': revealed }">HTML</span>
            </button>

            <button 
              @click="store.exportMarkdown"
              class="export-btn secondary"
              :disabled="!store.hasContent"
              data-tooltip="Export as Markdown"
            >
              <i class="mdi mdi-language-markdown"></i>
              <span class="btn-text" :class="{ 'reveal': revealed }">MD</span>
            </button>

            <button 
              @click="store.exportTxt"
              class="export-btn secondary"
              :disabled="!store.hasContent"
              data-tooltip="Export as Text"
            >
              <i class="mdi mdi-file-document-outline"></i>
              <span class="btn-text" :class="{ 'reveal': revealed }">TXT</span>
            </button>
          </div>

          <!-- Hidden file input for import -->
          <input 
            type="file" 
            ref="fileInputRef" 
            @change="handleFileImport" 
            accept=".md,.txt,.html,.htm" 
            style="display: none;"
          >
        </div>
        
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
          data-tooltip="Dismiss"
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

/* New modern export controls */
.export-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.export-controls.reveal {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.6s;
}

.export-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.25rem;
  backdrop-filter: blur(10px);
}

/* Modern export button styles */
.export-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.02em;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.export-btn.import {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border: 2px solid rgba(255,255,255,0.3);
}

.export-btn.primary {
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  color: #2c3e50;
  border: 2px solid rgba(255,255,255,0.4);
}

.export-btn.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255,255,255,0.3);
}

.export-btn i {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.export-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.25);
}

.export-btn.import:hover {
  background: linear-gradient(135deg, #45a049, #3d8b40);
  transform: translateY(-3px) scale(1.02);
}

.export-btn.primary:hover {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  box-shadow: 0 8px 25px rgba(0,0,0,0.25);
  transform: translateY(-3px) scale(1.02);
}

.export-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  transform: translateY(-3px) scale(1.02);
}

.export-btn:hover i {
  transform: scale(1.1);
}

.export-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.export-btn:disabled:hover {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: none;
}

.btn-text {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, opacity;
}

.btn-text.reveal {
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

/* Enhanced tooltip styles with proper positioning */
[data-tooltip] {
  position: relative;
  font-family: 'Montserrat', sans-serif;
}

[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 0.75rem;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  animation: tooltipFadeIn 0.2s ease-out forwards;
}

[data-tooltip]:hover::before {
  content: '';
  position: absolute;
  bottom: calc(100% + 2px);
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  opacity: 0;
  animation: tooltipFadeIn 0.2s ease-out forwards;
}

/* Tooltip positioning for right-aligned elements */
.nav-controls [data-tooltip]:hover::after {
  left: auto;
  right: 0;
  transform: none;
}

.nav-controls [data-tooltip]:hover::before {
  left: auto;
  right: 1rem;
  transform: none;
}

@keyframes tooltipFadeIn {
  to {
    opacity: 1;
  }
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

  .export-controls {
    display: none !important;
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
</style>
