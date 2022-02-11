import React from "react";
import { Route, Switch } from "react-router-dom";
import { Almacen } from "./Almacen";
import { FormularioAgregar } from "./Almacen/views/FormularioAgregar";
import { FormularioEditar } from "./Almacen/views/FormularioEditar";


const Configuracion = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/almacen/editar/:id`} component={FormularioEditar} />
        <Route path={`${match.url}/almacen/agregar`} component={FormularioAgregar} />
        <Route path={`${match.url}/almacen`} component={Almacen} />
    </Switch>
);

export default Configuracion;

