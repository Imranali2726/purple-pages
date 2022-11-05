import { useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { FaAngleDown } from "react-icons/fa";
import { setFilterData, removeFilterData } from "../../reducers/filterSearch";

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
        className={`overflow-auto bg-[#F1ECF7] max-h-[500px] transition-[height_500ms_ease-in-out] ${
          isActive ? "border border-t-0" : ""
        }`}
        ref={ref}
        style={{
          height: isActive ? `${ref.current.scrollHeight}px` : "0px",
        }}
      >
        <div className="flex flex-wrap gap-x-1 gap-y-3 p-4">
          {singleFilterData?.filters?.map((item) => (
            <BaseSideFilter
              name={singleFilterData?.key}
              item={item}
              key={item.id + item.name}
            />
          ))}
          {singleFilterData?.sub_accessibility_features?.map((item) => (
            <BaseSideFilter
              name="sub_accessibility_features"
              item={item}
              key={item.id + item.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BaseSideFilter({ name, item }) {
  const dispatch = useDispatch();
  const filterSearch = useSelector((state) => state.filterSearch.value);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      dispatch(setFilterData({ name, value }));
    } else {
      dispatch(removeFilterData({ name, value }));
    }
  };

  return (
    <>
      <input
        type="checkbox"
        name={name?.toLowerCase()}
        id={item?.name}
        value={item?.value ?? item?.id}
        defaultChecked={filterSearch[name?.toLowerCase()]?.includes(
          item?.value?.toString() ?? item?.id?.toString(),
        )}
        className="hidden filter-checkbox"
        onChange={handleFilterChange}
      />
      <label
        htmlFor={item?.name}
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
