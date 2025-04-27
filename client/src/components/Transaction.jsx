export function TransactionCreate ({ transaction }) {
  return (
    <tr className="">
      <td className="border-t border-zinc-600 px-4 py-3"><p>{transaction.change_time}</p></td>
      <td className="border-t text-sm border-zinc-600 px-4 py-3"><p className="dark:bg-green-600 bg-green-400 font-medium rounded-full px-2 py-1 inline">Añadido</p></td>
      <td className="border-t border-zinc-600 px-4 py-3"><h2>{JSON.parse(transaction.new_value).name}</h2></td>
      <td className="border-t border-zinc-600 px-4 py-3"><p className="truncate">Producto añadido con cantidad inicial en stock de {JSON.parse(transaction.new_value).stock_quantity}</p></td>
    </tr>
  )
}

export function TransactionUpdate ({ transaction }) {
  return (
    <tr className="">
      <td className="border-t border-zinc-600 px-4 py-3"><p>{transaction.change_time}</p></td>
      <td className="border-t text-sm border-zinc-600 px-4 py-3"><p className="dark:bg-cyan-700 bg-cyan-500 font-medium rounded-full px-2 py-1 inline">Actualizado</p></td>
      <td className="border-t border-zinc-600 px-4 py-3"><h2>{JSON.parse(transaction.new_value).name}</h2></td>
      <td className="border-t border-zinc-600 px-4 py-3"><p>Producto actualizado</p></td>
    </tr>
  )
}

export function TransactionDelete ({ transaction }) {
  return (
    <tr className="">
      <td className="border-t border-zinc-600 px-4 py-3"><p>{transaction.change_time}</p></td>
      <td className="border-t text-sm border-zinc-600 px-4 py-3"><p className="dark:bg-red-600 bg-red-400 font-medium rounded-full px-2 py-1 inline">Eliminado</p></td>
      <td className="border-t border-zinc-600 px-4 py-3"><h2>{JSON.parse(transaction.old_value).name}</h2></td>
      <td className="border-t border-zinc-600 px-4 py-3"><p>Producto Eliminado</p></td>
    </tr>
  )
}