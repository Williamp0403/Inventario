import { CategoriesModel } from "../models/category.js"

export const getCategories = async (req, res) => {
  try {
    const response = await CategoriesModel.queryGetCategories()
    res.send(response)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "Error interno del servidor." })
  }
}

export const createCategory = async (req, res) => {
  try {
    const response = await CategoriesModel.queryCreateCategory(req.body)
    if(response.status === 409) return res.status(409).json({ message: response.message })
    if(response.status === 400) return res.status(400).json({ message: response.message })
    
    res.json({ message: 'Categoria creada exitosamente.', category: response.category })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "Error interno del servidor." })
  }
}

export const updateCategory = async (req, res) => {
  try {
    const response = await CategoriesModel.queryUpdateCategory(req.params.id, req.body)

    if(response.status === 404) return res.status(404).json({ message: response.message })
    if(response.status === 409) return res.status(409).json({ message: response.message })

    res.json({ message: response.message, category: response.category })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "Error interno del servidor." })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const response = await CategoriesModel.queryDeleteCategory(req.params.id) 
    if(!response.success) return res.status(404).json({ message: response.message })
  
    res.json({ message: response.message })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "Error interno del servidor." })
  }
}