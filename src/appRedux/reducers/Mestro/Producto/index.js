import { typesProducto } from "../types/types";

const initState = {
  codigo: '',
  descripcion: '',
  almacenId: '',
  atributosId: [],
  producto: [],
  cargando: false,
};

export const ProductoReducer = (state = initState, action) => {
  switch (action.type) {
    case typesProducto.setProducto:
      return {
        ...state,
        producto: action.payload
      };

    case typesProducto.setCodigo:
      return {
        ...state,
        codigo: action.payload
      };

    case typesProducto.setDescripcion:
      return {
        ...state,
        descripcion: action.payload
      };

    case typesProducto.setAtributosId:
      return {
        ...state,
        atributosId: action.payload
      };

    case typesProducto.setAlmacenId:
      return {
        ...state,
        almacenId: action.payload
      };

    case typesProducto.setCargando:
      return {
        ...state,
        cargando: action.payload
      };

    case typesProducto.setClear:
      return {
        ...state,
        codigo: '',
        descripcion: '',
        almacenId: '',
        atributosId: [],
        producto: [],
        cargando: false
      };

    default:
      return state;
  }
}
