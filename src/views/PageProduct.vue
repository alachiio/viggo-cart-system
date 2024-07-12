<script setup>
import { ref, watch } from 'vue'
import { MinusIcon, PlusIcon, StarIcon } from '@heroicons/vue/20/solid'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import useCartStore from '@/stores/cart'
import { useToast } from 'vue-toast-notification'
import { priceAfterDiscount } from '@/utils/helpers'

const route = useRoute()
const cartStore = useCartStore()
const toast = useToast()
const loading = ref(true)
const addToCartLoading = ref(false)
const product = ref(null)
const error = ref(null)
const count = ref(1)

watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData() {
  error.value = product.value = null
  loading.value = true
  await axios
    .get(`https://dummyjson.com/products/${route.params.id}`)
    .then((res) => {
      product.value = res.data
    })
    .catch((err) => {
      error.value = err.responseText.toString()
    })
    .finally(() => {
      loading.value = false
    })
}

const handleCount = (direction) => {
  if (direction === 'up') {
    count.value++
  } else if (direction === 'down' && count.value > 1) {
    count.value--
  }
}

const addToCart = () => {
  addToCartLoading.value = true
  setTimeout(() => {
    cartStore.add(product.value, count.value)
    addToCartLoading.value = false
    toast.success('Cart has been updated successfully')
  }, 1000)
}
</script>
<template>
  <main class="bg-white">
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

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="product" class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <!-- Image gallery -->
        <TabGroup as="div" class="flex flex-col-reverse">
          <!-- Image selector -->
          <div class="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
            <TabList class="grid grid-cols-4 gap-6">
              <Tab
                v-for="(image, index) in product.images"
                :key="index"
                class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                v-slot="{ selected }"
              >
                <span class="sr-only">{{ product.title }}</span>
                <span class="absolute inset-0 overflow-hidden rounded-md">
                  <img
                    :src="image"
                    :alt="product.title"
                    class="h-full w-full object-cover object-center"
                  />
                </span>
                <span
                  :class="[
                    selected ? 'ring-indigo-500' : 'ring-transparent',
                    'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                  ]"
                  aria-hidden="true"
                />
              </Tab>
            </TabList>
          </div>

          <TabPanels class="aspect-h-1 aspect-w-1 w-full">
            <TabPanel v-for="(image, index) in product.images" :key="index">
              <img :src="image" :alt="product.title" class="h-96 sm:rounded-lg" />
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <!-- Product info -->
        <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">
            {{ `${product.title} - ${product.sku}` }}
          </h1>
          <h2 class="text-sm font-medium text-gray-600">Category: {{ product.category }}</h2>
          <div class="mt-3">
            <h2 class="sr-only">Product information</h2>
            <p class="text-3xl tracking-tight text-gray-900">
              <span class="line-through me-3 opacity-50">${{ product.price }}</span>
              <span>${{ priceAfterDiscount(product) }}</span>
              <span class="ms-5 text-red-500 text-xl" v-if="product.stock < 10">Last 5 items</span>
            </p>
          </div>

          <!-- Reviews -->
          <div class="mt-3">
            <h3 class="sr-only">Reviews</h3>
            <div class="flex items-center">
              <div class="flex items-center">
                <StarIcon
                  v-for="rating in [0, 1, 2, 3, 4]"
                  :key="rating"
                  :class="[
                    product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                    'h-5 w-5 flex-shrink-0'
                  ]"
                  aria-hidden="true"
                />
              </div>
              <p class="sr-only">{{ product.rating }} out of 5 stars</p>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="sr-only">Description</h3>

            <div class="space-y-6 text-base text-gray-700" v-html="product.description" />
          </div>

          <form class="mt-6" @submit.prevent="addToCart">
            <div
              class="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700"
            >
              <div class="flex items-center gap-x-1.5">
                <button
                  type="button"
                  class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  @click="handleCount('down')"
                  :disabled="count == 1"
                >
                  <MinusIcon class="w-4" />
                </button>
                <input
                  class="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
                  type="text"
                  v-model="count"
                />
                <button
                  type="button"
                  class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  @click="handleCount('up')"
                >
                  <PlusIcon class="w-4" />
                </button>
              </div>
            </div>

            <div class="mt-5 flex">
              <button
                type="submit"
                class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
              >
                <div
                  class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full me-2"
                  role="status"
                  aria-label="loading"
                  v-if="addToCartLoading"
                >
                  <span class="sr-only">Loading...</span>
                </div>
                Add to cart
              </button>
            </div>
          </form>

          <section aria-labelledby="details-heading" class="mt-12">
            <h2 id="details-heading">Additional details</h2>
            <div class="">
              <div class="prose prose-sm mt-4 text-gray-500 ms-5">
                <ul role="list" class="list-disc">
                  <li>{{ product.warrantyInformation }}</li>
                  <li>{{ product.shippingInformation }}</li>
                  <li>{{ product.availabilityStatus }}</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>
