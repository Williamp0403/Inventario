import { TransactionModel } from "../models/transaction.js"

export const getTransactions = async (req,res) => {
  try {
    const response = await TransactionModel.getTransaction()
    res.send(response)
  } catch (e) {
    console.log(e)
  }
}