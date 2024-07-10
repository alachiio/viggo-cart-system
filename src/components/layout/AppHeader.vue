<script setup>
import { RouterLink } from 'vue-router'
import { ShoppingCartIcon } from '@heroicons/vue/20/solid'
import useCartStore from '@/stores/cart'
const cartStore = useCartStore()
</script>
<template>
  <header class="flex items-center py-4 px-8">
    <div class="flex-1">
      <RouterLink to="/" class="flex items-center">
        <img alt="Vue logo" class="w-14" src="@/assets/logo.svg" /> <span>Vue Store</span>
      </RouterLink>
    </div>
    <nav class="grow flex items-center justify-end space-x-4">
      <RouterLink to="/" class="font-semibold" active-class="text-green-600"
        >Products Page</RouterLink
      >
      <RouterLink to="/cart" active-class="text-green-600">
        <p class="flex items-center space-x-1">
          <ShoppingCartIcon class="w-5" />
          <span>{{ cartStore.cart.length }}</span>
        </p>
      </RouterLink>
    </nav>
  </header>
</template>
