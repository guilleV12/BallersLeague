import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function DateInput({ type = 'date', className = '', isFocused = false, max = '',...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            max={max}
            className={
                'border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm text-sm ' +
                className
            }
            ref={input}
        />
    );
});
