import { typesAlmacen } from "../../../reducers/Configuracion/types/types";

export const setCodigo = (codigo) => {
    return {
        type: typesAlmacen.setCodigo,
        payload: codigo
    };
};

export const setNombre = (nombre) => {
    return {
        type: typesAlmacen.setCodigo,
        payload: nombre
    };
};

export const setAlmacen = (data) => {
    return {
        type: typesAlmacen.setAlmacen,
        payload: data
    };
};







