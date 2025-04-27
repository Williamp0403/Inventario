import HistoryIcon from '@mui/icons-material/HistoryOutlined'
import InventoryIcon from '@mui/icons-material/Inventory2Outlined'
import CategoryIcon from '@mui/icons-material/CategoryOutlined';
import { BurguerMenu } from './BurgerMenu'
import ModeTheme from './ModeTheme'
import { NavLink } from 'react-router-dom'

export function Header () {
  return (
    <header className="sticky inset-0 bg-zinc-100 dark:bg-zinc-900">
      <nav className="flex p-5 sm:px-10 items-center justify-between">
        <div className='flex items-center space-x-2'>
          <InventoryIcon/>
          <NavLink to='/' className='text-xl font-bold tracking-wide'>Inventario</NavLink>
        </div>
        <ul className="hidden sm:flex sm:space-x-10 sm:items-center">
          <li className='flex space-x-2'>
            <CategoryIcon/>
            <NavLink to='/category' className='tracking-wide'>Categorías</NavLink>
          </li>
          <li className='flex space-x-2'>
            <HistoryIcon/>
            <NavLink to='/history' className='tracking-wide'>Movimientos</NavLink>
          </li>
        </ul>
        <div className='flex items-center space-x-3 sm:space-x-0'>
          <ModeTheme/>
          <BurguerMenu className='block relative sm:hidden'/>
        </div>
      </nav>
    </header>
  )
}