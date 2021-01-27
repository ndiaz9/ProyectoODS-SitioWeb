import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SideSummary from "./sideTabs/sidesummary";
import SideGraphs from "./sideTabs/sidegraphs";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    background: "#F1F1E6",
    height: "100vh",
  },
  contentHeader: {
    fontSize: "30px",
    textAlign: "center",
    padding: "15px",
  },
  tab: {
    fontSize: "12px",
    minWidth: 50,
    width: 50,
    background: "#09BC8A",
  },
  tabGrid: {
    width: "100%",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={classes.tabGrid}
      {...other}
    >
      {value === index && <Grid>{children}</Grid>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SideContent = (props) => {
  const year = props.year;
  const coord = props.coord;
  const variable = props.variable;

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.contentContainer}>
      <Grid container>
        <AppBar position="static" className={classes.appbar}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="simple tabs example"
            centered
          >
            <Tab className={classes.tab} label="Resumen" {...a11yProps(0)} />
            <Tab className={classes.tab} label="Gráficos" {...a11yProps(1)} />
            <Tab className={classes.tab} label="Descargas" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <SideSummary year={year} coord={coord} variable={variable} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SideGraphs coord={coord} year={year}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Grid>
    </div>
  );
};

export default SideContent;
