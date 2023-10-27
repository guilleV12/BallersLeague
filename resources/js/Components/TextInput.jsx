import { forwardRef, useEffect, useRef, useState } from 'react';

export default forwardRef(function TextInput(
  {
    sacarPadding=null,
    type = 'text',
    className = '',
    isFocused = false,
    icon = null, // Nueva prop para el icono
    ...props
  },
  ref
) {
  const [value, setValue] = useState(props.value || '');
  const inputRef = ref || useRef();

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex w-[3rem] justify-center items-center pointer-events-none bg-gray-300 rounded-l-md">
          {icon}
        </div>
      )}
      <input
        {...props}
        type={type}
        className={
          ` border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm ${sacarPadding?`px-5`:`pl-14`} text-sm ` +
          className
        }
        ref={inputRef}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
});
