import axios from './axios.js'

export const getProductsRequest = () => axios.get('/products')

export const createProductRequest = (data) => axios.post('/create-product', data)

export const updateProductRequest = (data, id) => axios.put(`/update-product/${id}`, data )

export const deleteProductRequest = (id) => axios.delete(`/delete-product/${id}`)