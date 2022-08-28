import SingleListingResult from "./base/SingleListingResult";

export default function SearchList({ data, error, loading }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {data?.map((item) => (
        <SingleListingResult singleListData={item} key={item.id} />
      ))}
    </div>
  );
}
