import { CREATE_PRODUCTO, DELETE_PRODUCTO, GET_PRODUCTOS, GET_ID_PRODUCTO, UPDATE_PRODUCTO } from "../../constants/Config"
import { httpClient } from "../../util/Api"

export const obtenerProductos = async () => {
    const response = await httpClient.get(GET_PRODUCTOS);
    console.log("Get Productos: ", response);
}

export const crearProducto = async () => {
    const response = await httpClient.post(CREATE_PRODUCTO);
    console.log("Create Producto: ", response);
}

export const obtenerProductoPorId = async (id) => {
    const response = await httpClient.post(GET_ID_PRODUCTO + id);
    console.log("Get Id Producto: ", response);
}

export const actualizarProducto = async (id) => {
    const response = await httpClient.post(UPDATE_PRODUCTO + id);
    console.log("Update Producto: ", response);
}

export const eliminarProducto = async (id) => {
    const response = await httpClient.delete(DELETE_PRODUCTO + id);
    console.log("Delete Producto: ", response);
}