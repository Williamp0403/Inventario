import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import productRouter from './routes/products.routes.js'
import categoryRouter from './routes/categories.routes.js'
import transactionRouter from './routes/transactions.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))

app.use(morgan('dev'))
app.use(productRouter)
app.use(categoryRouter)
app.use(transactionRouter)

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto http://localhost:${PORT}`)
})