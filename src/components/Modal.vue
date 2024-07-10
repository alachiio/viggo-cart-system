<script setup>
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

defineProps({
  buttonText: '',
  title: ''
})

defineOptions({
  inheritAttrs: false
})

const open = ref(false)

const closeModal = () => {
  open.value = false
}
</script>
<template>
  <button @click="open = !open" type="button" :class="$attrs.class">
    {{ buttonText }}
  </button>
  <div
    v-show="open"
    class="fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-slate-900/75"
  >
    <div
      class="bg-white rounded-lg border shadow h-[calc(100vh-100px)] overflow-y-scroll"
      :class="$attrs.width"
    >
      <div class="modal-header relative">
        <h3 class="text-center my-4 text-green-600 text-2xl">{{ title }}</h3>
        <button type="button" @click="closeModal" class="absolute top-0 right-2">
          <XMarkIcon class="w-5" />
        </button>
      </div>
      <div class="p-10">
        <slot />
      </div>
    </div>
    <div></div>
  </div>
</template>
