import { useEffect, useRef } from "react";
import SingleListingResult from "./base/SingleListingResult";
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import mapboxgl from "!mapbox-gl";

export default function SearchList({ data, error, loading, mapTheme }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (mapTheme) {
    return (
      <div className="mt-4">
        {loading && <p className="m-4">Loading...</p>}
        {!loading && data?.length > 0 ? (
          <div className="relative h-screen  md:max-h-[calc(100vh_-_316px)] lg:max-h-[calc(100vh_-_204px)] xl:max-h-[calc(100vh_-_152px)] 2xl:max-h-[calc(100vh_-_183px)] ">
            <MapForPage educationListing={data} />
          </div>
        ) : (
          <img
            src="/images/data-not-found.jpg"
            alt=""
            className="mx-auto w-full object-contain"
          />
        )}
      </div>
    );
  }

  if (data) {
    return (
      <div className="mt-4">
        {data.length > 0 ? (
          data?.map((item) => (
            <SingleListingResult singleListData={item} key={item.id} />
          ))
        ) : (
          <img
            src="/images/data-not-found.jpg"
            alt=""
            className="mx-auto w-full object-contain"
          />
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

export function MapForPage({
  educationListing,
  coords,
  showOnMap = false,
  setShowOnMap,
}) {
  // export function MapForPage({ educationListing }) {
  const map = useRef();
  const mapContainer = useRef();

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [educationListing[0]?.longitude, educationListing[0]?.latitude],
      zoom: 10,
    });

    const geojson = {
      type: "FeatureCollection",
      features: educationListing?.map((item) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [item?.longitude, item?.latitude],
        },
        properties: {
          title: item?.name,
          description: item?.address,
        },
      })),
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "marker";

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`,
            ),
        )
        .addTo(map.current);
    }
  });

  useEffect(() => {
    if (!showOnMap) return;

    if (coords.length) {
      map.current.flyTo({
        center: coords,
        zoom: 16,
      });
      setShowOnMap(false);
    }
  }, [showOnMap]);

  return <div ref={mapContainer} />;
}
