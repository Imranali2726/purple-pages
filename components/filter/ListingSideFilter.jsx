import SingleSideFilter from "../base/SingleSideFilter";
import sideFilters from "../../fakeData/sideFilters";

export default function ListingSideFilter() {
  return (
    <div>
      {sideFilters.map((item) => (
        <SingleSideFilter
          name={item.name}
          filters={item.filters}
          key={item.name}
        />
      ))}
    </div>
  );
}
