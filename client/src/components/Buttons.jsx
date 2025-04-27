import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import { Tooltip } from '@mui/material';

export function ButtonUpdate ({handleClick}) {
  return (
    <Tooltip title={<span style={{ fontSize: '14px' }}>Editar</span>}  placement="top">
    <button onClick={handleClick} className='cursor-pointer bg-blue-400/90 hover:bg-blue-300 p-1 rounded-md'>
      <EditIcon sx={{ fill: 'white' }}/>
    </button>
    </Tooltip>
  )
}

export function ButtonDelete ({handleClick}) {
  return (
    <Tooltip title={<span style={{ fontSize: '14px' }}>Eliminar</span>}  placement="top-end">
      <button onClick={handleClick} className='cursor-pointer bg-red-500/90 hover:bg-red-400 p-1 rounded-md'>
        <DeleteIcon sx={{ fill: 'white' }}/>
      </button>
    </Tooltip>
  )
}

export function ButtonCancel ({handleClick}) {
  return (
    <Tooltip title={<span style={{ fontSize: '14px' }}>Cancelar</span>}  placement="top">
      <button type='button' onClick={handleClick} className='cursor-pointer bg-zinc-500/90 hover:bg-zinc-400 p-1 rounded-md'>
        <CloseIcon sx={{ fill: 'white' }}/>
      </button>
    </Tooltip>
  )
}

export function ButtonSave ({handleClick}) {
  return (
    <Tooltip title={<span style={{ fontSize: '14px' }}>Guardar</span>}  placement="top">
      <button type='submit' onClick={handleClick} className='cursor-pointer bg-green-500/90 hover:bg-green-400 p-1 rounded-md'>
        <SaveIcon sx={{ fill: 'white' }}/>
      </button>
    </Tooltip>
  )
}

export function ButtonCreate ({handleClick, text}) {
  return (
    <button onClick={handleClick} className="cursor-pointer text-cyan-700 text-sm sm:text-md font-bold border border-cyan-700 px-4 sm:px-6 sm:py-2 rounded-md transition ease-in-out duration-500 hover:bg-sky-700 hover:text-zinc-100 hover:dark:text-zinc-900">{text}</button>
  )
}