import { Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MA1 from "./assets/images/equation_MA1.png";
import MA2 from "./assets/images/equation_MA2.png";
import MA3 from "./assets/images/equation_MA3.png";
import MA4 from "./assets/images/equation_MA4.png";
import MA5 from "./assets/images/equation_MA5.png";
import MA6 from "./assets/images/equation_MA6.png";
import MB from "./assets/images/equation_MB.png";
import PNS from "./assets/images/equation_PNS.png";
import PS1 from "./assets/images/equation_PS1.png";
import PS2 from "./assets/images/equation_PS2.png";
import RI1 from "./assets/images/equation_RI1.png";
import RI2 from "./assets/images/equation_RI2.png";
import RI3 from "./assets/images/equation_RI3.png";
import TC1 from "./assets/images/equation_TC1.png";
import TC2 from "./assets/images/equation_TC2.png";
import strings from "./strings/es.json";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10vh",
    marginBottom: "10vh",
  },
  image: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    height: "70px",
  },
  image2: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    height: "30px",
  },
}));

function Docs() {
  const classes = useStyles();
  return (
    <div>
      <Grid container justify="center" className={classes.container}>
        <Grid item xs={8}>
          <br />
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            {strings.solarExplorer} - {strings.colombia}
          </Typography>
          <Divider />
          <br />
          <Typography variant="h4" component="h2" gutterBottom>
            {strings.about}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.aboutP1}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.aboutP2}
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            {strings.generationModels}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.generationModelsP1}
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            {strings.inclinedRadiationCalculation}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.inclinedRadiationCalculationP1}
          </Typography>
          <img
            src={RI1}
            alt="Radiacion inclinada eq1"
            className={classes.image}
          ></img>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.inclinedRadiationCalculationP2}
          </Typography>
          <img
            src={RI2}
            alt="Radiacion inclinada eq2"
            className={classes.image2}
          ></img>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.inclinedRadiationCalculationP3}
          </Typography>
          <img
            src={RI3}
            alt="Radiacion inclinada eq3"
            className={classes.image}
          ></img>
          <br />
          <Typography variant="h5" component="h3" gutterBottom>
            {strings.cellTemperatureCalculation}
          </Typography>
          <img
            src={TC1}
            alt="Temperatura en la celda eq1"
            className={classes.image}
          ></img>
          <br />
          <img
            src={TC2}
            alt="Temperatura en la celda eq2"
            className={classes.image2}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.cellTemperatureCalculationP1}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.cellTemperatureCalculationP2}
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            {strings.nominalPowerCalculation}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.nominalPowerCalculationP1}
          </Typography>
          <img
            src={PNS}
            alt="Potencia nominal eq1"
            className={classes.image}
          ></img>
          <br />
          <Typography variant="h5" component="h3" gutterBottom>
            {strings.outputPowerCalculation}
          </Typography>
          <Typography variant="h6" component="h4" gutterBottom>
            {strings.basicModel}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.outputPowerCalculationP1}
          </Typography>
          <img src={MB} alt="Modelo básico eq1" className={classes.image}></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.outputPowerCalculationP2}
          </Typography>
          <Typography variant="h6" component="h4" gutterBottom>
            {strings.advancedModel}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.outputPowerCalculationP3}
          </Typography>
          <img
            src={MA1}
            alt="Modelo avanzado eq1"
            className={classes.image}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.outputPowerCalculationP4}
          </Typography>
          <img
            src={MA2}
            alt="Modelo avanzado eq2"
            className={classes.image}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.outputPowerCalculationP5}
          </Typography>
          <img
            src={MA3}
            alt="Modelo avanzado eq3"
            className={classes.image2}
          ></img>
          <br />
          <img
            src={MA4}
            alt="Modelo avanzado eq4"
            className={classes.image2}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.outputPowerCalculationP6}
          </Typography>
          <img
            src={MA5}
            alt="Modelo avanzado eq5"
            className={classes.image}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.outputPowerCalculationP7}
          </Typography>
          <img
            src={MA6}
            alt="Modelo avanzado eq6"
            className={classes.image2}
          ></img>
          <br />
          <Typography variant="h5" component="h3" gutterBottom>
            {strings.dcacInverterAndSystemLoss}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.dcacInverterAndSystemLossP1}
          </Typography>
          <img
            src={PS1}
            alt="Pérdidas del sistema eq1"
            className={classes.image2}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.dcacInverterAndSystemLossP2}
          </Typography>
          <img
            src={PS2}
            alt="Pérdidas del sistema eq2"
            className={classes.image}
          ></img>
          <br />
        </Grid>
      </Grid>
    </div>
  );
}

export default Docs;
