import { Router } from "express"
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categories.controller.js"
import { validateSchema } from "../middlewares/validateData.js"
import { categorySchema } from "../schemas/category,schema.js"

const router = Router()

router.get('/categories', getCategories)
router.post('/create-category', validateSchema(categorySchema), createCategory)
router.put('/update-category/:id', validateSchema(categorySchema), updateCategory)
router.delete('/delete-category/:id', deleteCategory)

export default router