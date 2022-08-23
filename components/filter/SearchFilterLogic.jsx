import { useLayoutEffect, useState } from "react";
import { getLocation, getService, getType } from "../../services/apiCalls";

export default function SearchFilterLogic() {
  const [location, setLocation] = useState([]);
  const [services, setServices] = useState([]);
  const [types, setTypes] = useState([]);
  const [edit, setEdit] = useState({
    select1: false,
    select2: false,
    select3: false,
    select4: false,
  });

  const [loading, setLoading] = useState({
    identity: false,
    location: false,
    services: false,
    type: false,
  });

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

  async function getTypes(id) {
    setLoading({ ...loading, type: true });
    try {
      const res = await getType(id);
      setTypes(res.data.data);
      setLoading({ ...loading, type: false });
    } catch (error) {
      //   console.log(error);
      setLoading({ ...loading, type: false });
    }
  }
  function handleServicesChange(e) {
    setEdit({ ...edit, select3: true });
    getTypes(e.target.value);
  }

  useLayoutEffect(() => {
    getLocations();
    getServices();
  }, []);

  const filter = [
    {
      label: "Identity",
      name: "select1",
      component: (
        <select
          className="w-full text-sm relative bg-white capitalize px-2 -mx-2"
          style={{ color: edit.select1 ? "black" : "#9e9e9e" }}
          defaultValue={0}
          id="select1"
          name="select1"
          disabled={loading?.identity}
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
          className="w-full text-sm relative bg-white capitalize px-2 -mx-2"
          defaultValue={0}
          style={{ color: edit.select2 ? "black" : "#9e9e9e" }}
          id="select2"
          name="select2"
          disabled={loading?.location}
          onChange={() => setEdit({ ...edit, select2: true })}
        >
          <option value="0" disabled hidden>
            Where are you located?
          </option>
          {location?.map((loc) => (
            <option value={loc.value} key={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      ),
    },
    {
      label: "Services",
      name: "select3",
      component: (
        <select
          className="w-full text-sm relative bg-white capitalize px-2 -mx-2"
          defaultValue={0}
          id="select3"
          style={{ color: edit.select3 ? "black" : "#9e9e9e" }}
          name="select3"
          disabled={loading?.services}
          onChange={handleServicesChange}
        >
          <option value="0" disabled hidden>
            What are you looking for?
          </option>
          {services?.map((service) => (
            <option value={service.value} key={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      ),
    },
    {
      label: "Type",
      name: "select4",
      component: (
        <select
          className="w-full text-sm relative bg-white capitalize px-2 -mx-2"
          defaultValue={0}
          style={{ color: edit.select4 ? "black" : "#9e9e9e" }}
          id="select4"
          disabled={loading?.type}
          name="select4"
          onChange={() => setEdit({ ...edit, select4: true })}
        >
          <option value="0" disabled hidden>
            Type of service ?
          </option>
          {types.length > 0 ? (
            types?.map((type) => (
              <option value={type.value} key={type.id}>
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
  return {
    location,
    services,
    types,
    edit,
    setEdit,
    filter,
    handleServicesChange,
    loading,
  };
}
