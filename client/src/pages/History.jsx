import { useEffect } from "react"
import { useTransaction } from "../hooks/useTransaction"
import { TransactionCreate, TransactionDelete, TransactionUpdate } from "../components/Transaction"
import Loading from "../components/Loading"

export function History () {
  const { getTransactions, transactions, loading } = useTransaction()

  useEffect(() => {
    getTransactions()
  }, [])

  const isTransactions = transactions?.length > 0

  return (
    <main className="container mx-auto">
      <section className="p-8 sm:p-12">
        <h1 className="font-medium text-2xl sm:text-4xl mb-10">Movimientos</h1> 
        {
          loading ? <Loading/> 
          : isTransactions && !loading ? (
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-zinc-400 font-medium">
                    <td className="px-4 py-3">Fecha y Hora</td>
                    <td className="px-4 py-3">Accion</td>
                    <td className="px-4 py-3">Producto</td>
                    <td className="px-4 py-3">Detalles</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    transactions.map((transaction) => {
                      if (transaction.operation === "INSERT") {
                        return <TransactionCreate transaction={transaction} key={transaction.id_transaction}/>
                      } else if(transaction.operation === "UPDATE") {
                        return <TransactionUpdate transaction={transaction} key={transaction.id_transaction}/>
                      } else return <TransactionDelete transaction={transaction} key={transaction.id_transaction}/>                  
                    })
                  }
                </tbody>
              </table>
            </div>
          ): <h1>No hay Movimientos.</h1>

        }
      </section>
    </main>
  )
}