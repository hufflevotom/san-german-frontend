import { GET_ORDENES_COMPRA, GET_ORDEN_COMPRA, CREATE_ORDEN_COMPRA, UPDATE_ORDEN_COMPRA, DELETE_ORDEN_COMPRA, GET_PRODUCTO_FILTRADO } from "../../../../constants/Config"
import { httpClient } from "../../../../util/Api"

export const getOrdenesCompra = async () => {
  const response = await httpClient.get(GET_ORDENES_COMPRA);
  return response.data;
}

export const getOrdenCompra = async (id) => {
  const response = await httpClient.get(GET_ORDEN_COMPRA + id);
  return response.data;
}

export const getProductoFiltrado = async (filtro) => {
  const response = await httpClient.get(GET_PRODUCTO_FILTRADO + filtro);
  return response.data;
}

export const createOrdenCompra = async (body) => {
  const response = await httpClient.post(CREATE_ORDEN_COMPRA, body);
  return response.data;
}

export const updateOrdenCompra = async (id, body) => {
  const response = await httpClient.put(UPDATE_ORDEN_COMPRA + id, body);
  return response.data;
}

export const deleteOrdenCompra = async (id) => {
  const response = await httpClient.delete(DELETE_ORDEN_COMPRA + id);
  return response.data;
}
