import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useCategories } from '../context/CategoryContext';
import { FormHelperText } from '@mui/material';

export default function SelectSmall({ register, name, errors, category }) {
  const [option, setOption] = React.useState(category || '');
  const { categories } = useCategories();

  // Obtén el objeto de registro para el campo
  const {
    onChange: formOnChange,
    ...restRegister
  } = register(name);

  const handleChange = (event) => {
    setOption(event.target.value);
    formOnChange(event); // Llama al onChange de react-hook-form
  };

  return (
    <div className='col-span-2'>
      <FormControl fullWidth error={!!errors}>
        <InputLabel id="demo-select-small-label">Categoría</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={option}
          label="Categoria"
          name={name}
          {...restRegister}
          onChange={handleChange}
        >
          {categories.map((category) => {
            return (
              <MenuItem key={category.id_category} value={category.id_category}>
                {category.name}
              </MenuItem>
            );
          })}
        </Select>
        {errors && <FormHelperText>{errors.message}</FormHelperText>}
      </FormControl>
    </div>
  );
}
