const backendURL = "http://localhost:3001";

const years = [
  1998,
  1999,
  2000,
  2001,
  2002,
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
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
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
const hours = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
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

const setups = [
  { value: "isolated", label: "Aislado" },
  { value: "ceiling", label: "En Techo" },
];

const basicModelVariables = [
  {
    value: "N",
    label: "Número de paneles",
    defaultValue: 0,
  },
  {
    value: "Pmp",
    label: "Potencia máxima del panel [W]",
    defaultValue: 0,
  },
  {
    value: "gamma",
    label: "Coeficiente de máxima temperatura del panel [%/°C]",
    defaultValue: -0.5,
  },
  {
    value: "beta",
    label: "Inclinación del panel [°]",
    defaultValue: 15,
  },
  {
    value: "n",
    label: "Eficiencia nominal de inversor DC/AC [%]",
    defaultValue: 96,
  },
  { value: "PT", label: "Pérdidas Operacionales [%]", defaultValue: 14.08 },
  { value: "src", label: "Capacidad nominal del sistema [kW]", defaultValue: 0 },
];

const advancedModelVariables = [
  { value: "s", label: "Número de celdas en serie", defaultValue: 0 },
  {
    value: "beta",
    label: "Inclinación del arreglo [°]",
    defaultValue: 15,
  },
  {
    value: "iscref",
    label: "Corriente de corto circuito nominal",
    defaultValue: 0,
  },
  {
    value: "vocref",
    label: "Voltaje de circuito abierto de referencia",
    defaultValue: 0,
  },
  {
    value: "impref",
    label: "Corriente de máxima potencia de referencia",
    defaultValue: 0,
  },
  {
    value: "vmpref",
    label: "Voltaje de máxima potencia de referencia",
    defaultValue: 0,
  },
  {
    value: "alphaisc",
    label: "Coeficiente de temperatura para Isc",
    defaultValue: 0.00005,
  },
  {
    value: "betavoc",
    label: "Coeficiente de temperatura para Voc",
    defaultValue: -0.0027,
  },
  {
    value: "n",
    label: "Eficiencia nominal de inversor DC/AC [%]",
    defaultValue: 96,
  },
  { value: "PT", label: "Pérdidas Operacionales [%]", defaultValue: 14.08 },
  { value: "src", label: "Capacidad nominal del sistema [kW]", defaultValue: 0 },
];

function round2(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function dayToDate(year, day) {
  var date = new Date(year, 0);
  return new Date(date.setDate(day));
}

function getBasicPowerGeneration(
  latitude,
  data,
  setup,
  N,
  gamma,
  beta,
  Pmp,
  n,
  PT
) {
  var a = -3.47;
  var b = -0.0594;
  var deltaT = 3;
  var PDCnom = (Pmp * N) / 1000;
  var Rref = 1000;
  var T0 = 25;
  var PAC_array = [];

  if (setup === "ceiling") {
    a = -2.98;
    b = -0.0471;
    deltaT = 1;
  }
  const dataLength = data.GHI.length;
  for (var i = 0; i < dataLength; i++) {
    var delta = 23.45 * Math.sin(deg2rad((360 / 365) * (284 + i + 1)));
    var alpha = 90 - latitude + delta;
    var Ri =
      data.GHI[i] *
      (Math.sin(deg2rad(alpha + beta)) / Math.sin(deg2rad(alpha)));

    var Tp =
      Ri * Math.exp(a + b * parseFloat(data["Wind Speed"][i])) +
      parseFloat(data.Temperature[i]);
    var Tc = Tp + (Ri / 1000) * deltaT;

    var PDC = 0;
    if (Ri >= 125) {
      PDC = (Ri / Rref) * PDCnom * (1 + (gamma / 100) * (Tc - T0));
    } else {
      PDC =
        ((0.008 * Math.pow(Ri, 2)) / Rref) *
        PDCnom *
        (1 + (gamma / 100) * (Tc - T0));
    }

    var PAC = (n / 100) * PDC;
    PAC = PAC * (1 - PT / 100);

    PAC_array.push({
      x: i,
      y: round2(PAC),
    });
  }
  return PAC_array;
}

function getAdvancedPowerGeneration(
  latitude,
  data,
  setup,
  s,
  beta,
  iscref,
  vocref,
  impref,
  vmpref,
  alphaisc,
  betavoc,
  n,
  PT
) {
  var a = -3.47;
  var b = -0.0594;
  var deltaT = 3;
  var deltaTc = 0.026;
  var T0 = 25;
  var PAC_array = [];

  if (setup === "ceiling") {
    a = -2.98;
    b = -0.0471;
    deltaT = 1;
  }
  const dataLength = data.GHI.length;
  for (var i = 0; i < dataLength; i++) {
    var delta = 23.45 * Math.sin(deg2rad((360 / 365) * (284 + i + 1)));
    var alpha = 90 - latitude + delta;
    var Ri =
      data.GHI[i] *
      (Math.sin(deg2rad(alpha + beta)) / Math.sin(deg2rad(alpha)));

    var Tp =
      Ri * Math.exp(a + b * parseFloat(data["Wind Speed"][i])) +
      parseFloat(data.Temperature[i]);
    var Tc = Tp + (Ri / 1000) * deltaT;

    var Isc = iscref * (Ri / 1000) * (1 + alphaisc * (Tc - T0));

    var Imp = impref * (Isc / iscref);

    var Ee = Isc / (iscref * (1 + alphaisc * (Tc - T0)));

    var Voc = vocref + s * deltaTc * Math.log(Ee) + betavoc * (Tc - T0);

    var Vmp = vmpref * (Voc / vocref);

    var PDC = Vmp * Imp;
    PDC = (PDC * 20) / 1000;

    var PAC = (n / 100) * PDC;
    PAC = PAC * (1 - PT / 100);

    PAC_array.push({
      x: i,
      y: round2(PAC),
    });
  }
  return PAC_array;
}

function getCapacityFactor(annualProduction, systemRatedCapacity) {
  return annualProduction / (systemRatedCapacity * 25 * 365);
}

const commons = {
  backendURL,
  years,
  months,
  hours,
  variables,
  variableTitles,
  variableMeasurements,
  setups,
  basicModelVariables,
  advancedModelVariables,
  round2,
  dayToDate,
  getBasicPowerGeneration,
  getAdvancedPowerGeneration,
  getCapacityFactor,
};

export default commons;
