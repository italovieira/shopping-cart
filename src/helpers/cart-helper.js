const sum = (x, y) => x + y

export const computeSubtotal = (cartProducts) => {
  return cartProducts
    .map((product) => product.price * product.quantity)
    .reduce(sum, 0)
}

export const computeShipping = (cart, cartProducts) => {
  const quantity = cartProducts
    .map((product) => product.quantity)
    .reduce(sum, 0)

  if (cart.subtotal > 400 || quantity < 1) {
    return 0
  }

  if (quantity <= 10) {
    return 30
  }

  return 30 + Math.floor((quantity - 10) / 5) * 7
}
