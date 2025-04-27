import { db } from "../config/db.js"

export class CategoriesModel {
  static async queryGetCategories () {
    const getCategories = await db.execute('SELECT * FROM Categories')
    return getCategories.rows
  }

  static async queryCreateCategory (data) {
    const { name } = data

    const existingCategory = await db.execute({
      sql: 'SELECT * FROM Categories WHERE name = ?',
      args: [name]
    })

    if(existingCategory.rows.length > 0) return { status: 409, message: "Esta categoria ya existe." }

    const createCategory = await db.execute({
      sql: 'INSERT INTO Categories (name) VALUES (?) RETURNING *',
      args: [name]
    })

    if (createCategory.rowsAffected === 0) return { status: 400, message: 'No se pudo crear la categoria.' }

    return { success: true, category: createCategory.rows[0]}
  }

  static async queryUpdateCategory (id, data) {
    const { name } = data

    const categoryExists = await db.execute({
      sql: `SELECT * FROM Categories WHERE id_category = ?`,
      args: [id]
    })
    if (categoryExists.rows.length === 0) return { status: 404, message: "La categoría no existe." };
  
    const existingName = await db.execute({
      sql: 'SELECT * FROM Categories WHERE name = ? AND id_category != ?',
      args: [name, id]
    })
    if (existingName.rows.length > 0) return { status: 409, message: "El nombre de la categoría ya está en uso." };
    
    await db.execute({
      sql: 'UPDATE Categories SET name = ? WHERE id_category = ?',
      args: [name, id]
    })

    const updatedCategory = await db.execute({
      sql: `SELECT * FROM Categories WHERE id_category = ?`,
      args: [id]
    })

    return { message: "Categoría actualizada correctamente.", category: updatedCategory.rows[0] };
  }

  static async queryDeleteCategory (id) {
    const existingCategory = await db.execute({
      sql: 'SELECT * FROM Categories WHERE id_category = ?',
      args: [id]
    })

    console.log(id)

    if(existingCategory.rows.length === 0) return { success: false, message: 'La categoria no existe.' }

    const deletCategory = await db.execute({
      sql: 'DELETE FROM Categories WHERE id_category = ?',
      args: [id]
    })

    console.log(deletCategory)

    return { success: true, message: 'Categoria elimanada correctamente.' }
  }
} 