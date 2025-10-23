export default function Button({ children, variant = 'primary', type = 'button', onClick, disabled, className = '' }) {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-blue-900',
    secondary: 'bg-neutral text-white hover:bg-gray-700',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>{children}</button>
  );
}
