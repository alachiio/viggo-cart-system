<script setup>
import useCartStore from '@/stores/cart'
import { priceAfterDiscount } from '@/utils/helpers'
import { CheckIcon, ClockIcon, MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const props = defineProps({
  index: null
})

const cartStore = useCartStore()

const { subTotal } = storeToRefs(cartStore)

const item = computed(() => cartStore.cart[props.index])
</script>
<template>
  <div class="flex-shrink-0">
    <img
      :src="item.product.thumbnail"
      :alt="item.product.title"
      class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
    />
  </div>

  <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
    <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
      <div>
        <div class="flex justify-between">
          <h3 class="text-sm">
            <RouterLink
              :to="`/${item.product.category}/${item.product.id}`"
              class="font-medium text-gray-700 hover:text-gray-800"
            >
              {{ item.product.title }}
            </RouterLink>
          </h3>
        </div>
        <div class="mt-1 flex text-sm">
          <p class="text-gray-500">{{ item.product.category }}</p>
        </div>
        <p class="mt-1 text-sm font-medium text-gray-900">
          Piece : ${{ priceAfterDiscount(item.product) }}
        </p>
        <p class="mt-1 text-sm font-medium text-gray-900">
          Total : ${{ parseFloat(subTotal(index)).toFixed(2) }}
        </p>
      </div>

      <div class="mt-4 sm:mt-0 sm:pr-9">
        <div
          class="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700"
        >
          <div class="flex items-center gap-x-1.5">
            <button
              type="button"
              class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              @click="cartStore.updateCount(index, 'down')"
            >
              <MinusIcon class="w-4" />
            </button>
            <input
              class="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
              type="text"
              v-model="item.count"
            />
            <button
              type="button"
              class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              @click="cartStore.updateCount(index, 'up')"
            >
              <PlusIcon class="w-4" />
            </button>
          </div>
        </div>
        <div class="absolute right-0 top-0">
          <button
            type="button"
            class="-m-2 inline-flex p-2 text-gray-400 hover:text-red-500"
            @click="cartStore.remove(index)"
          >
            <span class="sr-only">Remove</span>
            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <div>
      <p class="flex space-x-2 text-sm text-gray-700">
        <CheckIcon class="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
        <span>{{ item.product.availabilityStatus }}</span>
      </p>
      <p class="mt-4 flex space-x-2 text-sm text-gray-700">
        <ClockIcon class="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
        <span>{{ item.product.shippingInformation }}</span>
      </p>
    </div>
  </div>
</template>
