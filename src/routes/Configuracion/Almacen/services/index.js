import { CREATE_ALMACEN, DELETE_ALMACEN, GET_ALMACENES, GET_ID_ALMACEN, UPDATE_ALMACEN } from "../../../../constants/Config"
import { httpClient } from "../../../../util/Api"

export const obtenerAlmacenes = async () => {
  const response = await httpClient.get(GET_ALMACENES);
  return response.data;
}

export const crearAlmacen = async () => {
  const response = await httpClient.post(CREATE_ALMACEN);
  console.log("Create Almacen: ", response);
  return response.data;
}

export const obtenerAlmacenPorId = async (id) => {
  const response = await httpClient.post(GET_ID_ALMACEN + id);
  console.log("Get Id Almacen: ", response);
  return response.data;
}

export const actualizarAlmacen = async (id) => {
  const response = await httpClient.post(UPDATE_ALMACEN + id);
  console.log("Update Almacen: ", response);
  return response.data;
}

export const eliminarAlmacen = async (id) => {
  const response = await httpClient.delete(DELETE_ALMACEN + id);
  console.log("Delete Almacen: ", response);
  return response.data;
}
