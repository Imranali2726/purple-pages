import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import { IconContext } from "react-icons";
import Head from "next/head";
import { HiLocationMarker } from "react-icons/hi";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import ListingSideFilter from "../../../../../components/filter/ListingSideFilter";
import SearchFilter from "../../../../../components/filter/SearchFilter";
import SearchList from "../../../../../components/SearchList";
import { getEducations, getFilters } from "../../../../../services/apiCalls";
import { loadOnPageReload } from "../../../../../reducers/filterSearch";
import SignInPopup from "../../../../../components/include/SignInPopup";
import AuthenticationPopup from "../../../../../components/include/AuthenticationPopup";

const mapIcon = { className: "fill-primary" };
export default function Listing() {
  const [listing, setListing] = useState([]);
  const [filters, setFilters] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [signInPopupActive, setSignInPopupActive] = useState(false);
  const [error, setError] = useState({
    data: "",
    filters: "",
  });
  const [loading, setLoading] = useState({
    data: true,
    filters: true,
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSelector((state) => state.search.value);
  const filterSearch = useSelector((state) => state.filterSearch.value);
  const session = useSession();

  async function getEducationListing(p) {
    setError("");
    const url = `${`state/${router.query.location}/${router.query.service}/categories/${router.query.listing}`}${
      p ? `?${p}` : ""
    }`;
    setLoading((p) => ({ ...p, data: true }));
    try {
      const res = await getEducations(url);
      setListing(res.data.data);
      setLoading((p) => ({ ...p, data: false }));
    } catch (error) {
      if (axios.isCancel(error)) {
        setError("");
        return;
      }
      setError({ ...error, data: error.message });
      setLoading((p) => ({ ...p, data: false }));
    }
  }

  async function getServiceFilters() {
    setError("");
    setLoading((p) => ({ ...p, filters: false }));
    try {
      const res = await getFilters(
        `${
          searchParams.services ??
          (router.query.service === "candidates"
            ? "employments"
            : router.query.service)
        }/categories/${searchParams.type ?? router.query.listing}/filters`,
      );
      setFilters(res.data.data);
      setLoading((p) => ({ ...p, filters: false }));
    } catch (error) {
      setFilters([]);
      setError({ ...error, filters: error.message });
      setLoading((p) => ({ ...p, filters: false }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchParams?.type === "find-a-candidate") {
      router.push(
        {
          pathname: `/state/${searchParams.location}/candidates/categories/${searchParams.type}`,
        },
        undefined,
        { scroll: false },
      );
    } else {
      router.push(
        {
          pathname: `/state/${searchParams.location}/${searchParams.services}/categories/${searchParams.type}`,
        },
        undefined,
        { scroll: false },
      );
    }
    // dispatch(resetFilterData());
    getServiceFilters();
  };

  function sortHandler(e) {
    setLoading((p) => ({ ...p, data: false }));
    if (e.target.value === "-1") {
      const temp = [...listing];
      temp.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      });
      setListing(temp);
    } else if (e.target.value === "1") {
      const temp = [...listing];
      temp.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA > nameB) return 1;
        if (nameA < nameB) return -1;
        return 0;
      });
      setListing(temp);
    }
    setLoading((p) => ({ ...p, data: false }));
  }

  useEffect(() => {
    dispatch(loadOnPageReload(queryString.parse(window.location.search)));
  }, []);

  useEffect(() => {
    const p = new URLSearchParams(filterSearch);
    if (
      router.query.location !== undefined &&
      router.query.service !== undefined &&
      router.query.listing !== undefined
    ) {
      getEducationListing(p);
    }
    if (filters?.length < 1 && router.query.service) {
      getServiceFilters();
    }

    return () => {
      setListing([]);
      setError({
        data: "",
        filters: "",
      });
    };
  }, [router.query, filterSearch]);

  useEffect(() => {
    if (router.query.location && router.query.listing) {
      const link = `${window.location.pathname}`;
      router.push(
        {
          pathname: link,
          query: { ...filterSearch },
        },
        undefined,
        { shallow: true, scroll: false },
      );
    }
  }, [filterSearch]);

  function getTitle() {
    if (
      router.query.service === "educations" &&
      router.query.listing === "professional-training"
    ) {
      return "Find the Right Trainer";
    }
    if (router.query.service === "educations")
      return "Find the Right Organization";

    if (router.query.service === "employments") {
      return "Find your Perfect Job";
    }

    return "Find the Right Candidate";
  }

  function getSubTitle() {
    if (
      router.query.service === "educations" &&
      router.query.listing === "professional-training"
    ) {
      return "Which Trainer are you looking for?";
    }
    if (router.query.service === "educations")
      return "What facility are you looking for?";

    if (router.query.service === "employments") {
      return "What exciting new positions are you looking for?";
    }

    return "Which candidate are you looking for?";
  }

  return (
    <>
      <Head>
        <title>Purple Pages | Listing</title>
        <style>
          {`.signInBtn{
              background-color: #c999ef !important;
            }`}
        </style>
      </Head>
      {popupActive && <AuthenticationPopup setPopupActive={setPopupActive} />}
      {signInPopupActive && (
        <SignInPopup
          setSignInPopupActive={setSignInPopupActive}
          setPopupActive={setPopupActive}
        />
      )}
      <section className="internal-header-bg h-screen  max-h-[500px] lg:max-h-[355px] pt-[65px] lg:pt-[94px] mt-[-65px] lg:mt-[-94px]">
        <div className="internal-header-overlay h-full">
          <div className="pp-container relative pt-10 lg:top-[50%] lg:-translate-y-[75%]">
            <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-white ">
              {getTitle()}
            </h1>
            <p className="text-lg md:text-xl xl:text-2xl text-white -mt-1">
              {getSubTitle()}
            </p>
          </div>
        </div>
      </section>
      <section className="relative h-[160px] lg:h-[80px]">
        <div className="absolute top-[-230px] lg:-top-[45px] inset-x-0">
          <div className="px-8 md:px-0 md:max-w-[720px] lg:max-w-[991px] xl:max-w-[1200px] 2xl:max-w-[1320px] mx-auto ">
            <SearchFilter handleSubmit={handleSubmit} listPage />
            {(router.query.service === "employments" ||
              router.query.service === "candidates") && (
              <div className="text-center mt-4">
                <p>
                  If you looking for a job,{" "}
                  {session.status === "authenticated" ? (
                    <Link href="/post-cv">
                      <a className="text-lg text-[#642CA9] font-semibold underline">
                        {" "}
                        post your CV on Purple Pages{" "}
                      </a>
                    </Link>
                  ) : (
                    <button
                      className="text-lg text-[#642CA9] font-semibold underline"
                      type="button"
                      onClick={() => setSignInPopupActive(true)}
                    >
                      post your CV on Purple Pages
                    </button>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="mt-8 lg:mt-[75px] pp-container">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[365px_1fr] gap-8 xl:gap-16">
          <ListingSideFilter
            loading={loading.filters}
            error={error.filters}
            filters={filters}
          />
          <div className="md:mt-8 lg:mt-0">
            <div className="flex justify-between items-center md:-mt-8">
              <div className="flex flex-col md:flex-row md:items-center md:gap-2 text-[#737373]">
                <span>
                  <span className="font-bold text-primary">
                    {listing.length > 0 ? listing.length : "0"} &nbsp;
                  </span>
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
                  onChange={sortHandler}
                >
                  <option value="">Sort By</option>
                  <option value="1">A-Z</option>
                  <option value="-1">Z-A</option>
                </select>
              </div>
            </div>
            <SearchList
              data={listing}
              error={error.data}
              loading={loading.data}
            />
          </div>
        </div>
      </section>
    </>
  );
}
