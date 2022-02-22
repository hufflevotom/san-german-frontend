import { GET_FAMILIAS, GET_FAMILIA, CREATE_FAMILIA, UPDATE_FAMILIA, DELETE_FAMILIA } from "../../../../constants/Config"
import { httpClient } from "../../../../util/Api"

export const getFamilias = async () => {
  const response = await httpClient.get(GET_FAMILIAS);
  return response.data;
}

export const getFamilia = async (id) => {
  const response = await httpClient.get(GET_FAMILIA + id);
  return response.data;
}

export const createFamilia = async (body) => {
  const response = await httpClient.post(CREATE_FAMILIA, body);
  return response.data;
}

export const updateFamilia = async (id, body) => {
  const response = await httpClient.put(UPDATE_FAMILIA + id, body);
  return response.data;
}

export const deleteFamilia = async (id) => {
  const response = await httpClient.delete(DELETE_FAMILIA + id);
  return response.data;
}
