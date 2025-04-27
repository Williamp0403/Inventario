import { useState } from "react"
import { createProductRequest, deleteProductRequest, getProductsRequest, updateProductRequest } from "../api/products.js"
import { useSnackbar } from 'notistack'
import { handlingErrors } from "../errors/errors.js"

export function useProducts () {
  const [ products, setProducts ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const { enqueueSnackbar } = useSnackbar()

  async function getProducts () {
    try {
      const response = await getProductsRequest()
      setProducts(response.data)
    } catch (e) {
      console.log(e)
      enqueueSnackbar(handlingErrors(e), { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  async function createProduct (data, setOpen, reset) {
    try {
      const { sku, name, description, price, stock_quantity, id_category } = data
      const formattedData = {
        sku,
        name,
        description,
        price: Number(price),
        stock_quantity: Number(stock_quantity),
        id_category: Number(id_category)
      }
      const response = await createProductRequest(formattedData)
      setProducts(prevProducts => [...prevProducts, response.data.product[0]])
      setOpen(false)
      reset()
      enqueueSnackbar('Producto creado exitosamente!', { variant: 'success' })
    } catch (e) {
      console.log(e)
      enqueueSnackbar(handlingErrors(e), { variant: 'error' })
    }
  }

  async function updateProduct(data, id, setOpenModalUpdate) {
    try {
      const response = await updateProductRequest(data, id)
      const updatedProduct = response.data.product[0]
      setProducts(prevProducts => {
        const copyProducts = [...prevProducts]

        const index = prevProducts.findIndex(product => product.id_product === updatedProduct.id_product)
        if(index !== -1) {
          copyProducts[index] = updatedProduct
        }
        
        return copyProducts

      })
      setOpenModalUpdate(false)
      enqueueSnackbar( 'Producto actualizado correctamente.' , { variant: 'success' })
    } catch (e) {
      console.log(e)
      enqueueSnackbar( handlingErrors(e) , { variant: 'error' })
    }
  }

  async function deleteProduct(id) {
    try {
      await deleteProductRequest(id)
      setProducts(prevProducts => prevProducts.filter((product) => product.id_product != id))
      enqueueSnackbar('Producto eliminado exitosamente!', { variant: 'success' })
    } catch(e) {
      console.log(e)
      enqueueSnackbar(handlingErrors(e), { variant: 'error' })
    }
  }

  return {
    products,
    loading,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
  }
}