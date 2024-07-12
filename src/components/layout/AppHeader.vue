<script setup>
import { RouterLink } from 'vue-router'
import { ShoppingCartIcon } from '@heroicons/vue/20/solid'
import useCartStore from '@/stores/cart'
import { onMounted, ref } from 'vue'
import axios from '@/utils/axios.js'

const cartStore = useCartStore()

const categories = ref([])
const loading = ref(true);

onMounted(() => {
  fetchData()
})

async function fetchData() {
  loading.value = true;
  await axios
    .get('https://dummyjson.com/products/categories')
    .then((res) => {
      const allowedCategories = ['beauty', 'fragrances', 'furniture', 'sports-accessories', 'furniture', 'groceries']
      categories.value = res.data.filter(category => allowedCategories.indexOf(category.slug) > -1)
    })
    .catch((err) => {
      console.log(err.responseText.toString())
    }).finally(() => {
      loading.value = false;
    })
}

</script>
<template>
  <header>
    <div v-if="loading"></div>
    <div v-else class="flex items-center py-5 px-8 bg-slate-100 border-b border-gray-200">
      <div>
        <RouterLink to="/" class="flex items-center">
          <img alt="Vue logo" class="w-10" src="@/assets/logo.svg" /> <span class="font-semibold">Vue Store</span>
        </RouterLink>
      </div>
      <nav class="grow flex items-center justify-center gap-x-6">
        <RouterLink to="/" class="font-semibold" active-class="text-green-600">
          <span>Home</span>
        </RouterLink>
        <template v-if="categories">
          <RouterLink v-for="{name, slug} in categories" :key="slug" :to="`/${slug}`" class="font-semibold" active-class="text-green-600">
            <span>{{ name }}</span>
          </RouterLink>
        </template>
      </nav>
      <div>
        <RouterLink to="/cart" active-class="text-green-600">
          <p class="flex items-center space-x-1">
            <ShoppingCartIcon class="w-5" />
            <span>{{ cartStore.cart.length }}</span>
          </p>
        </RouterLink>
      </div>
    </div>
  </header>
</template>
