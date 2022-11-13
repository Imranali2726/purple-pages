import { startCase } from "lodash";

export default function TextInput({
  error,
  type,
  label,
  name,
  id,
  placeholder,
  onChange,
  value,
  className,
  border = false,
  anonymous = false,
  anonyFunc,
  anonyChecked,
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex flex-col gap-y-3 w-full">
        {label && (
          <span className="font-semibold text-base lg:text-lg xl:text-xl 2xl:text-[22px] text-[#737373] flex items-center justify-between">
            {label}
            {anonymous && (
              <label htmlFor={`is_${name}_anonymous`} className="flex">
                <span className="text-xs">Make Anonymous</span>
                <input
                  type="checkbox"
                  name={`is_${name}_anonymous`}
                  id={`is_${name}_anonymous`}
                  className="ml-1"
                  onChange={anonyFunc}
                  defaultChecked={anonyChecked}
                />{" "}
              </label>
            )}
          </span>
        )}
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value ?? ""}
          className={`form-input ${border ? "border" : ""} ${
            error ? "border-red-600" : "border-[#B9B9B9]"
          }`}
          onChange={onChange}
        />
      </label>
      {error && <p className="text-red-600 text-xs mt-2">{startCase(error)}</p>}
    </div>
  );
}
