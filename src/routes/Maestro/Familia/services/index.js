import { GET_FAMILIAS, CREATE_FAMILIA, UPDATE_FAMILIA, DELETE_FAMILIA } from "../../../../constants/Config"
import { httpClient } from "../../../../util/Api"

export const obtenerFamilias = async () => {
  const response = await httpClient.get(GET_FAMILIAS);
  return response.data;
}

export const crearFamilia = async (body) => {
  const response = await httpClient.post(CREATE_FAMILIA, body);
  return response.data;
}

export const actualizarFamilia = async (id) => {
  const response = await httpClient.post(UPDATE_FAMILIA + id);
  return response.data;
}

export const eliminarFamilia = async (id) => {
  const response = await httpClient.delete(DELETE_FAMILIA + id);
  return response.data;
}
