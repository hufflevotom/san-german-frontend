import { typesFamilia } from "../../../reducers/Mestro/types/types";

export const setCargando = () => {
  return {
    type: typesFamilia.setCargando,
  };
};

export const setClear = () => {
  return {
    type: typesFamilia.setClear,
  };
};

export const setFamilia = (data) => {
  return {
    type: typesFamilia.setFamilia,
    payload: data
  };
};

export const setCodigo = (data) => {
  return {
    type: typesFamilia.setCodigo,
    payload: data
  };
};

export const setNombre = (data) => {
  return {
    type: typesFamilia.setNombre,
    payload: data
  };
};






