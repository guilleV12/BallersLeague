import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function FileInput({ type = 'file', className = '', isFocused = false, ...props }, ref) {
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
            className={
                'block w-full text-sm focus:border-orange-500 focus:ring-orange-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50' +
                className
            }
            ref={input}
        />
    );
});
