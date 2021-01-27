const backendURL = "http://localhost:3001";
function round2(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

const years = [
  1998,
  1999,
  2000,
  2001,
  2003,
  2004,
  2005,
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2015,
  2016,
  2017,
  2018,
];

const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const variables = [
  "GHI",
  "DHI",
  "DNI",
  "Wind Speed",
  "Solar Zenith Angle",
  "Temperature",
  "elevation",
];

const variableTitles = {
  GHI: "Radiación Global Horizontal",
  DHI: "Radiación Difusa Horizontal",
  DNI: "Radiación Directa Normal",
  "Wind Speed": "Velocidad del Viento",
  Temperature: "Temperatura",
};

const variableMeasurements = {
  GHI: "w/m2",
  DHI: "w/m2",
  DNI: "w/m2",
  "Wind Speed": "m/s",
  Temperature: "°C",
};

const commons = {
  backendURL,
  years,
  months,
  variables,
  variableTitles,
  variableMeasurements,
  round2,
};

export default commons;
