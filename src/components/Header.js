import React from 'react'
import styles from './Header.module.css'

const Header = () => {
  return (
    <section className={styles.header}>
      <div className={styles.container}>
        <div className={styles.title}>Shopping</div>
        <div className={styles.name}>John doe</div>
      </div>
    </section>
  )
}

export default Header
