import React, { useEffect, useState } from "react";

export function InlineEditing({ setValue, name, active, value }) {
  // Estado local para manejar el valor del input
  const [inputValue, setInputValue] = useState(value);

  // Actualizamos el estado local y React Hook Form cuando se activa la edición o cambia el valor inicial
  useEffect(() => {
    if (active) {
      setInputValue(value);
      setValue(name, value);
    }
  }, [active, value, name, setValue]);

  // Manejador para cambios en el input
  const handleChange = (e) => {
    setInputValue(e.target.value);
    setValue(name, e.target.value); // Actualiza el valor en el formulario
  };

  return active ? (
    <input
      value={inputValue}
      onChange={handleChange}
      autoFocus // Opcional: coloca el foco automáticamente al editar
    />
  ) : (
    <h3>{value}</h3>
  );
}
