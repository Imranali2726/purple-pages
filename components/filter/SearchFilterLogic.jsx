import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation, getService, getType } from "../../services/apiCalls";
import { setSearchData } from "../../reducers/search";
import { setIsEdited } from "../../reducers/isEdit";

export default function SearchFilterLogic() {
  const [location, setLocation] = useState([]);
  const [services, setServices] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState({
    identity: false,
    location: false,
    services: false,
    type: false,
  });
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const searchParams = useSelector((state) => state.search.value);
  const edit = useSelector((state) => state.isEdit.value);

  async function getLocations() {
    setLoading({ ...loading, location: true });
    try {
      const res = await getLocation();
      setLocation(res.data.data);
      setLoading({ ...loading, location: false });
    } catch (error) {
      //   console.log(error);
      setLoading({ ...loading, location: false });
    }
  }

  async function getServices() {
    setLoading({ ...loading, services: true });
    try {
      const res = await getService();
      setServices(res.data.data);
      setLoading({ ...loading, services: false });
    } catch (error) {
      //   console.log(error);
      setLoading({ ...loading, services: false });
    }
  }

  async function getTypes(slug) {
    setLoading({ ...loading, type: true });
    try {
      const res = await getType(slug);
      setTypes(res.data.data);
      setLoading({ ...loading, type: false });
    } catch (error) {
      //   console.log(error);
      setLoading({ ...loading, type: false });
    }
  }
  function handleServicesChange(e) {
    const { name, value } = e.target;
    dispatch(setIsEdited(name));
    getTypes(value);
    dispatch(setSearchData({ name, value }));
  }

  useEffect(() => {
    getLocations();
    getServices();
    if (searchParams?.services) {
      getTypes(searchParams?.services);
    }
  }, []);

  useEffect(() => {
    if (router.query.location) {
      dispatch(
        setSearchData({ name: "location", value: router.query.location }),
      );
      dispatch(setIsEdited("location"));
    }
    if (router.query.services) {
      dispatch(
        setSearchData({ name: "services", value: router.query.services }),
      );
    }
    if (router.query.listing) {
      dispatch(setSearchData({ name: "type", value: router.query.listing }));
      dispatch(setIsEdited("type"));
    }
  }, [router]);

  useEffect(() => {
    if (
      searchParams?.location &&
      searchParams?.services &&
      searchParams?.type
    ) {
      setDisabled(false);
    }
  }, [searchParams]);

  function handleChange(e) {
    const { name, value } = e.target;

    dispatch(setIsEdited(name));
    dispatch(setSearchData({ name, value }));
  }

  const filter = [
    {
      label: "Identity",
      name: "identity",
      component: (
        <select
          required
          className="w-full text-sm relative bg-white capitalize px-2 -mx-2"
          style={{ color: edit?.identity ? "black" : "#9e9e9e" }}
          value={searchParams?.identity || 0}
          id="identity"
          name="identity"
          disabled={loading?.identity}
          onChange={handleChange}
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
      name: "location",
      component: (
        <select
          required
          className="w-full text-sm relative bg-white capitalize px-2 -mx-2"
          value={searchParams?.location || 0}
          style={{ color: edit?.location ? "black" : "#9e9e9e" }}
          id="location"
          name="location"
          disabled={loading?.location}
          onChange={handleChange}
        >
          <option value="0" disabled hidden>
            Where are you located?
          </option>
          {location?.map((loc) => (
            <option value={loc.slug} key={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      ),
    },
    {
      label: "Services",
      name: "services",
      component: (
        <select
          required
          className="w-full text-sm relative bg-white capitalize px-2 -mx-2"
          value={searchParams?.services || 0}
          id="services"
          style={{ color: edit?.services ? "black" : "#9e9e9e" }}
          name="services"
          disabled={loading?.services}
          onChange={handleServicesChange}
        >
          <option value="0" disabled hidden>
            What are you looking for?
          </option>
          {services?.map((service) => (
            <option value={service.slug} key={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      ),
    },
    {
      label: "Type",
      name: "type",
      component: (
        <select
          required
          className="w-full text-sm relative bg-white capitalize px-2 -mx-2"
          value={searchParams?.type || 0}
          style={{ color: edit?.type ? "black" : "#9e9e9e" }}
          id="type"
          disabled={loading?.type}
          name="type"
          onChange={handleChange}
        >
          <option value="0" disabled hidden>
            Type of service ?
          </option>
          {types.length > 0 ? (
            types?.map((type) => (
              <option value={type.slug} key={type.id}>
                {type.name}
              </option>
            ))
          ) : (
            <option value="0" disabled>
              Type of service ?
            </option>
          )}
        </select>
      ),
    },
  ];

  function handleSearch(e) {
    e.preventDefault();
    router.push(
      `/state/${searchParams.location}/educations/categories/${searchParams.type}`,
    );
  }
  return {
    location,
    services,
    types,
    edit,
    filter,
    handleServicesChange,
    loading,
    handleSearch,
    disabled,
  };
}
