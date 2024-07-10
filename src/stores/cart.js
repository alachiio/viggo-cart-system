import { priceAfterDiscount } from '@/utils/helpers'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import { useToast } from 'vue-toast-notification'

const useCartStore = defineStore('cart', {
  state: () => ({
    cart: useLocalStorage('pinia/cart', []),
    codes: [
      {
        code: 'VUESTORE2024',
        percentage: 10
      },
      {
        code: 'PERFUME2024',
        percentage: 25
      }
    ],
    discountCode: null
  }),
  getters: {
    subTotal(state) {
      return (index = -1) => {
        let total = 0
        if (index > -1) {
          const item = state.cart[index]
          total = priceAfterDiscount(item.product) * item.count
        } else {
          state.cart.map(function (item) {
            total += priceAfterDiscount(item.product) * item.count
          })
        }
        return total
      }
    },
    total(state) {
      // $5 is delivery fees.
      let total = parseFloat(state.subTotal() + 5.0 + state.subTotal() * 0.18).toFixed(2)
      if (state.discountCode) {
        total -= total * (state.discountCode.percentage / 100)
      }
      return total
    },
    tax(state) {
      return parseFloat(state.subTotal() * 0.18).toFixed(2)
    }
  },
  actions: {
    add(product, count = 1) {
      const index = this.cart.findIndex((item) => item.product.id === product.id)
      if (index > -1) {
        this.cart[index].count += count
      } else {
        this.cart.push({
          product: product,
          count: count
        })
      }
    },
    updateCount(index, direction) {
      if (direction == 'up') {
        this.cart[index].count++
      } else {
        if (this.cart[index].count == 1) {
          this.remove(index)
        } else {
          this.cart[index].count--
        }
      }
    },
    applyDiscount(code) {
      const discountCode = this.codes.find((item) => item.code === code)
      if (discountCode) {
        this.discountCode = discountCode
        useToast().success(`Great! You got a ${discountCode.percentage}% off discount!`)
      } else {
        useToast().error('Discount code is invalid!')
      }
    },
    clearDiscount() {
      this.discountCode = null
      useToast().warning('Discount code was removed!')
    },
    async remove(index) {
      await Swal.fire({
        title: 'Are you sure?',
        text: 'this item will be removed from cart',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.cart = this.cart.filter((_, itemIndex) => itemIndex != index)
          useToast().success('Your item has been removed.')
        }
      })
    },
    async empty() {
      await Swal.fire({
        title: 'Are you sure?',
        text: 'this action will clear your cart',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, clear it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.cart = []
          useToast().success('Your cart is empty now.')
        }
      })
    }
  }
})

export default useCartStore
