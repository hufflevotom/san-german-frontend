import { typesAlmacen } from "../../../reducers/Configuracion/types/types";

export const setUbicacion = (codigo) => {
    return {
        type: typesAlmacen.setUbicacion,
        payload: codigo
    };
};



export const setClear = () => {
    return {
        type: typesAlmacen.setClear,
    };
};

export const setNombre = (nombre) => {
    return {
        type: typesAlmacen.setNombre,
        payload: nombre
    };
};

export const setAlmacen = (data) => {
    return {
        type: typesAlmacen.setAlmacen,
        payload: data
    };
};







