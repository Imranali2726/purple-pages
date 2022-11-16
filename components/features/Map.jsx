import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import mapboxgl from "!mapbox-gl";

export default function Map({ lng, lat, name, address, className }) {
  const map = useRef();
  const mapContainer = useRef();

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 16,
    });
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          properties: {
            title: name,
            description: address,
          },
        },
      ],
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
  return (
    <div className={className}>
      <div ref={mapContainer} />
    </div>
  );
}

Map.propTypes = {
  lng: PropTypes.string.isRequired,
  lat: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
