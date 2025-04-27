import { Router } from 'express'
import { createProduct, deleteProduct, updateProduct, getProducts } from '../controllers/products.controller.js'
import { validateSchema } from '../middlewares/validateData.js'
import { createProductSchema, updateProductSchema } from '../schemas/product.schema.js'

const router = Router()

router.get('/products', getProducts)
router.post('/create-product', validateSchema(createProductSchema) ,createProduct)
router.put('/update-product/:id', validateSchema(updateProductSchema), updateProduct)
router.delete('/delete-product/:id', deleteProduct)

export default router