export default function TextareaInput({
  className,
  name,
  label,
  placeholder,
  error,
  onChange,
  border,
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="flex flex-col gap-y-3 w-full">
        {label && (
          <span className="font-semibold text-base lg:text-lg xl:text-xl 2xl:text-[25px] text-[#737373]">
            {label}
          </span>
        )}
        <textarea
          name={name}
          rows={6}
          id={name}
          placeholder={placeholder}
          className={`form-input resize-none ${border ? "border" : ""} ${
            error ? "border-red-600" : "border-[#B9B9B9]"
          }`}
          onChange={onChange}
        />
      </label>
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
}
