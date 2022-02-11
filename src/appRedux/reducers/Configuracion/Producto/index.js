import { typesProducto } from "../types/types";

const initState = {
  ubicacion: '',
  nombre: '',
  producto: [],
};

export const ProductoReducer = (state = initState, action) => {
  switch (action.type) {
    case typesProducto.setProducto:
      return {
        ...state,
        producto: action.payload
      };

    case typesProducto.setClear:
      return {
        ...state,
        ubicacion: '',
        nombre: '',
      };

    default:
      return state;
  }
}
