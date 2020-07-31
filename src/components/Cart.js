import React from 'react'
import styles from './Cart.module.css'

const Cart = () => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>Shopping Cart</div>

      <CartProductList />

      <div>
        <div className={`${styles.spaceBetween} ${styles.margin}`}>
          <input type="text" placeholder="Discount code" />
          <input type="submit" value="Apply" />
        </div>
      </div>

      <div className={styles.info}>
        <CartInfo title="Subtotal" value="234,00" />
        <hr />
        <CartInfo title="Shipping" value="10,00" />
        <hr />
        <CartInfo title="Discount" value="1,00" />
        <hr />
        <strong>
          <CartInfo title="Total" value="244,00" />
        </strong>
      </div>
    </section>
  )
}

const CartProductList = () => {
  return (
    <div className={`${styles.productList} ${styles.margin}`}>
      <CartProduct name="Product name" price="123,45" quantity="4" />
      <CartProduct name="Product name" price="123,45" quantity="4" />
    </div>
  )
}

const CartProduct = (props) => {
  return (
    <div className={styles.product}>
      <div className={styles.image}></div>
      <div className={styles.productInfo}>
        <div className={styles.productName}>{props.name}</div>
        <div className={styles.spaceBetween}>
          <div className={styles.quantity}>Quantity: {props.quantity}</div>
          <div className={styles.price}>$ {props.price}</div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button>+</button>
        <button>-</button>
      </div>
    </div>
  )
}

const CartInfo = (props) => {
  return (
    <div className={`${styles.spaceBetween} ${styles.margin}`}>
      <span>{props.title}</span>
      <span>$ {props.value}</span>
    </div>
  )
}

export default Cart
