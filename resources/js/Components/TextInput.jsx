import { forwardRef, useEffect, useRef, useState } from 'react';

export default forwardRef(function TextInput(
  { type = 'text', className = '', isFocused = false, ...props },
  ref
) {
  const [value, setValue] = useState(props.value || ''); // Manejar el valor del campo de entrada
  const inputRef = ref || useRef();

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  // Manejar cambios en el valor del campo de entrada
  const handleChange = (e) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e); // Propagar el evento onChange
    }
  };

  return (
    <input
      {...props}
      type={type}
      className={
        'border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm ' +
        className
      }
      ref={inputRef}
      value={value} // Establecer el valor del campo de entrada
      onChange={handleChange} // Manejar cambios en el valor del campo de entrada
    />
  );
});
