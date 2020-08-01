import React, { useState, useContext } from 'react'
import AppContext from '../AppContext'

import styles from './Product.module.css'

const Product = (props) => {
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
      <button className={styles.button}>
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
        />
      ))}
    </section>
  )
}

export default ProductList
