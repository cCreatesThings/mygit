import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const profile = ref({})

    const setProfile = (data) => {
      profile.value = data
    }
    const token = computed(() => profile.value.access_token)

    return { profile, setProfile, token }
  },
  {
    persist: true
  }
)
