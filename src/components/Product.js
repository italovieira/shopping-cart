import React from 'react'
import styles from './Product.module.css'

const Product = () => {
  return (
    <div className={styles.product}>
      <div className={styles.image}></div>
      <div className={styles.productInfo}>
        <div>
          <strong>Product name</strong>
        </div>
        <span>$ 123,00 &#8231; 2 left</span>
      </div>
      <div className={styles.button}>
        <strong>BUY</strong>
      </div>
    </div>
  )
}

const ProductList = () => {
  return (
    <section className={styles.productList}>
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
    </section>
  )
}

export default ProductList
