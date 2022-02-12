import { typesProveedor } from "../types/types";

const initState = {
    cargando: false,
    razonSocial: '',
    direcFiscal: '',
    ruc: '',
    tipo: '',
    celular: '',
    correo: '',
    proveedor: [],
};

export const ProveedorReducer = (state = initState, action) => {
    switch (action.type) {
        case typesProveedor.setCargando:
            return {
                ...state,
                cargando: action.payload
            };


        case typesProveedor.setRazonSocial:
            return {
                ...state,
                razonSocial: action.payload
            };

        case typesProveedor.setDirecFiscal:
            return {
                ...state,
                direcFiscal: action.payload
            };

        case typesProveedor.setRuc:
            return {
                ...state,
                ruc: action.payload
            };


        case typesProveedor.setTipo:
            return {
                ...state,
                tipo: action.payload
            };

        case typesProveedor.setCelular:
            return {
                ...state,
                celular: action.payload
            };

        case typesProveedor.setCorreo:
            return {
                ...state,
                correo: action.payload
            };

        case typesProveedor.setProveedor:
            return {
                ...state,
                proveedor: action.payload
            };


        case typesProveedor.setClear:
            return {
                ...state,
                razonSocial: '',
                direcFiscal: '',
                ruc: '',
                tipo: '',
                celular: '',
                correo: '',
            };



        default:
            return state;
    }
}
