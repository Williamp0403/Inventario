import { useState } from "react"
import { getTransactionsRequest } from "../api/transaction"

export function useTransaction () {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  async function getTransactions () {
    try {
      const response = await getTransactionsRequest()
      setTransactions(response.data)
    } catch(e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    transactions,
    getTransactions
  }
}