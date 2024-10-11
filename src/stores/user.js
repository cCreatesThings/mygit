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
    // 清除用户信息
    const clearProfile = () => {
      profile.value = {}
    }
    return { profile, setProfile, token, clearProfile }
  },
  {
    persist: true
  }
)
