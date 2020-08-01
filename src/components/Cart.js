import React, { useContext, useReducer } from 'react'
import AppContext from '../AppContext'

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
  const { cartProducts } = useContext(AppContext)

  return (
    <div className={`${styles.productList} ${styles.margin}`}>
      {cartProducts.map((product) => (
        <CartProduct
          key={product.id}
          name={product.name}
          price={product.price}
          quantity={product.quantity}
        />
      ))}
    </div>
  )
}

const reducer = (quantity, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return quantity + 1
    case 'DECREMENT':
      return quantity - 1
    default:
      return quantity
  }
}

const CartProduct = (props) => {
  const [quantity, dispatch] = useReducer(reducer, 1)

  return (
    <div className={styles.product}>
      <div className={styles.image}></div>
      <div className={styles.productInfo}>
        <div className={styles.productName}>
          <strong>{props.name}</strong>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.quantity}>Quantity: {quantity}</div>
          <div className={styles.price}>$ {props.price * quantity}</div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
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
