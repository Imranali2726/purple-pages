import SingleListingResult from "./base/SingleListingResult";

export default function SearchList({ data, error, loading }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <div className="mt-4">
        {data.length > 0 ? (
          data?.map((item) => (
            <SingleListingResult singleListData={item} key={item.id} />
          ))
        ) : (
          <p className="text-sm text-red-500"> No data found. </p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }
}
