import React, { useState, useEffect, useContext } from 'react'
import AppContext from '../AppContext'

import styles from './Product.module.css'

const Product = (props) => {
  const { cartProducts, setCartProducts } = useContext(AppContext)
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [available, setAvailable] = useState(props.available)

  useEffect(() => {
    setCartProducts((cartProducts) => {
      const clone = [...cartProducts]

      clone.forEach((product) => {
        if (props.id === product.id) {
          product.quantity = quantity
        }
      })
      return clone
    })
  }, [quantity])

  const handleBuy = (product) => {
    setAlreadyAdded(true)
    setCartProducts([
      ...cartProducts,
      { ...product, quantity, setQuantity, setAvailable, id: product.id },
    ])
  }

  return (
    <div className={styles.product}>
      <div className={styles.image}></div>
      <div className={styles.productInfo}>
        <div>
          <strong>{props.name}</strong>
        </div>
        <span>
          $ {props.price} &#8231; {available} left
        </span>
      </div>
      <button
        className={styles.button}
        onClick={() => handleBuy(props)}
        disabled={alreadyAdded}
      >
        <strong>BUY</strong>
      </button>
    </div>
  )
}

const ProductList = () => {
  const { products } = useContext(AppContext)

  return (
    <section className={styles.productList}>
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          available={product.available}
          alreadyAdded={false}
        />
      ))}
    </section>
  )
}

export default ProductList
