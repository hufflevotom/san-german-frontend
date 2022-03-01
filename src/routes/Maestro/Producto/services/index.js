import { CREATE_PRODUCTO, DELETE_PRODUCTO, GET_PRODUCTOS, GET_ID_PRODUCTO, UPDATE_PRODUCTO, SUBIR_IMAGEN_OPCION } from "../../../../constants/Config"
import { httpClient } from "../../../../util/Api"

export const obtenerProductos = async (limit, offset) => {
  const response = await httpClient.get(GET_PRODUCTOS + '?limit=' + limit + '&offset=' + offset);
  return response.data;
}

export const crearProducto = async (body) => {
  const response = await httpClient.post(CREATE_PRODUCTO, body);
  return response.data;
}

export const subirImagenOpcion = async (productoId, atributo, opcion, imagen) => {
  const response = await httpClient.put(SUBIR_IMAGEN_OPCION + productoId + '?atributo=' + atributo + '&opcion=' + opcion, imagen);
  return response.data;
}

export const obtenerProductoPorId = async (id) => {
  const response = await httpClient.get(GET_ID_PRODUCTO + id);
  return response.data;
}

export const actualizarProducto = async (id, body) => {
  const response = await httpClient.put(UPDATE_PRODUCTO + id, body);
  return response.data;
}

export const eliminarProducto = async (id) => {
  const response = await httpClient.delete(DELETE_PRODUCTO + id);
  return response.data;
}
