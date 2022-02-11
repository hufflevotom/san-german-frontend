import React from "react";
import { Route, Switch } from "react-router-dom";
import { Almacen } from "./Almacen";
import { FormularioAgregar } from "./Almacen/views/FormularioAgregar";


const Configuracion = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/almacen/editar/:id`} component={FormularioAgregar} />
        <Route path={`${match.url}/almacen/agregar`} component={FormularioAgregar} />
        <Route path={`${match.url}/almacen`} component={Almacen} />
    </Switch>
);

export default Configuracion;

