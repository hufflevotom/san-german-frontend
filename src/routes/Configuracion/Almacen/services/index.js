import { CREATE_ALMACEN, DELETE_ALMACEN, GET_ALMACENES, GET_ID_ALMACEN, UPDATE_ALMACEN } from "../../../../constants/Config"
import { httpClient } from "../../../../util/Api"

export const obtenerAlmacenes = async () => {
  const response = await httpClient.get(GET_ALMACENES);
  return response.data;
}

export const crearAlmacen = async (nombre, ubicacion) => {
  const response = await httpClient.post(CREATE_ALMACEN, {
    nombre: nombre,
    ubicacion: ubicacion,
  });
  return response.data;
}

export const obtenerAlmacenPorId = async (id) => {
  const response = await httpClient.get(GET_ID_ALMACEN + id);
  return response.data;
}

export const actualizarAlmacen = async (id, nombre, ubicacion) => {
  const response = await httpClient.put(UPDATE_ALMACEN + id, {
    nombre: nombre,
    ubicacion: ubicacion,
  });
  return response.data;
}

export const eliminarAlmacen = async (id) => {
  const response = await httpClient.delete(DELETE_ALMACEN + id);
  return response.data;
}
