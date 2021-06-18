import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import constants from "../utils/constants";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

mapboxgl.accessToken =
  "pk.eyJ1IjoibmRpYXo5OCIsImEiOiJja2hsOXplNnYxNDRrMnRuMjU0Z2JsOHUxIn0.To4YKhzB_9tGdI-eSxuPcw";

const useStyles = makeStyles((theme) => ({
  mapcontainer: {
    height: "100vh",
  },
}));

const Map = (props) => {
  const classes = useStyles();
  const mapContainerRef = useRef(null);
  const year = props.year;
  const variable = props.variable;
  const coord = props.coord;
  const reloadMap = props.reloadMap;

  const [lng, setLng] = useState(-80);
  const [lat, setLat] = useState(5.26);
  const [zoom, setZoom] = useState(4.75);

  var marker = new mapboxgl.Marker();

  const handleMarkerChange = (coord, map) => {
    if (map !== null) {
      marker.remove();
      marker.setLngLat(coord).addTo(map);
    }
  };

  // Initialize map when component mounts
  useEffect(() => {
    axios.get(constants.backendURL + "/api/map/" + year).then((result) => {
      if (result.data.length === 0) {
        console.log("Error retrieving map data");
      } else {
        const data = result.data[0];
        props.onVariableLimitsChange(data[variable]);
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/outdoors-v11",
          center: [lng, lat],
          zoom: zoom,
          maxZoom: 12,
          minZoom: 4.75,
        });

        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        if (coord[0] !== 0 && coord[1] !== 0) {
          marker.setLngLat(coord).addTo(map);
        }

        map.on("move", () => {
          setLng(map.getCenter().lng.toFixed(4));
          setLat(map.getCenter().lat.toFixed(4));
          setZoom(map.getZoom().toFixed(2));
        });

        map.on("load", function () {
          map.addSource("tileset", {
            type: "vector",
            url: data["mapURL"],
          });

          map.addLayer(
            {
              id: "puntos",
              type: "circle",
              source: "tileset",
              "source-layer": data["mapID"],
              minzoom: 1,
              paint: {
                // Size circle radius by earthquake magnitude and zoom level
                "circle-radius": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  4.75,
                  3,
                  12,
                  15,
                ],
                // Color circle by earthquake magnitude
                "circle-color": [
                  "interpolate",
                  ["linear"],
                  ["get", variable],
                  data[variable][0],
                  "#0000ff",
                  data[variable][0] +
                    0.2 * (data[variable][1] - data[variable][0]),
                  "#4169e1",
                  data[variable][0] +
                    0.4 * (data[variable][1] - data[variable][0]),
                  "#00ffff",
                  data[variable][0] +
                    0.6 * (data[variable][1] - data[variable][0]),
                  "#00ff00",
                  data[variable][0] +
                    0.8 * (data[variable][1] - data[variable][0]),
                  "#ffff00",
                  data[variable][1],
                  "#ff0000",
                ],
                "circle-opacity": 0.7,
              },
            },
            "waterway-label"
          );
        });

        // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        map.on("click", "puntos", function (e) {
          const coordinates = e.features[0].geometry.coordinates.slice();
          props.onCoordChange(coordinates);
          handleMarkerChange(coordinates, map);
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on("mouseenter", "puntos", function () {
          map.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        map.on("mouseleave", "puntos", function () {
          map.getCanvas().style.cursor = "";
        });

        // Clean up on unmount
        return () => map.remove();
      }
    });
  }, [variable, year, reloadMap]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className={classes.mapcontainer} ref={mapContainerRef} />;
};

export default Map;
