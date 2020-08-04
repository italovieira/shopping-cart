import axios from 'axios'

const API = 'https://shielded-wildwood-82973.herokuapp.com'

export const fetchProducts = (attempts = 1) =>
  axios(`${API}/products.json`)
    .then((res) => res.data.products || [])
    .catch((err) => {
      console.log('Error attempting to fetch products:', err.message)
      return attempts <= 1 ? [] : fetchProducts(attempts - 1)
    })

export const fetchVouchers = (attempts = 1) =>
  axios(`${API}/vouchers.json`)
    .then((res) => res.data.vouchers || [])
    .catch((err) => {
      console.log('Error attempting to fetch vouchers:', err.message)
      return attempts <= 1 ? [] : fetchVouchers(attempts - 1)
    })
