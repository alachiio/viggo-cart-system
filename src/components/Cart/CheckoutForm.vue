<script setup>
import useCartStore from '@/stores/cart'
import { CreditCardIcon, QuestionMarkCircleIcon } from '@heroicons/vue/20/solid'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import Modal from '../Modal.vue'

const cartStore = useCartStore()
const { total, subTotal, tax } = storeToRefs(cartStore)
const discountCode = ref('')
const discountApplied = ref(false)

const applyDiscount = () => {
  cartStore.applyDiscount(discountCode.value)
  if (cartStore.discountCode) discountApplied.value = true
}

const clearDiscount = () => {
  discountCode.value = ''
  cartStore.clearDiscount()
  discountApplied.value = false
}
</script>
<template>
  <section
    aria-labelledby="summary-heading"
    class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
  >
    <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

    <dl class="mt-6 space-y-4">
      <div class="flex items-center justify-between">
        <dt class="text-sm text-gray-600">Subtotal</dt>
        <dd class="text-sm font-medium text-gray-900">${{ parseFloat(subTotal()).toFixed(2) }}</dd>
      </div>
      <div class="flex items-center justify-between border-t border-gray-200 pt-4">
        <dt class="flex items-center text-sm text-gray-600">
          <span>Shipping estimate</span>
          <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
            <span class="sr-only">Learn more about how shipping is calculated</span>
            <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
          </a>
        </dt>
        <dd class="text-sm font-medium text-gray-900">$5.00</dd>
      </div>
      <div class="flex items-center justify-between border-t border-gray-200 pt-4">
        <dt class="flex text-sm text-gray-600">
          <span>Tax estimate</span>
          <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
            <span class="sr-only">Learn more about how tax is calculated</span>
            <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
          </a>
        </dt>
        <dd class="text-sm font-medium text-gray-900">${{ parseFloat(tax).toFixed(2) }}</dd>
      </div>
      <div class="my-3 flex items-center gap-x-3">
        <template v-if="!discountApplied">
          <input
            type="text"
            v-model="discountCode"
            placeholder="Discount Code ( Test: Write code VUESTORE2024 )"
            class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button
            type="button"
            class="text-white bg-green-600 hover:bg-green-700 px-2 py-1 rounded shadow active:scale-95"
            @click="applyDiscount"
          >
            Apply
          </button>
        </template>
        <template v-else>
          <p class="grow">
            {{ `${cartStore.discountCode.code} (-${cartStore.discountCode.percentage}%)` }}
          </p>
          <button
            type="button"
            class="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded shadow active:scale-95"
            @click="clearDiscount"
          >
            Remove
          </button>
        </template>
      </div>
      <div class="flex items-center justify-between border-t border-gray-200 pt-4">
        <dt class="text-base font-medium text-gray-900">Order total</dt>
        <dd class="text-base font-medium text-gray-900">${{ total }}</dd>
      </div>
    </dl>
    <div class="mt-6">
      <Modal
        button-text="Proceed to checkout"
        title="Payment"
        class="w-full rounded-md border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 flex items-center space-x-2 justify-center"
        width="w-1/2"
      >
        <button
          type="button"
          class="flex w-full items-center justify-center rounded-md border border-transparent bg-black py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          <span class="sr-only">Pay with Apple Pay</span>
          <svg class="h-5 w-auto" fill="currentColor" viewBox="0 0 50 20">
            <path
              d="M9.536 2.579c-.571.675-1.485 1.208-2.4 1.132-.113-.914.334-1.884.858-2.484C8.565.533 9.564.038 10.374 0c.095.951-.276 1.884-.838 2.579zm.829 1.313c-1.324-.077-2.457.751-3.085.751-.638 0-1.6-.713-2.647-.694-1.362.019-2.628.79-3.323 2.017-1.429 2.455-.372 6.09 1.009 8.087.676.99 1.485 2.075 2.552 2.036 1.009-.038 1.409-.656 2.628-.656 1.228 0 1.58.656 2.647.637 1.104-.019 1.8-.99 2.475-1.979.771-1.122 1.086-2.217 1.105-2.274-.02-.019-2.133-.828-2.152-3.263-.02-2.036 1.666-3.007 1.742-3.064-.952-1.408-2.437-1.56-2.951-1.598zm7.645-2.76v14.834h2.305v-5.072h3.19c2.913 0 4.96-1.998 4.96-4.89 0-2.893-2.01-4.872-4.885-4.872h-5.57zm2.305 1.941h2.656c2 0 3.142 1.066 3.142 2.94 0 1.875-1.142 2.95-3.151 2.95h-2.647v-5.89zM32.673 16.08c1.448 0 2.79-.733 3.4-1.893h.047v1.779h2.133V8.582c0-2.14-1.714-3.52-4.351-3.52-2.447 0-4.256 1.399-4.323 3.32h2.076c.171-.913 1.018-1.512 2.18-1.512 1.41 0 2.2.656 2.2 1.865v.818l-2.876.171c-2.675.162-4.123 1.256-4.123 3.159 0 1.922 1.495 3.197 3.637 3.197zm.62-1.76c-1.229 0-2.01-.59-2.01-1.494 0-.933.752-1.475 2.19-1.56l2.562-.162v.837c0 1.39-1.181 2.379-2.743 2.379zM41.1 20c2.247 0 3.304-.856 4.227-3.454l4.047-11.341h-2.342l-2.714 8.763h-.047l-2.714-8.763h-2.409l3.904 10.799-.21.656c-.352 1.114-.923 1.542-1.942 1.542-.18 0-.533-.02-.676-.038v1.779c.133.038.705.057.876.057z"
            />
          </svg>
        </button>

        <div class="relative mt-8">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-200" />
          </div>
          <div class="relative flex justify-center">
            <span class="bg-white px-4 text-sm font-medium text-gray-500">or</span>
          </div>
        </div>

        <div class="mt-6">
          <div class="grid grid-cols-12 gap-x-4 gap-y-6">
            <div class="col-span-full">
              <label for="email-address" class="block text-sm font-medium text-gray-700"
                >Email address</label
              >
              <div class="mt-1">
                <input
                  type="email"
                  id="email-address"
                  name="email-address"
                  autocomplete="email"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label for="name-on-card" class="block text-sm font-medium text-gray-700"
                >Name on card</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  id="name-on-card"
                  name="name-on-card"
                  autocomplete="cc-name"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label for="card-number" class="block text-sm font-medium text-gray-700"
                >Card number</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  id="card-number"
                  name="card-number"
                  autocomplete="cc-number"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="col-span-8 sm:col-span-9">
              <label for="expiration-date" class="block text-sm font-medium text-gray-700"
                >Expiration date (MM/YY)</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  name="expiration-date"
                  id="expiration-date"
                  autocomplete="cc-exp"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="col-span-4 sm:col-span-3">
              <label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
              <div class="mt-1">
                <input
                  type="text"
                  name="cvc"
                  id="cvc"
                  autocomplete="csc"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="address"
                  name="address"
                  autocomplete="street-address"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="col-span-full sm:col-span-4">
              <label for="city" class="block text-sm font-medium text-gray-700">City</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="city"
                  name="city"
                  autocomplete="address-level2"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="col-span-full sm:col-span-4">
              <label for="region" class="block text-sm font-medium text-gray-700"
                >State / Province</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  id="region"
                  name="region"
                  autocomplete="address-level1"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="col-span-full sm:col-span-4">
              <label for="postal-code" class="block text-sm font-medium text-gray-700"
                >Postal code</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  id="postal-code"
                  name="postal-code"
                  autocomplete="postal-code"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div class="mt-6 flex space-x-2">
            <div class="flex h-5 items-center">
              <input
                id="same-as-shipping"
                name="same-as-shipping"
                type="checkbox"
                checked=""
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <label for="same-as-shipping" class="text-sm font-medium text-gray-900"
              >Billing address is the same as shipping address</label
            >
          </div>

          <button
            type="button"
            class="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Pay ${{ cartStore.total }} <span class="opacity-50">(Not completed)</span>
          </button>
        </div>
      </Modal>
    </div>
  </section>
</template>
