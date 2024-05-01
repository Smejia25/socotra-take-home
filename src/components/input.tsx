import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  field: string;
  label: string;
  register: any;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type, field, label, register, errorMessage, ...props },
  ref
) {
  return (
    <div className="font-roboto font-normal mt-3">
      <label
        htmlFor={field}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={field}
          {...props}
          {...register(field)}
          autoComplete="given-name"
          className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
        />
        {errorMessage && (
          <p className="mt-2 text-sm text-red-400">{errorMessage}</p>
        )}
      </div>
    </div>
  );
});

export default Input;
