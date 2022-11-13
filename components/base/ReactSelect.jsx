import { startCase } from "lodash";
import Select from "react-select";
import { useId } from "react";

export default function SelectInput({
  name,
  onChange,
  className,
  label,
  error,
  options,
  isMulti = false,
  classNamePrefix = "react-select",
  defaultValue,
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="flex flex-col gap-y-3 w-full">
        {label && (
          <span className="font-semibold block text-base lg:text-lg xl:text-xl 2xl:text-[22px] text-[#737373]">
            {label}
          </span>
        )}
        <Select
          name={name}
          options={options}
          isMulti={isMulti}
          onChange={onChange}
          classNamePrefix={classNamePrefix}
          instanceId={useId()}
          value={defaultValue}
        />
      </label>
      {error && <p className="text-red-600 text-xs mt-2">{startCase(error)}</p>}
    </div>
  );
}
