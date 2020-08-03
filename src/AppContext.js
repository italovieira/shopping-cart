import React, { useState, useReducer, useEffect, createContext } from 'react'
import actions from './actions'
import { fetchProducts, fetchVouchers } from './api'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [vouchers, setVouchers] = useState([])

  useEffect(() => {
    fetchProducts().then((products) => setProducts(products))
    fetchVouchers().then((vouchers) => setVouchers(vouchers))
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

  const [cart, dispatch] = useReducer(reducer, {
    products: [],
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0,
    voucher: {},
  })

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
