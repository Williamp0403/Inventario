import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function Input({ type, placeholder, register, name, errors }) {
  return (
    <Box
      className="col-span-1"
      sx={{ '& > :not(style)': { mt: 1} }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        type={type}
        error={!!errors} // Activa el estilo de error si hay errores
        helperText={errors?.message} // Muestra el mensaje de error en helperText
        {...register(name, { valueAsNumber: type === "number" })}  
        id="outlined-basic" 
        label={placeholder} 
        variant="outlined" />
    </Box>
  )
}

export function Textarea ({ placeholder, register, name, errors }) {
  return (
    <Box
      className="col-span-2"
      sx={{ '& > :not(style)': { mt: 1} }}
      noValidate
      autoComplete="off"
    >
      <TextField
        className='w-full'
        id="outlined-multiline-static"
        error={!!errors} // Activa el estilo de error si hay errores
        helperText={errors?.message} // Muestra el mensaje de error en helperText
        label={placeholder}
        {...register(name)}  
        multiline
        rows={3}
      />
    </Box>
  )
}
