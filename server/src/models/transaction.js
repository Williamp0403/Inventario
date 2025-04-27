import { db } from "../config/db.js";

export class TransactionModel {
  static async getTransaction () {
    const transaction = await db.execute(
      `SELECT id_transaction, operation, record_id, new_value, old_value, datetime(change_time, '-4 hours') AS change_time 
      FROM Transactions ORDER BY change_time DESC`
    )
    return transaction.rows
  }
}