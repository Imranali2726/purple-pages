import React from "react";
import SingleSideFilter from "../base/SingleSideFilter";

function ListingSideFilter({ loading, error, filters }) {
  if (loading) return <div>Loading...</div>;

  if (error) {
    return (
      <div>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {filters?.map((item) =>
        item?.key === "accessibility_needs" ? (
          item?.filters?.map((c) => (
            <SingleSideFilter singleFilterData={c} key={c.id} />
          ))
        ) : (
          <SingleSideFilter singleFilterData={item} key={item.key} />
        ),
      )}
    </div>
  );
}

export default React.memo(ListingSideFilter);
