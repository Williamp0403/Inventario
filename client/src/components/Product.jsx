import { useState } from "react"
import { ModalDelete, ModalUpdateProduct } from "./Modal"
import { ButtonDelete, ButtonUpdate } from "./Buttons"
import { useProducts } from "../context/ProductContext"

export function Product ({ product }) {
  const { deleteProduct } = useProducts()
  const [ openModalDelete, setOpenModalDelete ] = useState(false)
  const [ openModalUpdate, setOpenModalUpdate ] = useState(false)

  return (
    <>
      <ModalDelete openModalDelete={openModalDelete} setOpenModalDelete={setOpenModalDelete} id={product.id_product} action={deleteProduct}  title={'Eliminar Producto.'} description={'¿Estás seguro que desea eliminar este producto?'}/>
      <ModalUpdateProduct openModalUpdate={openModalUpdate} setOpenModalUpdate={setOpenModalUpdate} product={product}/>
      <tr key={product.sku}>
        <td className="border-t border-zinc-600 px-2 sm:px-4 py-2 sm:py-3">{product.name}</td>
        <td className="border-t border-zinc-600 px-2 sm:px-4 py-2 sm:py-3">{product.description}</td>
        <td className="border-t border-zinc-600 px-2 sm:px-4 py-2 sm:py-3">${product.price}</td>
        <td className="border-t border-zinc-600 px-2 sm:px-4 py-2 sm:py-3">{product.stock_quantity}</td>
        <td className="border-t border-zinc-600 px-2 sm:px-4 py-2 sm:py-3">{product.name_category}</td>
        <td className="border-t border-zinc-600 px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-center gap-x-4">
            <ButtonUpdate handleClick={() => setOpenModalUpdate(true)}/>
            <ButtonDelete handleClick={() => setOpenModalDelete(true)}/>
          </div>
        </td>
      </tr>
    </>
  )
}