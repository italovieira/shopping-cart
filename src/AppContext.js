import React, { useState, createContext } from 'react'

const initialProducts = [
  { id: 1, name: 'Banana', price: 10.0, available: 10 },
  { id: 2, name: 'Apple', price: 20.0, available: 15 },
  { id: 3, name: 'Orange', price: 30.0, available: 8 },
  { id: 4, name: 'Mango', price: 15.0, available: 20 },
]

const initialCartProducts = [
  { ...initialProducts[0], quantity: 3 },
  { ...initialProducts[1], quantity: 1 },
]

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts)
  const [cartProducts, setCartProducts] = useState(initialCartProducts)

  return (
    <AppContext.Provider
      value={{ products, cartProducts, setProducts, setCartProducts }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
