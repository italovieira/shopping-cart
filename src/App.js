import React from 'react'
import Header from './components/Header'
import Cart from './components/Cart'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Cart />
      </main>
    </div>
  )
}

export default App
