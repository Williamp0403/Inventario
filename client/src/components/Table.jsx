import { useState } from "react"
import { ButtonDelete, ButtonUpdate } from "./Buttons"
import { ModalDeleteProduct } from "./Modal"

export function Table ({ products }) {
  const [ openModalDelete, setOpenModalDelete ] = useState(false)

  return (
    <>
      <ModalDeleteProduct openModalDelete={openModalDelete} setOpenModalDelete={setOpenModalDelete} id={products.id_category}/>
      <table className="border-spacing-6 border-separate">
        <thead>
          <tr>
            <th className="text-start">Nombre</th>
            <th className="text-start">Descripcion</th>
            <th className="text-start">Precio</th>
            <th className="text-start">Cantidad</th>
            <th className="text-start">Categoria</th>
            <th className="text-start">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product) => {
              return (
                <tr key={product.sku}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.stock_quantity}</td>
                  <td>{product.id_category}</td>
                  <td className="flex items-center space-x-2">
                    <ButtonUpdate/>
                    <ButtonDelete handleClick={() => setOpenModalDelete(true)}/>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}