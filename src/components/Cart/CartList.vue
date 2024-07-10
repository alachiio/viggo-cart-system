<script setup>
import CartItem from '@/components/Cart/CartItem.vue'
import useCartStore from '@/stores/cart'
import { computed } from 'vue'

const cartStore = useCartStore()
const cart = computed(() => cartStore.cart)
</script>
<template>
  <ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
    <li v-for="(item, index) in cart" :key="item.product.id" class="flex py-6 sm:py-10">
      <CartItem :index="index" />
    </li>
  </ul>
</template>
