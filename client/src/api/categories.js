import axios from './axios.js'

export const getCategoriesRequest = () => axios.get('/categories')

export const createCategoryRequest = (data) => axios.post('/create-category', data)

export const updateCategoryRequest = (data, id) => axios.put(`/update-category/${id}`, data)

export const deleteCategoryRequest = (id) => axios.delete(`/delete-category/${id}`)