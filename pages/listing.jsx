// import { useEffect } from "react";
import { IconContext } from "react-icons";
import { HiLocationMarker } from "react-icons/hi";
import SingleListingResult from "../components/base/SingleListingResult";
import ListingSideFilter from "../components/filter/ListingSideFilter";
import SearchFilter from "../components/filter/SearchFilter";
// import { getSearchResults } from "../services/apiCalls";

const mapIcon = { className: "fill-primary" };
export default function Listing() {
  // const [searchResults, setSearchResults] = useState([]);
  // async function getSearch() {
  //   const params = window.location.href.split("?")[1];
  //   const res = await getSearchResults(params);
  //   console.log(res.data);
  // }
  // useEffect(() => {
  //   getSearch();
  // }, []);
  return (
    <>
      <section className="internal-header-bg h-screen  max-h-[500px] lg:max-h-[550px] xl:max-h-[600px] 2xl:max-h-[690px] pt-[65px] lg:pt-[94px] mt-[-65px] lg:mt-[-94px]">
        <div className="internal-header-overlay h-full">
          <div className="pp-container pt-10 md:pt-[100px] xl:pt-[120px] 2xl:pt-[163px]">
            <h1 className="text-[36px] md:text-[48px] lg:text-[56px] xl:text-[72px] 2xl:text-[84px] font-bold text-white ">
              Find the Right Institute
            </h1>
            <p className="text-lg md:text-xl xl:text-2xl 2xl:text-3xl text-white -mt-1">
              What are you looking for ?
            </p>
          </div>
        </div>
      </section>
      <section className="relative h-[150px] md:h-[45px]">
        <div className="absolute top-[-230px] md:-top-[45px] inset-x-0">
          <div className="px-8 md:max-w-[720px] lg:max-w-[991px] xl:max-w-[1100px] 2xl:max-w-[1320px] mx-auto ">
            <SearchFilter />
          </div>
        </div>
      </section>
      <section className="mt-4 md:mt-[75px] pp-container">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[340px_1fr] gap-8 xl:gap-16">
          <ListingSideFilter />
          <div className="md:mt-8 lg:mt-0">
            <div className="flex justify-between items-center md:-mt-8">
              <div className="flex flex-col md:flex-row md:items-center md:gap-2 text-[#737373]">
                <span>
                  <span className="font-bold text-primary">6 &nbsp;</span>
                  Results,
                </span>
                <span className="flex items-center gap-1">
                  <IconContext.Provider value={mapIcon}>
                    <HiLocationMarker />
                  </IconContext.Provider>
                  <button type="button">View on map</button>
                </span>
              </div>
              <div>
                <select
                  name="sort"
                  id="sort"
                  className="h-[44px] appearance-none text-center bg-[#C999EF] text-white font-semibold rounded-lg px-3 focus-visible:outline-none"
                >
                  <option value="">Sort By</option>
                  <option value="1">A-Z</option>
                  <option value="-1">Z-A</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <SingleListingResult />
              <SingleListingResult />
              <SingleListingResult />
              <SingleListingResult />
              <SingleListingResult />
              <SingleListingResult />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
