import { useState, useRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { FaAngleDown } from "react-icons/fa";
// import { useRouter } from "next/router";
import { setFilterData } from "../../reducers/filterSearch";

export default function SingleSideFilter({ singleFilterData }) {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef();
  const arrowIcon = useMemo(
    () => ({
      className: `fill-[#2CB579] transition-transform ${
        isActive ? "rotate-180" : ""
      }`,
    }),
    [isActive],
  );
  return (
    <div className="w-full">
      <button
        type="button"
        className="font-bold text-lg border w-full p-4 text-left flex items-center justify-between"
        onClick={() => setIsActive(!isActive)}
      >
        <span className="capitalize">{singleFilterData?.name}</span>
        <span>
          <IconContext.Provider value={arrowIcon}>
            {" "}
            <FaAngleDown />
          </IconContext.Provider>
        </span>
      </button>
      <div
        className={`overflow-hidden bg-[#F1ECF7] transition-[height_500ms_ease-in-out] ${
          isActive ? "border border-t-0" : ""
        }`}
        ref={ref}
        style={{ height: isActive ? ref.current.scrollHeight : "0px" }}
      >
        <div className="flex flex-wrap gap-x-1 gap-y-3 p-4">
          {singleFilterData?.filters?.map((item) => (
            <BaseSideFilter
              name={singleFilterData?.name}
              item={item}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BaseSideFilter({ name, item }) {
  const dispatch = useDispatch();
  function handleFilterChange(e) {
    const { name, id, checked } = e.target;
    if (checked) {
      // console.log(name, id);
      dispatch(setFilterData({ name, id }));
    } else console.log(name, 0);
  }
  return (
    <>
      <input
        type="checkbox"
        name={name}
        id={item?.id}
        className="hidden filter-checkbox"
        onChange={handleFilterChange}
      />
      <label
        htmlFor={item?.id}
        className="py-3 px-4 text-sm lg:text-base bg-white rounded-lg font-medium cursor-pointer filter-label "
      >
        {item?.name}
      </label>
    </>
  );
}

BaseSideFilter.propTypes = {
  name: PropTypes.string.isRequired,
};
