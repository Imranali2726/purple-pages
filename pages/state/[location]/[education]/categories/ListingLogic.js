import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import { getEducations, getFilters } from "../../../../../services/apiCalls";
import { loadOnPageReload } from "../../../../../reducers/filterSearch";

export default function ListingLogic() {
  const [listing, setListing] = useState([]);
  const [filters, setFilters] = useState([]);
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

  async function getEducationListing(p) {
    const url = `${window.location.pathname.slice(1)}${p ? `?${p}` : ""}`;
    setLoading((p) => ({ ...p, data: true }));
    try {
      const res = await getEducations(url);
      setListing(res.data.data);
      setLoading((p) => ({ ...p, data: false }));
    } catch (error) {
      setError({ ...error, data: error.message });
      setLoading((p) => ({ ...p, data: false }));
    }
  }

  const getServiceFilters = useCallback(async () => {
    setLoading((p) => ({ ...p, filters: false }));
    try {
      const res = await getFilters("educations-filters");
      setFilters(res.data.data);
      setLoading((p) => ({ ...p, filters: false }));
    } catch (error) {
      setError({ ...error, filters: error.message });
      setLoading((p) => ({ ...p, filters: false }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(
      {
        pathname: `/state/${searchParams.location}/educations/categories/${searchParams.type}`,
      },
      undefined,
      { scroll: false },
    );
    getEducationListing();
    getServiceFilters();
  };

  useEffect(() => {
    dispatch(loadOnPageReload(queryString.parse(window.location.search)));
  }, []);

  useEffect(() => {
    const p = new URLSearchParams(filterSearch);
    if (
      router.query.location !== undefined &&
      router.query.education !== undefined &&
      router.query.listing !== undefined
    ) {
      getEducationListing(p);
    }
    if (filters?.length < 1) {
      getServiceFilters();
    }
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

  return { handleSubmit, loading, error, listing, filters };
}
