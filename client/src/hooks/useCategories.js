import { useState } from "react"
import { createCategoryRequest, getCategoriesRequest, updateCategoryRequest } from "../api/categories"
import { enqueueSnackbar } from "notistack"
import { handlingErrors } from "../errors/errors"

export function useCategories () {
  const [ categories, setCategories ] = useState([])
  const [loading, setLoading] = useState(true)

  async function getCategories () {
    try {
      const response = await getCategoriesRequest()
      setCategories(response.data)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  async function createCategory(data, setOpenModal, reset) {
    try {
      const response = await createCategoryRequest(data)
      console.log(response)
      setCategories(prevCategories => [...prevCategories, response.data.category])
      setOpenModal(false)
      reset()
      enqueueSnackbar( 'Categoría creada correctamente.' , { variant: 'success' })
    } catch (e) {
      console.log(e)
      enqueueSnackbar( handlingErrors(e) , { variant: 'error' })
    }
  }

  async function updateCategory(data, id, setIsEditing) {
    try {
      const response = await updateCategoryRequest(data, id)
      console.log(response)
      const updatedCategory = response.data.category
      setCategories(prevCategories => {
        const copyCategories = [...prevCategories]
        const index = prevCategories.findIndex(category => category.id_category === updatedCategory.id_category)

        if(index !== -1) {
          copyCategories[index] = updatedCategory
        }    
        return copyCategories
      })
      enqueueSnackbar( 'Categoría actualizada correctamente.' , { variant: 'success' })
      setIsEditing(null)
    } catch (e) {
      console.log(e)
      enqueueSnackbar( handlingErrors(e) , { variant: 'error' })
    }   
  }

  async function deleteCategories (id) {
    try {
      const response = await deleteCategories(id)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    categories,
    loading,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategories
  }
}