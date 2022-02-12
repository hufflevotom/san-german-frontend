import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import Settings from "./Settings";
import Common from "./Common";
import { AlmacenReducer } from './Configuracion/Almacen';
import { ProductoReducer } from './Mestro/Producto';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  common: Common,
  almacen: AlmacenReducer,
  producto: ProductoReducer,

});

export default createRootReducer;
