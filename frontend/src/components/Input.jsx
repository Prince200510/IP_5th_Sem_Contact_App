import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-neutral text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
