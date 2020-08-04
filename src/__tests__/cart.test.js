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

describe('given some available vouchers', () => {
  const fakeVouchers = [
    { id: 1, code: '#30OFF', type: 'percentual', amount: 30.0 },
    { id: 2, code: '#100DOLLARS', type: 'fixed', amount: 100.0 },
    { id: 3, code: '#SHIPIT', type: 'shipping', amount: 0, minValue: 300.5 },
  ]

  test('should show expected discount and total for percentual voucher of 30%', async () => {
    const { findByTestId } = render(
      <AppProvider initialCart={fakeCart} initialVouchers={fakeVouchers}>
        <Cart />
      </AppProvider>
    )

    const voucherCode = '#30OFF'
    const input = await findByTestId('voucher-input')
    fireEvent.change(input, { target: { value: voucherCode } })

    const button = await findByTestId('voucher-button')
    fireEvent.click(button)

    const discountNode = await findByTestId('discount')
    const totalNode = await findByTestId('total')

    expect(discountNode).toHaveTextContent(/67.50/)
    expect(totalNode).toHaveTextContent(/187.50/)
  })

  test('should show expected discount and total for fixed voucher of 100 dollars', async () => {
    const { findByTestId } = render(
      <AppProvider initialCart={fakeCart} initialVouchers={fakeVouchers}>
        <Cart />
      </AppProvider>
    )

    const voucherCode = '#100DOLLARS'
    const input = await findByTestId('voucher-input')
    fireEvent.change(input, { target: { value: voucherCode } })

    const button = await findByTestId('voucher-button')
    fireEvent.click(button)

    const discountNode = await findByTestId('discount')
    const totalNode = await findByTestId('total')

    expect(discountNode).toHaveTextContent(/100\.00/)
    expect(totalNode).toHaveTextContent(/155\.00/)
  })

  test('should show expected discount and total for free shipping voucher below min', async () => {
    const { findByTestId } = render(
      <AppProvider initialCart={fakeCart} initialVouchers={fakeVouchers}>
        <Cart />
      </AppProvider>
    )

    const voucherCode = '#SHIPIT'
    const input = await findByTestId('voucher-input')
    fireEvent.change(input, { target: { value: voucherCode } })

    const button = await findByTestId('voucher-button')
    fireEvent.click(button)

    const discountNode = await findByTestId('discount')
    const totalNode = await findByTestId('total')

    expect(discountNode).toHaveTextContent(/0\.00/)
    expect(totalNode).toHaveTextContent(/255\.00/)
  })

  test('should show expected discount and total for free shipping voucher above min', async () => {
    const fakeCart = {
      products: [
        {
          id: 1,
          name: 'Banana',
          price: 10.0,
          available: 10,
          quantity: 5,
          setQuantity: mock,
          setAvailable: mock,
        },
        {
          id: 2,
          name: 'Apple',
          price: 20.0,
          available: 15,
          quantity: 5,
          setQuantity: mock,
          setAvailable: mock,
        },
        {
          id: 3,
          name: 'Orange',
          price: 30.0,
          available: 8,
          quantity: 5,
          setQuantity: mock,
          setAvailable: mock,
        },
        {
          id: 4,
          name: 'Mango',
          price: 15.0,
          available: 20,
          quantity: 5,
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

    const { findByTestId } = render(
      <AppProvider initialCart={fakeCart} initialVouchers={fakeVouchers}>
        <Cart />
      </AppProvider>
    )

    const voucherCode = '#SHIPIT'
    const input = await findByTestId('voucher-input')
    fireEvent.change(input, { target: { value: voucherCode } })

    const button = await findByTestId('voucher-button')
    fireEvent.click(button)

    const discountNode = await findByTestId('discount')
    const totalNode = await findByTestId('total')

    expect(discountNode).toHaveTextContent(/44\.00/)
    expect(totalNode).toHaveTextContent(/375\.00/)
  })
})
