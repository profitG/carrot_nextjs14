import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors?: string[];
  // type: string;
  // placeholder: string;
  // required: boolean;
}

export default function Input({
  name,
  errors = [],
  ...extraProps
}: // type,
// placeholder,
// required,
InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="w-full bg-transparent rounded-md focus:ring-2 focus:outline-none ring-1 ring-neutral-200 border-none placeholder:text-neutral-400 focus:ring-orange-400"
        // type={type}
        // placeholder={placeholder}
        // required={required}
        {...extraProps}
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {errors}
        </span>
      ))}
    </div>
  );
}
