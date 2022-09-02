import SearchFilterLogic from "./SearchFilterLogic";

export default function SearchFilter({ handleSubmit, listPage = false }) {
  const { filter, handleSearch, disabled } = SearchFilterLogic();
  return (
    <form onSubmit={listPage ? handleSubmit : handleSearch}>
      <div className="p-[17px] grid sm:grid-cols-1 lg:grid-cols-5 rounded-[12px] bg-white items-center pp-shadow">
        {filter?.map((item, idx) => (
          <div
            className={`lg:first:pl-0 px-4 mb-2 lg:mb-0  ${
              idx === filter.length - 1 ? "" : "lg:border-r"
            } `}
            key={item.name}
          >
            <label htmlFor={item.name}>
              <span className="font-bold text-lg lg:text-xl">
                {" "}
                {item.label}
              </span>
              <div className="filter-search">{item.component}</div>
            </label>
          </div>
        ))}

        <div className="mt-4 md:pl-4 lg:mt-0">
          <button
            disabled={disabled}
            type="submit"
            className={`
           bg-primary rounded-lg py-4 px-6 w-full text-white transition  ${
             disabled ? "opacity-60" : "hover:bg-[#2CB579]"
           }`}
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
