import React from 'react'
import Header from './components/Header'
import Cart from './components/Cart'
import ProductList from './components/Product'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <ProductList />
        <div className="centered">
          <Cart />
        </div>
      </main>
    </div>
  )
}

export default App
