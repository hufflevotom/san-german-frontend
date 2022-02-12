import { typesProveedor } from "../../../reducers/Configuracion/types/types";

export const setRazonSocial = (data) => {
    return {
        type: typesProveedor.setRazonSocial,
        payload: data,
    };

}
export const setDirecFiscal = (data) => {
    return {
        type: typesProveedor.setDirecFiscal,
        payload: data,
    };

}
export const setRuc = (data) => {
    return {
        type: typesProveedor.setRuc,
        payload: data,
    };

}
export const setTipo = (data) => {
    return {
        type: typesProveedor.setTipo,
        payload: data,
    };

}
export const setCelular = (data) => {
    return {
        type: typesProveedor.setCelular,
        payload: data,
    };

}
export const setCorreo = (data) => {
    return {
        type: typesProveedor.setCorreo,
        payload: data,
    };

}
export const setProveedor = (data) => {
    return {
        type: typesProveedor.setProveedor,
        payload: data,
    };

}
export const setClear = () => {
    return {
        type: typesProveedor.setClear,
    };
}

export const setCargando = (data) => {
    return {
        type: typesProveedor.setCargando,
        payload: data
    };
};
