import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import Settings from "./Settings";
import Common from "./Common";
import { AlmacenReducer } from './Configuracion/Almacen';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  common: Common,
  almacen: AlmacenReducer,

});

export default createRootReducer;
