import { ProductsModel } from "../models/product.js"

export const getProducts = async (req,res) => {
  try {
    const response = await ProductsModel.queryGetProducts() 
    res.send(response)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "Error interno del servidor." });
  }
}

export const createProduct = async (req,res) => {
  try {
    const response = await ProductsModel.queryCreateProduct(req.body)

    if(response.status === 409) return res.status(409).json({ message: response.message })
    if(response.status === 400) return res.status(400).json({ message: response.message })
    if (response.status === 500) return res.status(500).json({ message: response.message })

    res.json({ message: response.message, product: response.product })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "Error interno del servidor." })
  }
}

export const updateProduct = async (req,res) => {
  try {

    const response = await ProductsModel.queryUpdateProduct(req.params.id, req.body)

    if(response.status === 404) return res.status(404).json({ message: response.message })
    if (response.status === 500) return res.status(500).json({ message: response.message })

    res.json({ message: response.message, product: response.product })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export const deleteProduct = async (req,res) => {
  try {
    const response = await ProductsModel.queryDeleteProduct(req.params.id)
    if(!response.success) return res.status(404).json({ message: response.message })

    res.json({ message: response.message })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}