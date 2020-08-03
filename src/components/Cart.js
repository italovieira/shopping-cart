import React, { useState, useContext, useReducer, useEffect } from 'react'
import AppContext from '../AppContext'
import {
  computeSubtotal,
  computeShipping,
  computeTotal,
  computeDiscount,
} from '../helpers/cart-helper'
import actions from '../actions'

import styles from './Cart.module.css'

const Cart = () => {
  const { cart, dispatch, vouchers } = useContext(AppContext)
  const [voucherCode, setVoucherCode] = useState()

  // update subtotal
  useEffect(() => {
    dispatch({
      type: actions.CART_COMPUTE_SUBTOTAL,
      payload: computeSubtotal(cart.products),
    })
  }, [cart.products])

  // update shipping
  useEffect(() => {
    dispatch({
      type: actions.CART_COMPUTE_SHIPPING,
      payload: computeShipping(cart),
    })
  }, [cart.products, cart.subtotal])

  // update discount
  useEffect(() => {
    dispatch({
      type: actions.CART_COMPUTE_DISCOUNT,
      payload: computeDiscount(cart),
    })
  }, [cart.voucher, cart.subtotal])

  // update total
  useEffect(() => {
    dispatch({ type: actions.CART_COMPUTE_TOTAL, payload: computeTotal(cart) })
  }, [cart.subtotal, cart.shipping, cart.discount])

  const handleApplyVoucher = (e) => {
    const voucher = vouchers.find((voucher) => voucher.code === voucherCode)

    dispatch({
      type: actions.CART_APPLY_VOUCHER,
      payload: voucher || {},
    })

    e.preventDefault()
  }

  const handleOnChange = (e) => {
    setVoucherCode(e.target.value.trim())
  }

  return (
    <section className={styles.container}>
      <div className={styles.header}>Shopping Cart</div>

      <CartProductList />

      <div>
        <form
          className={`${styles.spaceBetween} ${styles.margin}`}
          onSubmit={handleApplyVoucher}
        >
          <input
            type="text"
            placeholder="Discount code"
            onChange={handleOnChange}
            value={voucherCode}
          />
          <button className={styles.applyButton}>
            <strong>APPLY</strong>
          </button>
        </form>
      </div>

      <div className={styles.info}>
        <CartInfo title="Subtotal" value={cart.subtotal} />
        <hr />
        <CartInfo title="Shipping" value={cart.shipping} />
        <hr />
        <CartInfo title="Discount" value={cart.discount} />
        <hr />
        <strong>
          <CartInfo title="Total" value={cart.total} />
        </strong>
      </div>
    </section>
  )
}

const CartProductList = () => {
  const { cart } = useContext(AppContext)

  return (
    <div className={`${styles.productList} ${styles.margin}`}>
      {Array.from(cart.products).map((product) => (
        <CartProduct
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          quantity={product.quantity}
          initialAvailable={product.available}
          setQuantity={product.setQuantity}
          setAvailable={product.setAvailable}
        />
      ))}
    </div>
  )
}

const reducer = (quantity, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return Math.min(action.available, quantity + 1)

    case 'DECREMENT':
      return Math.max(0, quantity - 1)
    default:
      return quantity
  }
}

const CartProduct = (props) => {
  const [quantity, dispatch] = useReducer(reducer, props.quantity)

  useEffect(() => {
    props.setQuantity(quantity)
    props.setAvailable(props.initialAvailable - quantity)
  }, [quantity])

  return (
    <div className={styles.product} data-testid={`cart-product${props.id}`}>
      <div className={styles.image}></div>
      <div className={styles.productInfo}>
        <div className={styles.productName}>
          <strong>{props.name}</strong>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.quantity}>Quantity: {quantity}</div>
          <div className={styles.price}>
            $ {(quantity * props.price).toFixed(2)}
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          onClick={() =>
            dispatch({ type: 'INCREMENT', available: props.initialAvailable })
          }
        >
          +
        </button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      </div>
    </div>
  )
}

const CartInfo = (props) => {
  return (
    <div className={`${styles.spaceBetween} ${styles.margin}`}>
      <span>{props.title}</span>
      <span>$ {props.value.toFixed(2)}</span>
    </div>
  )
}

export default Cart
