import React from 'react'
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
  return (
    <section className={styles.productList}>
      <Product name="Product name" price="123,00" available="2" />
      <Product name="Product name" price="123,00" available="2" />
      <Product name="Product name" price="123,00" available="2" />
      <Product name="Product name" price="123,00" available="2" />
      <Product name="Product name" price="123,00" available="2" />
      <Product name="Product name" price="123,00" available="2" />
      <Product name="Product name" price="123,00" available="2" />
      <Product name="Product name" price="123,00" available="2" />
    </section>
  )
}

export default ProductList
