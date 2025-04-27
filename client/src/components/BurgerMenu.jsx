import { useState } from "react"
import CategoryIcon from '@mui/icons-material/CategoryOutlined';
import HistoryIcon from '@mui/icons-material/HistoryOutlined'
import MenuIcon from '@mui/icons-material/MenuOutlined'
import CloseIcon from '@mui/icons-material/CloseOutlined';
import { NavLink } from "react-router-dom";

export function BurguerMenu ({ className }) {
  const [ isOpen, setIsOpen ] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className={className}>
      <MenuIcon className='cursor-pointer' fontSize='large' onClick={toggleMenu}/>
      <div className={`${ isOpen ? 'translate-x-0' : 'translate-x-full'} fixed top-0 right-0 h-screen w-[calc(100vw-150px)] bg-zinc-200 dark:bg-zinc-800 transition-transform duration-300 ease-in-out z-10`}>
        <div className="p-5">
          <div className="flex justify-end mb-10">
            <CloseIcon className='cursor-pointer' fontSize='large' onClick={toggleMenu}/>
          </div>
          <ul className="flex flex-col space-y-10 justify-center items-center">
            <li onClick={toggleMenu} className='flex space-x-2'>
              <CategoryIcon/>
              <NavLink to='/category' className='tracking-wide'>Categorías</NavLink>
            </li>
            <li onClick={toggleMenu} className='flex space-x-2'>
              <HistoryIcon/>
              <NavLink to='/history' className='tracking-wide'>Movimientos</NavLink>
          </li>
          </ul>
        </div>
      </div>
      {
        isOpen && <div onClick={toggleMenu} className="fixed top-0 right-0 left-0 bottom-0 h-screen bg-zinc-700 opacity-75"></div>
      }
    </nav>
  )
}