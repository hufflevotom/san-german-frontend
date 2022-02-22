import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import Settings from "./Settings";
import Common from "./Common";
import { ProductoReducer } from './Mestro/Producto';
import { FamiliaReducer } from './Mestro/Familia';

import { AlmacenReducer } from './Configuracion/Almacen';
import { ProveedorReducer } from './Configuracion/Proveedor';

import { OrdenCompraReducer } from './Logistica/OrdenCompra';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  common: Common,
  almacen: AlmacenReducer,
  producto: ProductoReducer,
  familia: FamiliaReducer,
  proveedor: ProveedorReducer,
  ordenCompra: OrdenCompraReducer,
});

export default createRootReducer;
