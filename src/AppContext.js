import React, { useState, useReducer, createContext } from 'react'
import actions from './actions'

const initialProducts = [
  { id: 1, name: 'Banana', price: 10.0, available: 10 },
  { id: 2, name: 'Apple', price: 20.0, available: 15 },
  { id: 3, name: 'Orange', price: 30.0, available: 8 },
  { id: 4, name: 'Mango', price: 15.0, available: 20 },
]

const vouchers = [
  { id: 1, code: '#30OFF', type: 'percentual', amount: 30.0 },
  { id: 2, code: '#100DOLLARS', type: 'fixed', amount: 100.0 },
  { id: 3, code: '#SHIPIT', type: 'shipping', amount: 0, minValue: 300.5 },
]

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts)

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
