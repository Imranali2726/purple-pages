export default function SearchFilter() {
  const filter = [
    {
      label: "Identity",
      name: "select1",
      component: (
        <select
          className="w-full text-sm relative bg-white"
          defaultValue={0}
          id="select1"
          name="select1"
        >
          <option value="0" disabled hidden>
            Who I am?
          </option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      ),
    },
    {
      label: "Location",
      name: "select2",
      component: (
        <select
          className="w-full text-sm relative bg-white"
          defaultValue={0}
          id="select2"
          name="select2"
        >
          <option value="0" disabled hidden>
            Where are you located?
          </option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      ),
    },
    {
      label: "Services",
      name: "select3",
      component: (
        <select
          className="w-full text-sm relative bg-white"
          defaultValue={0}
          id="select3"
          name="select3"
        >
          <option value="0" disabled hidden>
            What are you looking for?
          </option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      ),
    },
    {
      label: "Type",
      name: "select4",
      component: (
        <select
          className="w-full text-sm relative bg-white"
          defaultValue={0}
          id="select4"
          name="select4"
        >
          <option value="0" disabled hidden>
            Type of service ?
          </option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      ),
    },
  ];
  return (
    <form>
      <div className="p-[17px] grid sm:grid-cols-1 md:grid-cols-5 rounded-[12px] bg-white items-center">
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
              {item.component}
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
