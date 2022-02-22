import React from "react";
import { Route, Switch } from "react-router-dom";
import { ListaOrdenCompra, FormularioOrdenCompra } from "./OrdenCompra";

const Logistica = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/ordenCompra/editar/:id`} component={FormularioOrdenCompra} />
    <Route path={`${match.url}/ordenCompra/agregar`} component={FormularioOrdenCompra} />
    <Route path={`${match.url}/ordenCompra`} component={ListaOrdenCompra} />
  </Switch>
);

export default Logistica;
