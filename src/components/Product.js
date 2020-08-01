import React, { useState, useContext } from 'react'
import AppContext from '../AppContext'

import styles from './Product.module.css'

const Product = (props) => {
  const { cartProducts, setCartProducts } = useContext(AppContext)
  const [alreadyAdded, setAlreadyAdded] = useState(false)

  const handleBuy = (product) => {
    setAlreadyAdded(true)
    setCartProducts([...cartProducts, { ...product, quantity: 1 }])
  }

  return (
    <div className={styles.product}>
      <div className={styles.image}></div>
      <div className={styles.productInfo}>
        <div>
          <strong>{props.name}</strong>
        </div>
        <span>
          $ {props.price} &#8231; {props.available} left
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
