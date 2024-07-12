export const priceAfterDiscount = ({ price, discountPercentage }, fixed = true) => {
  const fixedPrice = price - (price * discountPercentage) / 100
  if (fixed) {
    //get last 2 decimals by default
    return fixedPrice.toFixed(2)
  }
  // otherwise only calculate and return
  return fixedPrice
}
