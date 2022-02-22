import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "util/asyncComponent";
import Configuracion from "./Configuracion";
import Maestro from "./Maestro";
import Logistica from "./Logistica";


const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}sample`} component={asyncComponent(() => import('./SamplePage'))} />

      {/* Rutas del Sistema */}
      <Route path={`${match.url}configuracion`} component={Configuracion} />
      <Route path={`${match.url}maestro`} component={Maestro} />
      <Route path={`${match.url}logistica`} component={Logistica} />

    </Switch>
  </div>
);

export default App;
