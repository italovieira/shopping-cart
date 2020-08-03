const sum = (x, y) => x + y

export const computeSubtotal = (cartProducts) => {
  return Array.from(cartProducts)
    .map((product) => product.price * product.quantity)
    .reduce(sum, 0)
}

export const computeShipping = (cart) => {
  const quantity = Array.from(cart.products)
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

export const computeDiscount = (cart) => {
  const voucher = cart.voucher
  switch (voucher.type) {
    case 'percentual':
      return (cart.subtotal * voucher.amount) / 100
    case 'fixed':
      return voucher.amount
    case 'shipping':
      return cart.subtotal >= voucher.minValue
        ? cart.shipping - voucher.amount
        : 0
    default:
      return 0
  }
}

export const computeTotal = (cart) =>
  Math.max(0, cart.subtotal + cart.shipping - cart.discount)

export const updateProductQuantity = (id, quantity, products) => {
  const clone = Array.from(products)

  clone.forEach((product) => {
    if (id === product.id) {
      product.quantity = quantity
    }
  })
  return clone
}

export const addProduct = (product, products) => {
  return [...Array.from(products), product]
}
