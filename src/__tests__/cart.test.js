import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import ProductList from '../components/Product'
import Cart from '../components/Cart'
import { AppProvider } from '../AppContext'

const mock = jest.fn(() => true)

const fakeCart = {
  products: [
    {
      id: 1,
      name: 'Banana',
      price: 10.0,
      available: 10,
      quantity: 3,
      setQuantity: mock,
      setAvailable: mock,
    },
    {
      id: 2,
      name: 'Apple',
      price: 20.0,
      available: 15,
      quantity: 3,
      setQuantity: mock,
      setAvailable: mock,
    },
    {
      id: 3,
      name: 'Orange',
      price: 30.0,
      available: 8,
      quantity: 3,
      setQuantity: mock,
      setAvailable: mock,
    },
    {
      id: 4,
      name: 'Mango',
      price: 15.0,
      available: 20,
      quantity: 3,
      setQuantity: mock,
      setAvailable: mock,
    },
  ],
  subtotal: 0,
  shipping: 0,
  discount: 0,
  total: 0,
  voucher: {},
}

describe('given some products in cart', () => {
  test('should show expected subtotal in cart', async () => {
    const { findByTestId } = render(
      <AppProvider initialCart={fakeCart}>
        <Cart />
      </AppProvider>
    )

    expect(await findByTestId('subtotal')).toHaveTextContent(/225/)
  })

  test('should show expected shipping in cart', async () => {
    const { findByTestId } = render(
      <AppProvider initialCart={fakeCart}>
        <Cart />
      </AppProvider>
    )

    expect(await findByTestId('shipping')).toHaveTextContent(/30\.00/)
  })

  test('should show expected discount in cart', async () => {
    const { findByTestId } = render(
      <AppProvider initialCart={fakeCart}>
        <Cart />
      </AppProvider>
    )

    expect(await findByTestId('discount')).toHaveTextContent(/0\.00/)
  })

  test('should show expected total in cart', async () => {
    const { findByTestId } = render(
      <AppProvider initialCart={fakeCart}>
        <Cart />
      </AppProvider>
    )

    expect(await findByTestId('total')).toHaveTextContent(/255\.00/)
  })
})
