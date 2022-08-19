import { useState } from "react";

export default function SearchFilter() {
  const [edit, setEdit] = useState({
    select1: false,
    select2: false,
    select3: false,
    select4: false,
  });
  const filter = [
    {
      label: "Identity",
      name: "select1",
      component: (
        <select
          className="w-full text-sm relative bg-white"
          style={{ color: edit.select1 ? "black" : "#9e9e9e" }}
          defaultValue={0}
          id="select1"
          name="select1"
          onChange={() => setEdit({ ...edit, select1: true })}
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
          style={{ color: edit.select2 ? "black" : "#9e9e9e" }}
          id="select2"
          name="select2"
          onChange={() => setEdit({ ...edit, select2: true })}
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
          style={{ color: edit.select3 ? "black" : "#9e9e9e" }}
          name="select3"
          onChange={() => setEdit({ ...edit, select3: true })}
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
          style={{ color: edit.select4 ? "black" : "#9e9e9e" }}
          id="select4"
          name="select4"
          onChange={() => setEdit({ ...edit, select4: true })}
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
