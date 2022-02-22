import { typesOrdenCompra } from "../../../reducers/Logistica/types/types";

export const setCargando = () => {
  return {
    type: typesOrdenCompra.setCargando,
  };
};

export const setClear = () => {
  return {
    type: typesOrdenCompra.setClear,
  };
};

export const setOrdenCompra = (data) => {
  return {
    type: typesOrdenCompra.setOrdenCompra,
    payload: data
  };
};

// export const setCodigo = (data) => {
//   return {
//     type: typesOrdenCompra.setCodigo,
//     payload: data
//   };
// };

// export const setDescripcion = (data) => {
//   return {
//     type: typesOrdenCompra.setDescripcion,
//     payload: data
//   };
// };

// export const setAtributosId = (data) => {
//   return {
//     type: typesOrdenCompra.setAtributosId,
//     payload: data
//   };
// };

// export const setAlmacenId = (data) => {
//   return {
//     type: typesOrdenCompra.setAlmacenId,
//     payload: data
//   };
// };







