<template>
  <Disclosure
    v-slot="{ open }"
    as="nav"
    class="border-b border-sky-400 border-opacity-25 bg-surface-ground lg:border-none"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
      <div class="relative flex h-20 items-center justify-between lg:border-b lg:border-sky-400 lg:border-opacity-25">
        <div class="flex items-center px-2 lg:px-0">
          <div class="shrink-0">
            <h1
              class="text-2xl font-bold text-sky-500"
            >
              Radio<span class="text-white">Switch</span>
            </h1>
          </div>
          <div class="hidden lg:ml-10 lg:block">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                class="rounded-md px-3 py-2 font-medium"
                :class="[item.current ? 'bg-sky-600 text-white' : 'text-white hover:text-sky-500']"
                :aria-current="item.current ? 'page' : undefined"
              >{{ item.name }}</a>
            </div>
          </div>
        </div>
        <!-- Mobile menu button -->
        <div class="flex lg:hidden">
          <DisclosureButton class="relative inline-flex items-center justify-center rounded-md bg-sky-600 p-2 text-sky-200 hover:bg-sky-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-600">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon
              v-if="!open"
              class="block size-6"
              aria-hidden="true"
            />
            <XMarkIcon
              v-else
              class="block size-6"
              aria-hidden="true"
            />
          </DisclosureButton>
        </div>
        <!-- lg:ml-4 lg:block" -->
        <div class="hidden">
          <div class="flex items-center">
            <!-- Profile dropdown -->
            <Menu
              as="div"
              class="relative ml-3 shrink-0"
            >
              <div>
                <MenuButton class="relative flex rounded-full bg-sky-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-600">
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="size-8 rounded-full"
                    :src="user.imageUrl"
                    alt=""
                  >
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <a
                      :href="item.href"
                      class="block px-4 py-2 text-sm text-gray-700"
                      :class="[active ? 'bg-gray-100' : '']"
                    >{{ item.name }}</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="lg:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          class="block rounded-md px-3 py-2 text-base font-medium"
          :class="[item.current ? 'bg-sky-700 text-white' : 'text-white hover:bg-sky-500 hover:bg-opacity-75']"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </DisclosureButton>
      </div>
      <div class="border-t border-sky-700 pb-3 pt-4">
        <div class="flex items-center px-5">
          <div class="shrink-0">
            <img
              class="size-10 rounded-full"
              :src="user.imageUrl"
              alt=""
            >
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">
              {{ user.name }}
            </div>
            <div class="text-sm font-medium text-sky-300">
              {{ user.email }}
            </div>
          </div>
          <button
            type="button"
            class="relative ml-auto shrink-0 rounded-full bg-sky-600 p-1 text-sky-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-600"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon
              class="size-6"
              aria-hidden="true"
            />
          </button>
        </div>
        <div class="mt-3 space-y-1 px-2">
          <DisclosureButton
            v-for="item in userNavigation"
            :key="item.name"
            as="a"
            :href="item.href"
            class="text-whie block rounded-md px-3 py-2 text-base font-medium hover:bg-sky-500 hover:bg-opacity-75"
          >
            {{ item.name }}
          </DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

defineProps<{
  navigation?: [{
    name: string
    href: string
    current: boolean
  }]
}>()
const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
</script>
