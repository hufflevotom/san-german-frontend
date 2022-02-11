import { CREATE_PRODUCTO, DELETE_PRODUCTO, GET_PRODUCTOS, GET_ID_PRODUCTO, UPDATE_PRODUCTO } from "../../../../constants/Config"
import { httpClient } from "../../../../util/Api"

export const obtenerProductos = async (limit, offset) => {
  const response = await httpClient.get(GET_PRODUCTOS + '?limit=' + limit + '&offset=' + offset);
  return response.data;
}

export const crearProducto = async () => {
  const response = await httpClient.post(CREATE_PRODUCTO);
  return response.data;
}

export const obtenerProductoPorId = async (id) => {
  const response = await httpClient.post(GET_ID_PRODUCTO + id);
  return response.data;
}

export const actualizarProducto = async (id) => {
  const response = await httpClient.post(UPDATE_PRODUCTO + id);
  return response.data;
}

export const eliminarProducto = async (id) => {
  const response = await httpClient.delete(DELETE_PRODUCTO + id);
  return response.data;
}
