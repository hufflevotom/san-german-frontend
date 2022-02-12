import React from "react";
import { Route, Switch } from "react-router-dom";

//Almacen
import { ListaAlmacenes } from "./Almacen/views/ListaAlmacenes";
import { FormularioAgregarAlmacen } from "./Almacen/views/FormularioAgregar";
import { FormularioEditarAlmacen } from "./Almacen/views/FormularioEditar";


//Proveedor
import { ListaProveedores } from "./Proveedor";
import { FormularioAgregarProveedor } from "./Proveedor/views/FormularioAgregar";
import { FormularioEditarProveedor } from "./Proveedor/views/FormularioEditar";


const Configuracion = ({ match }) => (
    <Switch>
        {/* Almacen */}
        <Route path={`${match.url}/almacen/editar/:id`} component={FormularioEditarAlmacen} />
        <Route path={`${match.url}/almacen/agregar`} component={FormularioAgregarAlmacen} />
        <Route path={`${match.url}/almacen`} component={ListaAlmacenes} />

        {/* Proveedor */}
        <Route path={`${match.url}/proveedor/editar/:id`} component={FormularioEditarProveedor} />
        <Route path={`${match.url}/proveedor/agregar`} component={FormularioAgregarProveedor} />
        <Route path={`${match.url}/proveedor`} component={ListaProveedores} />

    </Switch>
);

export default Configuracion;

