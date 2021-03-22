import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import commons from "../commons";

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
    axios.get(commons.backendURL + "/api/map/" + year).then((result) => {
      if (result.data.length === 0) {
        console.log("Error retrieving map data");
      } else {
        const data = result.data[0];
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
                  1,
                  ["interpolate", ["linear"], ["get", "mag"], 1, 1, 6, 4],
                  16,
                  ["interpolate", ["linear"], ["get", "mag"], 1, 5, 6, 50],
                ],
                // Color circle by earthquake magnitude
                "circle-color": [
                  "interpolate",
                  ["linear"],
                  ["get", "mag"],
                  1,
                  "rgba(33,102,172,0)",
                  2,
                  "rgb(103,169,207)",
                  3,
                  "rgb(209,229,240)",
                  4,
                  "rgb(253,219,199)",
                  5,
                  "rgb(239,138,98)",
                  6,
                  "rgb(178,24,43)",
                ],
                "circle-stroke-color": "white",
                "circle-stroke-width": 1,
                "circle-stroke-opacity": 0.1,
                // Transition from heatmap to circle layer by zoom level
                "circle-opacity": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  4.75,
                  0,
                  20,
                  0.2,
                ],
              },
            },
            "waterway-label"
          );

          map.addLayer(
            {
              id: "heatmap",
              type: "heatmap",
              source: "tileset",
              "source-layer": data["mapID"],
              maxzoom: 20,
              paint: {
                "heatmap-opacity": 0.5,
                "heatmap-weight": [
                  "interpolate",
                  ["linear"],
                  ["get", variable],
                  data[variable][0],
                  1,
                  data[variable][1],
                  3,
                ],
                "heatmap-color": [
                  "interpolate",
                  ["linear"],
                  ["heatmap-density"],
                  0,
                  "rgba(0, 0, 255, 0)",
                  0.4,
                  "hsl(225, 73%, 57%)",
                  0.54,
                  "hsl(180, 100%, 50%)",
                  0.68,
                  "hsl(120, 100%, 50%)",
                  0.83,
                  "hsl(60, 100%, 50%)",
                  1,
                  "red",
                ],
                "heatmap-radius": [
                  "interpolate",
                  ["exponential", 1.96],
                  ["zoom"],
                  4.72,
                  10,
                  12,
                  340,
                ],
                "heatmap-intensity": [
                  "interpolate",
                  ["exponential", 1],
                  ["zoom"],
                  4.75,
                  0.031,
                  5.212,
                  0.05,
                  5.43,
                  0.061,
                  5.872,
                  0.09,
                  6.25,
                  0.12,
                  6.6,
                  0.155,
                  7,
                  0.195,
                  7.25,
                  0.22,
                  7.7,
                  0.27,
                  8.1,
                  0.315,
                  8.35,
                  0.34,
                  8.9,
                  0.38,
                  9.3,
                  0.43,
                  10,
                  0.49,
                  12,
                  0.56,
                ],
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
