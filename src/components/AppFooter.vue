<template>
  <footer class="app-footer" :class="{ 'reveal-footer': revealed }">
    <div class="footer-links">
      <a 
        v-for="(link, index) in footerStore.links" 
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <i :class="['mdi', link.icon]"></i>
        <span>{{ link.title }}</span>
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useFooterStore } from '@/stores/footer';
import { useRevealEffect } from '@/utils/animations';

const footerStore = useFooterStore();
const revealed = useRevealEffect();
</script>

<style scoped>
.app-footer {
  background: #f8f9fa;
  border-top: 1px solid #eaeaea;
  padding: 0.75rem;
  font-size: 0.9rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal-footer {
  opacity: 1;
  transform: translateY(0);
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease;
  opacity: 0;
  animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.footer-link:hover {
  color: #2196F3;
}

.footer-link i {
  font-size: 1.1rem;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .app-footer {
    padding: 0.5rem;
  }
  
  .footer-links {
    gap: 1rem;
  }
  
  .footer-link {
    font-size: 0.8rem;
  }
}

@media print {
  .app-footer {
    display: none !important;
  }
}
</style> 