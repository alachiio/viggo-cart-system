<script setup>
import axios from '@/utils/axios'
import { onMounted, ref, watch } from 'vue'
import ProductCard from '@/components/Products/ProductCard.vue'

const products = ref(null)
const loading = ref(true)
const error = ref(null)

const props = defineProps({
  category: {
    type: String,
    required: false,
  },
})

onMounted(() => {
  fetchData()
})

watch(() => props.category, fetchData, { immediate: true })

async function fetchData() {
  error.value = products.value = null
  loading.value = true
  let url = 'https://dummyjson.com/products'
  if(props.category) {
    url += `/category/${props.category}`;
  }
  await axios
    .get(url)
    .then((res) => {
      products.value = res.data.products
    })
    .catch((err) => {
      error.value = err.responseText.toString()
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div>
    <div class="h-[calc(100vh-200px)] flex flex-col bg-white" v-if="loading">
      <div class="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div class="flex justify-center">
          <div
            class="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
    >
      <ProductCard v-for="product in products" :product="product" :key="product.id" />
    </div>
  </div>
</template>
