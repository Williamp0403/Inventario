import { db } from "../config/db.js"

export async function runMigrations () {
  try {
    await db.batch([
      `CREATE TABLE IF NOT EXISTS Categories (
        id_category INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      )`,
      `CREATE TABLE IF NOT EXISTS Products (
        id_product INTEGER PRIMARY KEY AUTOINCREMENT,
        sku TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL, 
        stock_quantity INTEGER NOT NULL DEFAULT 0,
        id_category INTEGER,
        FOREIGN KEY(id_category) REFERENCES Categories(id_category)
      )`,
      `CREATE TABLE IF NOT EXISTS Transactions (
        id_transaction INTEGER PRIMARY KEY AUTOINCREMENT,
        table_name TEXT NOT NULL,
        operation TEXT NOT NULL,
        record_id INTEGER NOT NULL,
        old_value TEXT,
        new_value TEXT,
        change_time DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    ])
  
    await db.execute(
      ` CREATE TRIGGER IF NOT EXISTS trigger_product_update
        AFTER UPDATE ON Products
        BEGIN
          INSERT INTO transactions (table_name, operation, record_id, old_value, new_value)
          VALUES (
            'Products',
            'UPDATE',
            OLD.id_product,
            json_object('name', OLD.name, 'description', OLD.description, 'price', OLD.price, 'stock_quantity', OLD.stock_quantity),
            json_object('name', NEW.name, 'description', NEW.description, 'price', NEW.price, 'stock_quantity', NEW.stock_quantity)
          );
        END;`
    )
  
    await db.execute(
      ` CREATE TRIGGER IF NOT EXISTS trigger_product_insert
        AFTER INSERT ON Products
        BEGIN
          INSERT INTO transactions (table_name, operation, record_id, new_value)
          VALUES (
            'Products',
            'INSERT',
            NEW.id_product,
            json_object('name', NEW.name, 'description', NEW.description, 'price', NEW.price, 'stock_quantity', NEW.stock_quantity)
          );
        END;`
    )
  
    await db.execute(
      ` CREATE TRIGGER IF NOT EXISTS trigger_product_delete
        AFTER DELETE ON Products
        BEGIN
          INSERT INTO transactions (table_name, operation, record_id, old_value)
          VALUES (
            'Products',
            'DELETE',
            OLD.id_product,
            json_object('name', OLD.name, 'description', OLD.description, 'price', OLD.price, 'stock_quantity', OLD.stock_quantity)
          );
        END;`
    ) 
    console.log("Migraciones ejecutadas correctamente.");
  } catch (e) {
    console.error("Error al ejecutar migraciones:", e);
    process.exit(1);
  }
}