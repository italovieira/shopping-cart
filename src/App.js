import React from 'react'
import Header from './components/Header'
import Cart from './components/Cart'
import ProductList from './components/Product'
import Checkout from './components/Checkout'
import { AppProvider } from './AppContext'

import './App.css'

const App = () => {
  return (
    <div className="App theme">
      <Header />
      <main>
        <AppProvider>
          <ProductList />
          <div className="centered">
            <Cart />
            <Checkout />
          </div>
        </AppProvider>
      </main>
    </div>
  )
}

export default App
