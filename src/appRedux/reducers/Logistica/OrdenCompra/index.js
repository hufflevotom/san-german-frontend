import { typesOrdenCompra } from "../types/types";

const initState = {
  // codigo: '',
  // descripcion: '',
  // atributosId: '',
  // almacenId: [],
  ordenCompra: [],
  cargando: false,
};

export const OrdenCompraReducer = (state = initState, action) => {
  switch (action.type) {
    case typesOrdenCompra.setOrdenCompra:
      return {
        ...state,
        ordenCompra: action.payload
      };

    // case typesOrdenCompra.setCodigo:
    //   return {
    //     ...state,
    //     codigo: action.payload
    //   };

    // case typesOrdenCompra.setDescripcion:
    //   return {
    //     ...state,
    //     descripcion: action.payload
    //   };

    // case typesOrdenCompra.setAtributosId:
    //   return {
    //     ...state,
    //     atributosId: action.payload
    //   };

    // case typesOrdenCompra.setAlmacenId:
    //   return {
    //     ...state,
    //     almacenId: action.payload
    //   };

    case typesOrdenCompra.setCargando:
      return {
        ...state,
        cargando: action.payload
      };

    case typesOrdenCompra.setClear:
      return {
        ...state,
        // codigo: '',
        // descripcion: '',
        // atributosId: '',
        // almacenId: [],
        ordenCompra: [],
        cargando: false
      };

    default:
      return state;
  }
}
