<template>
  <Transition name="cookie">
    <div v-if="showNotice" class="cookie-notice" :class="{ 'reveal': revealed }">
      <div class="cookie-content">
        <i class="mdi mdi-cookie"></i>
        <span>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</span>
      </div>
      <button @click="acceptCookies" class="cookie-accept">
        Okay
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRevealEffect } from '@/utils/animations'

const showNotice = ref(false)
const revealed = useRevealEffect()

const acceptCookies = () => {
  localStorage.setItem('cookiesAccepted', 'true')
  showNotice.value = false
}

onMounted(() => {
  const cookiesAccepted = localStorage.getItem('cookiesAccepted')
  if (!cookiesAccepted) {
    showNotice.value = true
  }
})
</script>

<style scoped>
.cookie-notice {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #323232;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1000;
  max-width: 90vw;
  opacity: 0;
  transform: translate(-50%, 20px);
  transition: all 0.3s ease;
}

.cookie-notice.reveal {
  opacity: 1;
  transform: translate(-50%, 0);
}

.cookie-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
}

.cookie-content i {
  font-size: 1.4rem;
  color: #a1c027;
}

.cookie-accept {
  padding: 0.5rem 1.5rem;
  background: #a1c027;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.cookie-accept:hover {
  background: #8ca522;
}

.cookie-enter-active,
.cookie-leave-active {
  transition: all 0.3s ease;
}

.cookie-enter-from,
.cookie-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

@media (max-width: 768px) {
  .cookie-notice {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    bottom: 1rem;
  }
  
  .cookie-content {
    text-align: center;
  }
}
</style> 