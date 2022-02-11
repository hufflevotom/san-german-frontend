import React from "react";
import { Route, Switch } from "react-router-dom";
import { Producto, FormularioAgregar } from "./Producto";

const Maestro = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/producto/editar/:id`} component={FormularioAgregar} />
    <Route path={`${match.url}/producto/agregar`} component={FormularioAgregar} />
    <Route path={`${match.url}/producto`} component={Producto} />
  </Switch>
);

export default Maestro;

