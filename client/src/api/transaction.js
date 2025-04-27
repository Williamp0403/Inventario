import axios from './axios.js'

export const getTransactionsRequest = () => axios.get('/transactions')