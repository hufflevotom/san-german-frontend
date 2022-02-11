import { typesProducto } from "../../../reducers/Configuracion/types/types";

export const setClear = () => {
  return {
    type: typesProducto.setClear,
  };
};

export const setProducto = (data) => {
  return {
    type: typesProducto.setProducto,
    payload: data
  };
};







