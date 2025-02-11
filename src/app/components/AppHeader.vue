<template>
  <nav
    class="border-b border-sky-400/25 bg-surface-ground lg:border-none"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
      <div class="relative flex h-20 items-center justify-between lg:border-b lg:border-sky-400/25">
        <div class="flex w-full items-center px-2 lg:px-0">
          <div class="shrink-0">
            <h1
              class="text-2xl font-bold text-sky-500"
              @click="router.push('/')"
            >
              Radio<span class="text-white">Switch</span>
            </h1>
          </div>

          <div class="lg:ml-10">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                class="rounded-md px-3 py-2 font-medium"
                :class="[item.current ? 'bg-sky-600 text-white' : 'text-white hover:text-sky-500']"
                :aria-current="item.current ? 'page' : undefined"
              >
                {{ item.name }}
              </a>
            </div>
          </div>

          <div class="ml-auto">
            <GoogleSignInButton v-if="!user.name" />

            <div class="flex items-center">
              <img
                v-if="user.avatar"
                class="size-10 cursor-pointer rounded-full"
                :src="user.avatar"
                alt="user-avater"
                @click="toggleMenu"
              >
              <Menu
                id="overlay_menu"
                ref="profileMenu"
                class="mt-2"
                :model="items"
                :popup="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
defineProps<{
  navigation?: {
    name: string
    href: string
    current: boolean
  }[]
}>()

const { user } = storeToRefs(useUserStore())

const router = useRouter()

const profileMenu = ref()
const items = ref([
  {
    label: 'Profile',
    icon: 'pi pi-user',
    command: () => {
      router.push('/profile')
    },
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => {
      user.value = null
    },
  },
])

function toggleMenu(event: MouseEvent) {
  profileMenu.value.toggle(event)
}
</script>
