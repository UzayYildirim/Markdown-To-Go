import { ref, onMounted } from 'vue'

export function useRevealEffect() {
  const revealed = ref(false)

  onMounted(() => {
    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
      revealed.value = true
    }, 100)
  })

  return revealed
} 