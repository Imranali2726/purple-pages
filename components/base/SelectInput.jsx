import { startCase } from "lodash";

export default function SelectInput({
  name,
  id,
  children,
  onChange,
  className,
  label,
  error,
  value,
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex flex-col gap-y-3 w-full">
        {label && (
          <span className="font-semibold block text-base lg:text-lg xl:text-xl 2xl:text-[22px] text-[#737373]">
            {label}
          </span>
        )}
        <select
          name={name}
          id={id}
          value={value ?? ""}
          onChange={onChange}
          className="form-input"
        >
          {children}
        </select>
      </label>
      {error && <p className="text-red-600 text-xs mt-2">{startCase(error)}</p>}
    </div>
  );
}
