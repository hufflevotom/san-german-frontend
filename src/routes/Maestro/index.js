import React from "react";
import { Route, Switch } from "react-router-dom";
import { Producto } from "./Producto";

const Maestro = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/producto`} component={Producto} />

    </Switch>
);

export default Maestro;

