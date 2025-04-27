import { useEffect, useState } from "react"
import Loading from "../components/Loading.jsx"
import AlertDialog from "../components/Modal.jsx"
import { useProducts } from "../context/ProductContext"
import { useCategories } from "../context/CategoryContext.jsx"
import { Product } from "../components/Product.jsx"
import { ButtonCreate } from "../components/Buttons.jsx"

export function Home () {
  const { getProducts, products, loading } = useProducts()
  const { getCategories } = useCategories()
  const [ open, setOpen ] = useState(false)

  useEffect(() => { 
    getProducts()
    getCategories()
  }, [])

  const isProducts = products?.length > 0

  return (
    <main className="container mx-auto">
      <AlertDialog open={open} setOpen={setOpen}/>
      <section className="p-8 sm:p-12">
        <div className="flex justify-between mb-10">
          <h1 className="font-medium text-2xl sm:text-4xl">Productos</h1> 
          <ButtonCreate handleClick={() => setOpen(true)} text='Crear Producto'/>
        </div>
          {
            loading ? <Loading/>
            : isProducts && !loading ? (
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-zinc-400 font-medium">
                    <td className="px-2 sm:px-4 py-2 sm:py-3">Nombre</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">Descripcion</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">Precio</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">Cantidad</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">Categoría</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">Acciones</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map((product) => {
                      return (
                        <Product product={product} key={product.id_product}/>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            )
            : <h2>No hay productos disponibles.</h2>
          }
      </section>
    </main>
  )
}