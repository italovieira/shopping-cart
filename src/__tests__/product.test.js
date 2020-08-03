import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import ProductList from '../components/Product'
import Cart from '../components/Cart'
import { AppProvider } from '../AppContext'

test('should add product to cart', async () => {
  const fakeProducts = [
    { id: 1, name: 'Banana', price: 10.0, available: 10 },
    { id: 2, name: 'Apple', price: 20.0, available: 15 },
    { id: 3, name: 'Orange', price: 30.0, available: 8 },
    { id: 4, name: 'Mango', price: 15.0, available: 20 },
  ]

  const { findByTestId } = render(
    <AppProvider initialProducts={fakeProducts}>
      <ProductList />
      <Cart />
    </AppProvider>
  )

  const buyButton = await findByTestId('buy-button1')

  fireEvent.click(buyButton)

  expect(buyButton.disabled).toBeTruthy()

  const cartProduct = await findByTestId('cart-product1')
  expect(cartProduct).toBeTruthy()
})
