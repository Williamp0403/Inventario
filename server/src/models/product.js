import { db } from "../config/db.js"

export class ProductsModel {
  static async queryGetProducts () {
    const products = await db.execute(
      `SELECT id_product, sku, p.name, description, price, stock_quantity, p.id_category, c.name name_category
       FROM Products p JOIN Categories c ON c.id_category = p.id_category`)
    return products.rows
  }

  static async queryCreateProduct (data) {
    const { sku, name, description, price, stock_quantity, id_category } = data

    const existingProduct = await db.execute({
      sql: `SELECT * FROM Products WHERE sku = ?`,
      args: [sku]
    })
  
    if (existingProduct.rows.length > 0) {
      return { status: 409, message: "El SKU ya existe, no se puede duplicar el producto." }
    }

    const newProduct = await db.execute({
      sql: 'INSERT INTO Products (sku, name, description, price, stock_quantity, id_category) VALUES (? ,?, ?, ?, ?, ?)',
      args: [sku, name, description, price, stock_quantity, id_category]
    })
    
    if (!newProduct.lastInsertRowid) return { status: 500, message: 'No se pudo crear el producto.' }

    const getNewProduct = await db.execute({
      sql: `SELECT id_product, sku, p.name, description, price, stock_quantity, p.id_category, c.name name_category
       FROM Products p JOIN Categories c ON c.id_category = p.id_category WHERE id_product = ?`,
      args: [Number(newProduct.lastInsertRowid)]
    })

    return { message: 'Producto creado exitosamente.', product: getNewProduct.rows}
  }

  static async queryUpdateProduct (id, data) {
    const { name, description, price, stock_quantity, id_category } = data

    const existingProduct = await db.execute({
      sql: 'SELECT * FROM Products WHERE id_product = ?',
      args: [id]
    })

    if(existingProduct.rows.length === 0) return { status: 404, message: 'EL producto no existe.' }

    const updateProduct = await db.execute({
      sql: `UPDATE Products SET name = ?, description = ?, price = ?, stock_quantity = ?, id_category = ? 
            WHERE id_product = ?`,
      args: [name, description, price, stock_quantity, id_category, id]
    })

    console.log(updateProduct)

    if(updateProduct.rowsAffected === 0) return { status: 500, message: 'No se pudo actualizar el producto.' }

    const getUpdatedProduct = await db.execute({
      sql: `SELECT id_product, sku, p.name, description, price, stock_quantity, p.id_category, c.name name_category
       FROM Products p JOIN Categories c ON c.id_category = p.id_category WHERE id_product = ?`,
      args: [id]
    })

    return { message: 'Producto actualizado correctamente.', product: getUpdatedProduct.rows }
  }

  static async queryDeleteProduct (id) {
    const existingProduct = await db.execute({
      sql: 'SELECT * FROM Products WHERE id_product = ?',
      args: [id]
    })

    if(existingProduct.rows.length === 0) return { success: false, message: 'EL producto no existe.' }

    await db.execute({
      sql: 'DELETE FROM Products WHERE id_product = ?',
      args: [id]
    })

    return { success: true, message: "Producto eliminado correctamente." }
  }
}
