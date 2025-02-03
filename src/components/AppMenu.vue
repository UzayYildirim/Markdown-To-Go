<template>
  <div class="menu-container">
    <button class="menu-button" @click="toggleMenu" title="Menu">
      <i class="mdi mdi-menu"></i>
    </button>

    <Transition name="menu">
      <div v-if="isOpen" class="menu" @click.self="closeMenu">
        <div class="menu-content">
          <!-- Add mobile-only buttons at the top of menu -->
          <div class="mobile-only-buttons">
            <button 
              @click="store.printDocument"
              class="menu-button-mobile"
              :disabled="!store.hasContent"
            >
              <i class="mdi mdi-printer"></i>
              <span>Print Document</span>
            </button>
            
            <button 
              @click="store.exportHtml"
              class="menu-button-mobile"
              :disabled="!store.hasContent"
            >
              <i class="mdi mdi-language-html5"></i>
              <span>Export as HTML</span>
            </button>

            <button 
              @click="store.exportMarkdown"
              class="menu-button-mobile"
              :disabled="!store.hasContent"
            >
              <i class="mdi mdi-language-markdown"></i>
              <span>Export as Markdown</span>
            </button>

            <button 
              @click="store.exportTxt"
              class="menu-button-mobile"
              :disabled="!store.hasContent"
            >
              <i class="mdi mdi-file-document-outline"></i>
              <span>Export as Text</span>
            </button>
            
            <div class="menu-divider"></div>
          </div>

          <!-- Existing menu items -->
          <router-link to="/about" class="menu-item" @click="closeMenu">
            <i class="mdi mdi-information"></i>
            <span>About</span>
          </router-link>
          
          <router-link to="/privacy" class="menu-item" @click="closeMenu">
            <i class="mdi mdi-shield-check"></i>
            <span>Privacy Policy</span>
          </router-link>
          
          <router-link to="/terms" class="menu-item" @click="closeMenu">
            <i class="mdi mdi-file-document"></i>
            <span>Terms of Service</span>
          </router-link>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useContentStore } from '@/stores/content'
import { useRouter } from 'vue-router'

const isOpen = ref(false)
const store = useContentStore()
const router = useRouter()

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
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

/* Mobile-only buttons styles */
.mobile-only-buttons {
  display: none;
}

.menu-divider {
  height: 1px;
  background: #e0e0e0;
  margin: 0.5rem 0;
}

@media (max-width: 768px) {
  .mobile-only-buttons {
    display: block !important;
  }

  .menu-button-mobile {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    color: #333;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .menu-button-mobile:hover {
    background: #f5f5f5;
  }

  .menu-button-mobile:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-button-mobile i {
    font-size: 1.2rem;
  }

  .menu {
    min-width: 250px;
  }
}
</style> 