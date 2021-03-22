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
            Explorador Solar - Colombia
          </Typography>
          <Divider />
          <br />
          <Typography variant="h4" component="h2" gutterBottom>
            Generalidades
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            El Explorador Solar de Colombia es una aplicación que permite
            observar el comportamiento histórico de la radiación solar en el
            país. Actualmente se cuenta con datos de 22 años y 62187 puntos que
            cubren la totalidad del territorio colombiano, mostrando mediciones
            de seis variables: GHI (Radiación Global Horizontal), DHI (Radiación
            Difusa Horizontal), DNI (Radiación Directa Normal), Velocidad del
            Viento, Elevación Solar y Temperatura Promedio.
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Adicionalmente, se cuenta con cinco tipos de gráficos que permiten
            observar el comportamiento de las diferentes variables, así como dos
            modelos de generación fotovoltáica para calcular una generación
            aproximada en cualquiera de los puntos. Los promedios utilizados
            para los gráficos y como fuente para calcular los modelos de
            generación fueron calculados teniendo en cuenta únicamente datos
            dentro del intervalo 8:00a.m.-5:00p.m.
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Modelos de Generación
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Para mostrar la generación en un año, se realizan los siguientes
            cálculos por cada uno de los días.
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            Cálculo de radiación inclinada
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            La radiación inclinada se calcula partiendo de la radiación global
            horizontal (GHI), del ángulo solar (&alpha;) y la inclinación del
            arreglo de paneles (&beta;).
          </Typography>
          <img
            src={RI1}
            alt="Radiacion inclinada eq1"
            className={classes.image}
          ></img>
          <Typography variant="body1" align="justify" gutterBottom>
            Específicamente, el ángulo solar se calcula de acuerdo a la latitud
            y al ángulo de declinación, que es el ángulo entre el ecuador y una
            línea recta desde el centro de la Tierra hasta el centro del sol.
          </Typography>
          <img
            src={RI2}
            alt="Radiacion inclinada eq2"
            className={classes.image2}
          ></img>
          <Typography variant="body1" align="justify" gutterBottom>
            En ese sentido, el ángulo de declinación tiene en cuenta el número
            de día del año (d), así como una constante de 23.45°.
          </Typography>
          <img
            src={RI3}
            alt="Radiacion inclinada eq3"
            className={classes.image}
          ></img>
          <br />
          <Typography variant="h5" component="h3" gutterBottom>
            Cálculo de temperatura en la celda
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
            Para el cálculo de temperatura se tiene en cuenta el tipo de
            montaje: aislado o en techo. En el primer caso, se definen las
            variables a=-3.47, b=-0.0594 y &Delta;T=3. Para el caso de montaje
            en techo, se tiene a=-2.98, b=-0.0471 y &Delta;T=1.
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Además de las variables a y b, se tiene en cuenta la temperatura
            ambiente (T), la velocidad del viento (WS) y la radiación inclinada
            calculada previamente.
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            Cálculo de potencia nominal del sistema
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Para el cálculo de la potencia nominal que generaría el panel
            fotovoltáico o arreglo de paneles, se asumen condiciones estándar de
            1000W/m<sup>2</sup> para la radiación incidente y 25°C para la
            temperatura de la celda. Adicionalmente, se tienen en cuenta la
            potencia máxima del panel (P<sub>mp</sub>) y el número de paneles
            (N).
          </Typography>
          <img
            src={PNS}
            alt="Potencia nominal eq1"
            className={classes.image}
          ></img>
          <br />
          <Typography variant="h5" component="h3" gutterBottom>
            Cálculo de potencia de salida
          </Typography>
          <Typography variant="h6" component="h4" gutterBottom>
            Modelo Básico
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            La ecuación que calcula la potencia generada por el panel
            fotovoltáico cambia dependiendo del valor de la radiación incidente,
            específicamente, si es mayor o menor a 125W/m<sup>2</sup>.
          </Typography>
          <img src={MB} alt="Modelo básico eq1" className={classes.image}></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            En este caso, la radiación de referencia (R<sub>ref</sub>) es de
            1000W/m<sup>2</sup>, la temperatura nominal (T<sub>0</sub>) es de
            25°C y el coeficiente de máxima temperatura de la celda (&gamma;) es
            de -0.5%/°C para celdas monocristalinas.
          </Typography>
          <Typography variant="h6" component="h4" gutterBottom>
            Modelo Avanzado
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            El modelo avanzado se basa en el punto de máxima potencia de la
            curva V-I que caracteriza a una celda fotovoltáica. Inicialmente, se
            calcula la corriente de corto circuito teniendo en cuenta la
            corriente de corto circuito nominal (I<sub>sc,ref</sub>), una
            temperatura nominal (T<sub>0</sub>) de 25°C y el coeficiente de
            temperatura para la corriente de corto circuito (&alpha;*I
            <sub>sc</sub>).
          </Typography>
          <img
            src={MA1}
            alt="Modelo avanzado eq1"
            className={classes.image}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            Adicionalmente, se calcula la corriente de máxima potencia de
            operación del panel teniendo en cuenta la corriente de máxima
            potencia de referencia (I<sub>mp,ref</sub>).
          </Typography>
          <img
            src={MA2}
            alt="Modelo avanzado eq2"
            className={classes.image}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            Por otro lado, se calcula el voltaje de circuito abierto de acuerdo
            con el voltaje de circuito abierto de referencia (V<sub>oc,ref</sub>
            ), el número de celdas en serie (s) y el coeficiente de temperatura
            para V<sub>oc</sub> (&beta;
            <sub>
              V<sub>oc</sub>
            </sub>
            ). Como constante, se usa 26mV para &delta;(T<sub>c</sub>) y,
            además, se calcula E<sub>e</sub> con las variables de corriente de
            corto circuito.
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
            Al igual que en el caso de la corriente, se calcula el voltaje de
            máxima potencia teniendo en cuenta el voltaje de circuito abierto de
            referencia (V<sub>oc,ref</sub>) y el voltaje de circuito abierto.
          </Typography>
          <img
            src={MA5}
            alt="Modelo avanzado eq5"
            className={classes.image}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            Finalmente, la potencia de salida se calcula con los valores de
            voltaje y corriente de máxima potencia.
          </Typography>
          <img
            src={MA6}
            alt="Modelo avanzado eq6"
            className={classes.image2}
          ></img>
          <br />
          <Typography variant="h5" component="h3" gutterBottom>
            Inversor DC/AC y Pérdidas del sistema
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Se tiene en cuenta la eficiencia nominal del inversor DC/AC (&eta;)
            para calcular la potencia AC (P<sub>AC</sub>):
          </Typography>
          <img
            src={PS1}
            alt="Pérdidas del sistema eq1"
            className={classes.image2}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            Para las pérdidas operacionales totales (PT) se tiene un valor
            predeterminado de 14.08%, distribuido en suciedad (2%), sombras del
            entorno (3%), imperfecciones de fabricación (2%), cableado (2%),
            conectores (0.5%), degradación de celdas por luz incidente (1.5%),
            tiempo apagado (3%), y diferencia entre valores de laboratorio y
            especificaciones reales (1%).
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
