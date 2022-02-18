import React from "react";
import { Route, Switch } from "react-router-dom";
import { Producto, AgregarProducto } from "./Producto";
import { Familias, AgregarFamilia } from "./Familia";

const Maestro = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/producto/editar/:id`} component={AgregarProducto} />
    <Route path={`${match.url}/producto/agregar`} component={AgregarProducto} />
    <Route path={`${match.url}/producto`} component={Producto} />
    <Route path={`${match.url}/familia/editar/:id`} component={AgregarFamilia} />
    <Route path={`${match.url}/familia/agregar`} component={AgregarFamilia} />
    <Route path={`${match.url}/familia`} component={Familias} />
  </Switch>
);

export default Maestro;

