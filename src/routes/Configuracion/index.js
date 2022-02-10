import React from "react";
import { Route, Switch } from "react-router-dom";
import { Almacen } from "./Almacen";
import { Producto } from "./Producto";

const Configuracion = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/almacen`} component={Almacen} />
        <Route path={`${match.url}/producto`} component={Producto} />
    </Switch>
);

export default Configuracion;

