import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(
    useLocalStorage('radioswitch-user', {
      name: null,
      email: null,
      token: null,
      role: null,
      avatar: null,
    }),
  )

  const clearStore = () => {
    localStorage.removeItem('radioswitch-user')
    localStorage.removeItem('fitleads-membership-type')
  }

  return {
    user,
    clearStore,

  }
})
