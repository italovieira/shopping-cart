import React, { useState, useReducer, useEffect, createContext } from 'react'
import axios from 'axios'
import actions from './actions'

const API = 'https://shielded-wildwood-82973.herokuapp.com'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [vouchers, setVouchers] = useState([])

  useEffect(() => {
    axios(`${API}/products.json`)
      .then((res) => setProducts(res.data.products || []))
      .catch((err) => console.log(err.message))

    axios(`${API}/vouchers.json`)
      .then((res) => setVouchers(res.data.vouchers || []))
      .catch((err) => console.log(err.message))
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
