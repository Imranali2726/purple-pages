import SearchFilterLogic from "./SearchFilterLogic";

export default function SearchFilter() {
  const { filter } = SearchFilterLogic();
  return (
    <form>
      <div className="p-[17px] grid sm:grid-cols-1 md:grid-cols-5 rounded-[12px] bg-white items-center pp-shadow">
        {filter?.map((item, idx) => (
          <div
            className={`md:first:pl-0 px-4 mb-2 md:mb-0  ${
              idx === filter.length - 1 ? "" : "md:border-r"
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

        <div className="mt-4 md:pl-4 md:mt-0">
          <button
            type="button"
            className="
           bg-primary rounded-lg py-4 px-6 w-full text-white transition hover:bg-[#2CB579]"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
