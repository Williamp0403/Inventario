import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import { useCategories } from "../context/CategoryContext"
import Loading from "../components/Loading"
import { ButtonCancel, ButtonCreate, ButtonSave, ButtonUpdate } from "../components/Buttons"
import { InlineEditing } from "../components/InlineEditing"
import { ModalCreate } from "../components/Modal"

export function CategoryPage () {
  const [isEditing, setIsEditing] = useState(null);
  const { categories, loading, getCategories, updateCategory } = useCategories()
  const { register, handleSubmit, setValue } = useForm()
  const [ openModal, setOpenModal ] = useState(false)

  useEffect(() => {
    getCategories()
  }, [])

  const onSubmit = handleSubmit(values => {
    updateCategory(values, isEditing, setIsEditing)
  })

  const isCategories = categories?.length > 0

  return (
    <main className="container mx-auto">
      <ModalCreate openModal={openModal} setOpenModal={setOpenModal}/>
      <section className="p-8 sm:p-12">
        <div className="flex justify-between mb-10">
          <h1 className="font-medium text-2xl sm:text-4xl">Categorías</h1> 
          <ButtonCreate handleClick={() => setOpenModal(true)} text='Crear Categoría'/>
        </div>
      {
        loading ? <Loading/>
        : isCategories && !loading ?
          <div className="w-full max-w-3xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-zinc-400 font-medium">
                    <td className="px-2 sm:px-4 py-2 sm:py-3">#</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">Nombre</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">Acciones</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    categories.map((category, index) => {
                      return (
                          <tr key={category.id_category}>
                            <td className="border-t border-zinc-600 px-2 sm:px-4 py-2 sm:py-3">{index + 1}</td>
                            <td className="border-t border-zinc-600 px-2 sm:px-4 py-2 sm:py-3">
                              <InlineEditing register={register} setValue={setValue} name='name' active={isEditing === category.id_category} value={category.name}/>
                            </td>
                            <td className="border-t border-zinc-600 px-2 sm:px-4 py-2 sm:py-3">
                              <div className="flex items-center justify-center">
                                {
                                  isEditing !== category.id_category ? (
                                    <ButtonUpdate handleClick={()=> setIsEditing(category.id_category)}/>
                                  ): (
                                    <form onSubmit={onSubmit} className="flex items-center justify-center gap-x-4">
                                      <ButtonCancel handleClick={() => setIsEditing(null)}/>   
                                      <ButtonSave/>
                                    </form>
                                  )                              
                                }
                              </div>
                            </td>
                          </tr>
                        )
                    })
                  }
                </tbody>
              </table>
          </div>
        : <h2>No hay productos disponibles.</h2>
      }
      </section>
    </main>
  )
}