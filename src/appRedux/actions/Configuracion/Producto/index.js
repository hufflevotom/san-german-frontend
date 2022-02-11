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

export const setCodigo = (data) => {
  return {
    type: typesProducto.setCodigo,
    payload: data
  };
};

export const setDescripcion = (data) => {
  return {
    type: typesProducto.setDescripcion,
    payload: data
  };
};

export const setAtributosId = (data) => {
  return {
    type: typesProducto.setAtributosId,
    payload: data
  };
};

export const setAlmacenId = (data) => {
  return {
    type: typesProducto.setAlmacenId,
    payload: data
  };
};







