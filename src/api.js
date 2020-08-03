import axios from 'axios'

const API = 'https://shielded-wildwood-82973.herokuapp.com'

export const fetchProducts = () =>
  axios(`${API}/products.json`)
    .then((res) => res.data.products || [])
    .catch((err) => {
      console.log(err.message)
      return []
    })

export const fetchVouchers = () =>
  axios(`${API}/vouchers.json`)
    .then((res) => res.data.vouchers || [])
    .catch((err) => {
      console.log(err.message)
      return []
    })
