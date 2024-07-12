<script setup>
import CartList from '@/components/Cart/CartList.vue'
import CheckoutForm from '@/components/Cart/CheckoutForm.vue'
import useCartStore from '@/stores/cart'
import { ShoppingCartIcon, TrashIcon } from '@heroicons/vue/24/outline'

const cartStore = useCartStore()
</script>
<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <div v-if="cartStore.cart.length === 0" class="flex flex-col items-center justify-center h-48">
        <div class="flex items-center justify-center space-x-3">
          <ShoppingCartIcon class="w-10" />
          <h3>Your shopping cart is empty</h3>
        </div>
        <RouterLink
          to="/"
          class="mt-6 px-3 py-2 text-xl bg-green-600 text-white hover:bg-green-400 rounded shadow active:scale-95 transition-transform ease-in-out"
        >
          Click here to return to shopping
        </RouterLink>
      </div>
      <form v-else class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <div class="flex items-center mb-8 pt-5 lg:pt-0">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Shopping Cart
            </h1>
            <button
              class="ms-auto mt-1 text-white lg:ps-2 lg:pe-3 lg:py-2 ps-1 pe-2 py-1 rounded-lg shadow bg-red-500 flex items-center space-x-1"
              type="button"
              @click="cartStore.empty()"
            >
              <TrashIcon class="w-5" /> <span class="lg:text-medium text-sm"> Empty Cart</span>
            </button>
          </div>
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
          <CartList />
        </section>

        <!-- Order summary -->
        <CheckoutForm />
      </form>
    </div>
  </div>
</template>
