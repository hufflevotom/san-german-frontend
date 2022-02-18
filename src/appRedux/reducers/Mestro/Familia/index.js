import { typesFamilia } from "../types/types";

const initState = {
  codigo: '',
  nombre: '',
  familia: [],
  cargando: false,
};

export const FamiliaReducer = (state = initState, action) => {
  switch (action.type) {
    case typesFamilia.setFamilia:
      return {
        ...state,
        familia: action.payload
      };

    case typesFamilia.setCodigo:
      return {
        ...state,
        codigo: action.payload
      };

    case typesFamilia.setNombre:
      return {
        ...state,
        nombre: action.payload
      };

    case typesFamilia.setCargando:
      return {
        ...state,
        cargando: action.payload
      };

    case typesFamilia.setClear:
      return {
        ...state,
        codigo: '',
        nombre: '',
        familia: [],
        cargando: false
      };

    default:
      return state;
  }
}
