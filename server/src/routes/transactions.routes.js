import { Router } from 'express'
import { getTransactions } from '../controllers/transactions.controller.js'

const router = Router()

router.get('/transactions', getTransactions)

export default router