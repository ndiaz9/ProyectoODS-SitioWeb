import strings from "../strings/es.json";

const backendURL = "http://localhost:3001";

let yearStart = 1998;
let yearEnd = 2019;
const years = Array(yearEnd - yearStart + 1)
  .fill()
  .map(() => yearStart++);

const months = Array.from({ length: 12 }, (item, i) => {
  return new Date(0, i)
    .toLocaleString(strings.code, { month: "short" })
    .toUpperCase();
});

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
  GHI: strings.GHI,
  DHI: strings.DHI,
  DNI: strings.DNI,
  "Wind Speed": strings.windSpeed,
  Temperature: strings.temperature,
};

const variableMeasurements = {
  latitude: "°",
  longitude: "°",
  elevation: "msnm",
  GHI: "W/m2",
  DHI: "W/m2",
  DNI: "W/m2",
  "Wind Speed": "m/s",
  "Solar Zenith Angle": "°",
  Temperature: "°C",
};

const setups = [
  { value: "isolated", label: strings.isolated },
  { value: "ceiling", label: strings.ceiling },
];

const basicModelVariables = [
  {
    value: "N",
    label: strings.numberOfPanels,
    defaultValue: 20,
    description: strings.numberOfPanelsDescription,
  },
  {
    value: "Pmp",
    label: strings.panelMaximumPower,
    defaultValue: 455,
    description: strings.panelMaximumPowerDescription,
  },
  {
    value: "gamma",
    label: strings.maximumTemperatureCoefficient,
    defaultValue: -0.5,
    description: strings.maximumTemperatureCoefficientDescription,
  },
  {
    value: "beta",
    label: strings.panelInclination,
    defaultValue: 15,
    description: strings.panelInclinationDescription,
  },
  {
    value: "n",
    label: strings.nominalEfficiency,
    defaultValue: 96,
    description: strings.nominalEfficiencyDescription,
  },
  {
    value: "PT",
    label: strings.operationalLosses,
    defaultValue: 14.08,
    description: strings.operationalLossesDescription,
  },
];

const advancedModelVariables = [
  {
    value: "N",
    label: strings.numberOfPanels,
    defaultValue: 20,
    description: strings.numberOfPanelsDescription,
  },
  {
    value: "s",
    label: strings.numberOfCellsInSeries,
    defaultValue: 144,
    description: strings.numberOfCellsInSeriesDescription,
  },
  {
    value: "beta",
    label: strings.arrayInclination,
    defaultValue: 15,
    description: strings.arrayInclinationDescription,
  },
  {
    value: "iscref",
    label: strings.nominalShortCircuitCurrent,
    defaultValue: 9.41,
    description: strings.nominalShortCircuitCurrentDescription,
  },
  {
    value: "vocref",
    label: strings.referenceOpenCircuitVoltage,
    defaultValue: 46.4,
    description: strings.referenceOpenCircuitVoltageDescription,
  },
  {
    value: "impref",
    label: strings.referenceMaximumPowerCurrent,
    defaultValue: 8.82,
    description: strings.referenceMaximumPowerCurrentDescription,
  },
  {
    value: "vmpref",
    label: strings.referenceMaximumPowerVoltage,
    defaultValue: 38.5,
    description: strings.referenceMaximumPowerVoltageDescription,
  },
  {
    value: "alphaisc",
    label: strings.iscTemperatureCoefficient,
    defaultValue: 0.00005,
    description: strings.iscTemperatureCoefficientDescription,
  },
  {
    value: "betavoc",
    label: strings.vocTemperatureCoefficient,
    defaultValue: -0.0027,
    description: strings.vocTemperatureCoefficientDescription,
  },
  {
    value: "n",
    label: strings.nominalEfficiency,
    defaultValue: 96,
    description: strings.nominalEfficiencyDescription,
  },
  {
    value: "PT",
    label: strings.operationalLosses,
    defaultValue: 14.08,
    description: strings.operationalLossesDescription,
  },
];

const constants = {
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
};

export default constants;
