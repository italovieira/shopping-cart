import React, { useState, useReducer, useEffect, createContext } from 'react'
import actions from './actions'
import { fetchProducts, fetchVouchers } from './api'

export const AppContext = createContext()

export const AppProvider = ({
  children,
  initialProducts,
  initialVouchers,
  initialCart,
}) => {
  const [products, setProducts] = useState(initialProducts || [])
  const [vouchers, setVouchers] = useState(initialVouchers || [])

  useEffect(() => {
    fetchProducts(5).then((products) => setProducts(products))
    fetchVouchers(5).then((vouchers) => setVouchers(vouchers))
  }, [])

  const reducer = (cart, action) => {
    switch (action.type) {
      case actions.CART_COMPUTE_SUBTOTAL:
        return { ...cart, subtotal: action.payload }
      case actions.CART_COMPUTE_SHIPPING:
        return { ...cart, shipping: action.payload }
      case actions.CART_COMPUTE_DISCOUNT:
        return { ...cart, discount: action.payload }
      case actions.CART_COMPUTE_TOTAL:
        return { ...cart, total: action.payload }
      case actions.CART_UPDATE_PRODUCTS:
        return { ...cart, products: action.payload }
      case actions.CART_APPLY_VOUCHER:
        return { ...cart, voucher: action.payload }
      default:
        return cart
    }
  }

  const emptyCart = {
    products: [],
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0,
    voucher: {},
  }
  const [cart, dispatch] = useReducer(reducer, initialCart || emptyCart)

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        cart,
        dispatch,
        vouchers,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
