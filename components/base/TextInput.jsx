export default function TextInput({
  error,
  type,
  label,
  name,
  placeholder,
  onChange,
  className,
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="flex flex-col gap-y-3 w-full">
        {label && (
          <span className="font-semibold text-base lg:text-lg xl:text-xl 2xl:text-[25px] text-[#737373]">
            {label}
          </span>
        )}
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={`form-input ${
            error ? "border-red-600" : "border-[#B9B9B9]"
          }`}
          onChange={onChange}
        />
      </label>
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
}
