interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="w-full bg-transparent rounded-md focus:ring-2 focus:outline-none ring-1 ring-neutral-200 border-none placeholder:text-neutral-400 focus:ring-orange-400"
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {errors}
        </span>
      ))}
    </div>
  );
}