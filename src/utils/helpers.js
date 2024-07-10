export const priceAfterDiscount = (product, fixed = true) => {
  const price = product.price - (product.price * product.discountPercentage) / 100
  if (fixed) {
    //get last 2 decimals by default
    return parseFloat(price).toFixed(2)
  }
  // otherwise only calculate and return
  return price
}
