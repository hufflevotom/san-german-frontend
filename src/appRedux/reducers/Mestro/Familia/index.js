import { typesFamilia } from "../types/types";

const initState = {
  id: '',
  nombre: '',
  codigo: '',
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

    case typesFamilia.setId:
      return {
        ...state,
        id: action.payload
      };

    case typesFamilia.setNombre:
      return {
        ...state,
        nombre: action.payload
      };

    case typesFamilia.setCodigo:
      return {
        ...state,
        codigo: action.payload
      };

    case typesFamilia.setCargando:
      return {
        ...state,
        cargando: action.payload
      };

    case typesFamilia.setClear:
      return {
        ...state,
        id: '',
        nombre: '',
        codigo: '',
        familia: [],
        cargando: false
      };

    default:
      return state;
  }
}
