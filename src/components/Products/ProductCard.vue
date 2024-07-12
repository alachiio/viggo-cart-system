<script setup>
import useCartStore from '@/stores/cart'
import { priceAfterDiscount } from '@/utils/helpers'
import { ShoppingCartIcon, EyeIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

const props = defineProps({
  product: {}
})

const loading = ref(false)
const toast = useToast()

const cartStore = useCartStore()

const addToCart = () => {
  loading.value = true
  setTimeout(() => {
    cartStore.add(props.product)
    loading.value = false
    toast.success('Cart has been updated successfully')
  }, 1000)
}
</script>
<template>
  <div class="group relative">
    <div
      class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-80 lg:h-80 relative"
    >
      <div
        class="absolute w-full h-full opacity-0 transition-opacity ease-in-out flex group-hover:opacity-100 justify-center items-center gap-x-4"
      >
        <button class="bg-green-400 text-white p-2 rounded" @click="addToCart">
          <div
            class="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent text-white rounded-full"
            role="status"
            aria-label="loading"
            v-if="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <ShoppingCartIcon v-else class="w-6" />
        </button>
        <RouterLink :to="`/${product.category}/${product.id}`" class="bg-green-400 text-white p-2 rounded">
          <EyeIcon class="w-6" />
        </RouterLink>
      </div>
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-gray-700 font-semibold text-sm">
          <RouterLink :to="`/${product.category}/${product.id}`">
            {{ product.title }}
          </RouterLink>
        </h3>
        <p class="mt-1 text-sm text-gray-500">{{ product.category }}</p>
      </div>
      <p class="text-sm font-medium text-gray-900 inline-flex space-x-2">
        <span class="line-through opacity-50">${{ product.price }}</span>
        <span>${{ priceAfterDiscount(product) }} </span>
      </p>
    </div>
  </div>
</template>
