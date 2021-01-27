import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import mapboxgl from "mapbox-gl";

const data = {
  1998: {
    mapID: "promedioAnual1998-018l1n",
    mapURL: "mapbox://ndiaz98.dfqigh9a",
    DHI: { min: 75.0550799086758, max: 123.99606164383562 },
    GHI: { min: 125.65256849315068, max: 270.23801369863014 },
    "Solar Zenith Angle": { min: 89.8533139269412, max: 90.0397534246576 },
    "Wind Speed": { min: 0.01974315068493154, max: 7.332848173516004 },
    Temperature: { min: -1.9062214611872144, max: 31.137842465753423 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 51.78373287671233, max: 275.88030821917806 },
  },
  1999: {
    mapID: "promedioAnual1999-9xucgl",
    mapURL: "mapbox://ndiaz98.65q7jh5u",
    DHI: { min: 69.79086757990868, max: 127.1453196347032 },
    GHI: { min: 128.80679223744292, max: 270.0181506849315 },
    "Solar Zenith Angle": { min: 89.85335730593657, max: 90.03976997716903 },
    "Wind Speed": { min: 0.019355022831050336, max: 7.335559360730589 },
    Temperature: { min: -2.9305365296803654, max: 29.97300228310502 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 47.84600456621005, max: 283.1908105022831 },
  },
  2000: {
    mapID: "promedioAnual2000-calozn",
    mapURL: "mapbox://ndiaz98.axvo4g6w",
    DHI: { min: 73.44651826484018, max: 127.62933789954336 },
    GHI: { min: 127.8792808219178, max: 274.84583333333336 },
    "Solar Zenith Angle": { min: 89.86591894977198, max: 90.03622431506913 },
    "Wind Speed": { min: 0.011860730593607248, max: 8.36912671232879 },
    Temperature: { min: -2.7899543378995437, max: 30.165353881278534 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 50.7652397260274, max: 287.8268264840183 },
  },
  2001: {
    mapID: "promedioAnual2001-8mpuv6",
    mapURL: "mapbox://ndiaz98.5go6f2h5",
    DHI: { min: 75.28019406392694, max: 127.14440639269408 },
    GHI: { min: 123.9611301369863, max: 276.65896118721463 },
    "Solar Zenith Angle": { min: 89.85333504566225, max: 90.03974086758002 },
    "Wind Speed": { min: 0.014257990867579775, max: 8.334023972602717 },
    Temperature: { min: -2.265867579908676, max: 30.61820776255708 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 48.05502283105023, max: 286.9780821917808 },
  },
  2002: {
    mapID: "promedioAnual1998-018l1n",
    mapURL: "mapbox://ndiaz98.dfqigh9a",
    DHI: { min: 75.0550799086758, max: 123.99606164383562 },
    GHI: { min: 125.65256849315068, max: 270.23801369863014 },
    "Solar Zenith Angle": { min: 89.8533139269412, max: 90.0397534246576 },
    "Wind Speed": { min: 0.01974315068493154, max: 7.332848173516004 },
    Temperature: { min: -1.9062214611872144, max: 31.137842465753423 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 51.78373287671233, max: 275.88030821917806 },
  },
  2003: {
    mapID: "promedioAnual2003-459qui",
    mapURL: "mapbox://ndiaz98.462kcf2h",
    DHI: { min: 79.05610730593607, max: 124.53727168949771 },
    GHI: { min: 106.71672374429224, max: 268.738299086758 },
    "Solar Zenith Angle": { min: 89.85338755707814, max: 90.03973116438365 },
    "Wind Speed": { min: 0.01957762557077637, max: 7.775747716895015 },
    Temperature: { min: -1.9038812785388128, max: 30.83624429223744 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 39.31215753424657, max: 262.96786529680367 },
  },
  2004: {
    mapID: "promedioAnual2004-3lfg9m",
    mapURL: "mapbox://ndiaz98.6zxh0ey8",
    DHI: { min: 73.2005707762557, max: 121.97893835616438 },
    GHI: { min: 108.49891552511416, max: 268.7401826484018 },
    "Solar Zenith Angle": { min: 89.86595490867616, max: 90.03619006849364 },
    "Wind Speed": { min: 0.016757990867579776, max: 8.18203196347038 },
    Temperature: { min: -2.1667237442922374, max: 30.609874429223744 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 41.65513698630137, max: 273.8470890410959 },
  },
  2005: {
    mapID: "promedioAnual2005-0lipr0",
    mapURL: "mapbox://ndiaz98.bhip8xn2",
    DHI: { min: 75.51187214611872, max: 124.53698630136986 },
    GHI: { min: 112.52431506849317, max: 265.189897260274 },
    "Solar Zenith Angle": { min: 89.85342922374447, max: 90.03972260274024 },
    "Wind Speed": { min: 0.01852739726027434, max: 7.162220319634751 },
    Temperature: { min: -1.7791666666666666, max: 30.93373287671233 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 38.02311643835616, max: 265.9732305936073 },
  },
  2006: {
    mapID: "promedioAnual2006-azty5p",
    mapURL: "mapbox://ndiaz98.7vy9swuk",
    DHI: { min: 74.50890410958904, max: 123.48259132420092 },
    GHI: { min: 108.57551369863012, max: 272.9908105022831 },
    "Solar Zenith Angle": { min: 89.8534446347036, max: 90.03969349315065 },
    "Wind Speed": { min: 0.01349315068493145, max: 8.024811643835676 },
    Temperature: { min: -2.0095319634703195, max: 30.881164383561643 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 38.54657534246575, max: 277.42722602739724 },
  },
  2007: {
    mapID: "promedioAnual2007-990a1q",
    mapURL: "mapbox://ndiaz98.c0q3j9y8",
    DHI: { min: 77.96569634703197, max: 120.0062214611872 },
    GHI: { min: 106.9163812785388, max: 267.00884703196346 },
    "Solar Zenith Angle": { min: 89.85344863013742, max: 90.03970034246562 },
    "Wind Speed": { min: 0.011284246575342397, max: 7.672522831050289 },
    Temperature: { min: -1.9461187214611877, max: 30.629109589041096 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 36.54623287671233, max: 266.56672374429223 },
  },
  2008: {
    mapID: "promedioAnual2008-4xj6kp",
    mapURL: "mapbox://ndiaz98.ac57vzno",
    DHI: { min: 75.10005707762556, max: 121.65102739726028 },
    GHI: { min: 110.13053652968036, max: 267.72311643835616 },
    "Solar Zenith Angle": { min: 89.86600114155291, max: 90.03620091324233 },
    "Wind Speed": { min: 0.014686073059360628, max: 7.901678082191779 },
    Temperature: { min: -1.9706050228310503, max: 30.38892694063927 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 36.98955479452055, max: 270.7066780821918 },
  },
  2009: {
    mapID: "promedioAnual2009-630eyf",
    mapURL: "mapbox://ndiaz98.61sr4rk7",
    DHI: { min: 73.82791095890411, max: 128.6908105022831 },
    GHI: { min: 97.28230593607306, max: 271.03390410958906 },
    "Solar Zenith Angle": { min: 89.85346803652973, max: 90.0397106164389 },
    "Wind Speed": { min: 0.008167808219178063, max: 8.314132420091363 },
    Temperature: { min: -1.893664383561644, max: 30.816038812785383 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 36.71946347031963, max: 274.05034246575343 },
  },
  2010: {
    mapID: "promedioAnual2010-70q0vh",
    mapURL: "mapbox://ndiaz98.bclddvhz",
    DHI: { min: 82.36957762557077, max: 136.5853881278539 },
    GHI: { min: 113.04594748858447, max: 266.5103881278539 },
    "Solar Zenith Angle": { min: 89.8535142694068, max: 90.03969577625583 },
    "Wind Speed": { min: 0.021147260273972623, max: 6.736147260273965 },
    Temperature: { min: -1.877796803652968, max: 30.741495433789957 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 33.277054794520545, max: 242.51324200913243 },
  },
  2011: {
    mapID: "promedioAnual2011-241buv",
    mapURL: "mapbox://ndiaz98.7v1ypox3",
    DHI: { min: 74.45553652968036, max: 140.62950913242008 },
    GHI: { min: 115.9476598173516, max: 285.8228310502284 },
    "Solar Zenith Angle": { min: 89.85352682648436, max: 90.03968150684925 },
    "Wind Speed": { min: 0.02108447488584467, max: 7.157089041095992 },
    Temperature: { min: -2.617123287671233, max: 29.91541095890411 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 35.94223744292238, max: 280.02614155251143 },
  },
  2012: {
    mapID: "promedioAnual2012-3ik566",
    mapURL: "mapbox://ndiaz98.4546vpc7",
    DHI: { min: 73.37191780821918, max: 143.02151826484018 },
    GHI: { min: 108.814098173516, max: 293.24400684931504 },
    "Solar Zenith Angle": { min: 89.86607933789968, max: 90.03614440639309 },
    "Wind Speed": { min: 0.016786529680365335, max: 7.825353881278594 },
    Temperature: { min: -2.475684931506849, max: 30.30884703196347 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 39.46495433789954, max: 301.1684360730593 },
  },
  2013: {
    mapID: "promedioAnual2013-98t8g8",
    mapURL: "mapbox://ndiaz98.cf3yg93l",
    DHI: { min: 74.6777397260274, max: 140.37100456621005 },
    GHI: { min: 103.74880136986302, max: 281.90502283105025 },
    "Solar Zenith Angle": { min: 89.85355764840192, max: 90.03970890411001 },
    "Wind Speed": { min: 0.010690639269406364, max: 8.01163812785391 },
    Temperature: { min: -2.2004566210045664, max: 30.79337899543379 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 37.29960045662101, max: 286.7591324200913 },
  },
  2014: {
    mapID: "promedioAnual1998-018l1n",
    mapURL: "mapbox://ndiaz98.dfqigh9a",
    DHI: { min: 75.0550799086758, max: 123.99606164383562 },
    GHI: { min: 125.65256849315068, max: 270.23801369863014 },
    "Solar Zenith Angle": { min: 89.8533139269412, max: 90.0397534246576 },
    "Wind Speed": { min: 0.01974315068493154, max: 7.332848173516004 },
    Temperature: { min: -1.9062214611872144, max: 31.137842465753423 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 51.78373287671233, max: 275.88030821917806 },
  },
  2015: {
    mapID: "promedioAnual2015-d9sq9b",
    mapURL: "mapbox://ndiaz98.dur52qvh",
    DHI: { min: 74.15650684931506, max: 125.15336757990868 },
    GHI: { min: 88.83036529680365, max: 283.013698630137 },
    "Solar Zenith Angle": { min: 89.85354680365302, max: 90.03969235159825 },
    "Wind Speed": { min: 0.010273972602739692, max: 8.408327625570836 },
    Temperature: { min: -1.7405251141552511, max: 31.318778538812783 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 28.85656392694064, max: 279.4107305936073 },
  },
  2016: {
    mapID: "promedioAnual2016-ca5lv5",
    mapURL: "mapbox://ndiaz98.anonp42r",
    DHI: { min: 74.27231735159818, max: 127.04434931506847 },
    GHI: { min: 109.10713470319637, max: 290.86078767123286 },
    "Solar Zenith Angle": { min: 89.86616723744312, max: 90.03610216895021 },
    "Wind Speed": { min: 0.01613584474885836, max: 7.515987442922436 },
    Temperature: { min: -1.5599315068493151, max: 31.15462328767123 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 39.040239726027394, max: 292.6168378995434 },
  },
  2017: {
    mapID: "promedioAnual2017-87hbwf",
    mapURL: "mapbox://ndiaz98.9ri1pleq",
    DHI: { min: 70.87163242009133, max: 133.68470319634704 },
    GHI: { min: 113.61649543378996, max: 291.08247716894977 },
    "Solar Zenith Angle": { min: 89.85365296803668, max: 90.03969006849377 },
    "Wind Speed": { min: 0.01953767123287681, max: 7.251700913242033 },
    Temperature: { min: -2.178310502283105, max: 30.491552511415524 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 42.43293378995434, max: 295.4944063926941 },
  },
  2018: {
    mapID: "promedioAnual2018-co02ph",
    mapURL: "mapbox://ndiaz98.5b3scwwh",
    DHI: { min: 70.88487442922374, max: 148.16763698630135 },
    GHI: { min: 90.48441780821918, max: 271.98778538812786 },
    "Solar Zenith Angle": { min: 89.83707990867663, max: 90.02294977168926 },
    "Wind Speed": { min: 0.009229452054794486, max: 7.854754566210062 },
    Temperature: { min: -1.8092636986301407, max: 31.151398401826484 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 24.337842465753425, max: 282.7333904109589 },
  },
  2019: {
    mapID: "promedioAnual1998-018l1n",
    mapURL: "mapbox://ndiaz98.dfqigh9a",
    DHI: { min: 75.0550799086758, max: 123.99606164383562 },
    GHI: { min: 125.65256849315068, max: 270.23801369863014 },
    "Solar Zenith Angle": { min: 89.8533139269412, max: 90.0397534246576 },
    "Wind Speed": { min: 0.01974315068493154, max: 7.332848173516004 },
    Temperature: { min: -1.9062214611872144, max: 31.137842465753423 },
    elevation: { min: 0, max: 4870 },
    DNI: { min: 51.78373287671233, max: 275.88030821917806 },
  },
};

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

var marker = new mapboxgl.Marker();
var coordinates = null;

const useStyles = makeStyles((theme) => ({
  mapcontainer: {
    height: "100vh",
  },
  sidebarStyle: {
    display: "inline-block",
    position: "absolute",
    top: "0",
    left: "0",
    margin: "12px",
    background: "#404040",
    color: "#ffffff",
    zIndex: "1",
    padding: "6px",
    fontWeight: "bold",
  },
}));

const Map = (props) => {
  const classes = useStyles();
  const mapContainerRef = useRef(null);
  const year = props.year;
  const variable = props.variable;

  const [lng, setLng] = useState(-74);
  const [lat, setLat] = useState(4.26);
  const [zoom, setZoom] = useState(4.75);

  // Initialize map when component mounts
  useEffect(() => {
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

    if (coordinates !== null) marker.setLngLat(coordinates).addTo(map);

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on("load", function () {
      map.addSource("tileset", {
        type: "vector",
        url: data[year].mapURL,
      });

      map.addLayer(
        {
          id: "puntos",
          type: "circle",
          source: "tileset",
          "source-layer": data[year].mapID,
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
          "source-layer": data[year].mapID,
          maxzoom: 20,
          paint: {
            "heatmap-opacity": 0.5,
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", variable],
              data[year][variable].min,
              1,
              data[year][variable].max,
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
      coordinates = e.features[0].geometry.coordinates.slice();
      props.onCoordChange(coordinates);

      marker.remove();
      marker.setLngLat(coordinates).addTo(map);
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
  }, [variable, year]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className={classes.mapcontainer} ref={mapContainerRef} />
    </div>
  );
};

export default Map;
