import React from "react";
import { Route, Switch } from "react-router-dom";
import { ListaProductos, FormularioProducto } from "./Producto";
import { ListaFamilias, FormularioFamilia } from "./Familia";

const Maestro = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/producto/editar/:id`} component={FormularioProducto} />
    <Route path={`${match.url}/producto/agregar`} component={FormularioProducto} />
    <Route path={`${match.url}/producto`} component={ListaProductos} />
    <Route path={`${match.url}/familia/editar/:id`} component={FormularioFamilia} />
    <Route path={`${match.url}/familia/agregar`} component={FormularioFamilia} />
    <Route path={`${match.url}/familia`} component={ListaFamilias} />
  </Switch>
);

export default Maestro;

