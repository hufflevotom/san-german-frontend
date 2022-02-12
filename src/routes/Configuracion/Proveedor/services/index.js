import { CREATE_PROVEEDOR, DELETE_PROVEEDOR, GET_ID_PROVEEDOR, GET_PROVEEDORES, UPDATE_PROVEEDOR } from "../../../../constants/Config"
import { httpClient } from "../../../../util/Api"

export const obtenerProveedores = async (pageOffset) => {
    const response = await httpClient.get(GET_PROVEEDORES + `?limit=10&offset=${pageOffset}`);
    return response.data;
}

export const crearProveedor = async (razonSocial, direccion, ruc, tipo, celular, correo) => {
    const response = await httpClient.post(CREATE_PROVEEDOR, {
        razonSocial: razonSocial,
        direcFiscal: direccion,
        ruc: ruc,
        tipo: tipo,
        celular: celular,
        correo: correo,
    });
    return response.data;
}

export const obtenerProveedorPorId = async (id) => {
    const response = await httpClient.get(GET_ID_PROVEEDOR + id);
    return response.data;
}

export const actualizarProveedor = async (id, razonSocial, direccion, ruc, tipo, celular, correo) => {
    const response = await httpClient.put(UPDATE_PROVEEDOR + id, {
        razonSocial: razonSocial,
        direcFiscal: direccion,
        ruc: ruc,
        tipo: tipo,
        celular: celular,
        correo: correo,
    });
    return response.data;
}

export const eliminarProveedor = async (id) => {
    const response = await httpClient.delete(DELETE_PROVEEDOR + id);
    return response.data;
}
