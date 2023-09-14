export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-orange-600 shadow-sm focus:ring-orange-500 ' +
                className
            }
        />
    );
}
