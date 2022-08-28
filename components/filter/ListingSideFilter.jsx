import SingleSideFilter from "../base/SingleSideFilter";

export default function ListingSideFilter({ loading, error, filters }) {
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
      {filters?.map((item) => (
        <SingleSideFilter singleFilterData={item} key={item.key} />
      ))}
    </div>
  );
}
