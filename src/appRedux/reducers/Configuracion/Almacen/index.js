import { typesAlmacen } from "../types/types";

const initState = {
    cargando: false,
    ubicacion: '',
    nombre: '',
    almacen: [],
};

export const AlmacenReducer = (state = initState, action) => {
    switch (action.type) {
        case typesAlmacen.setCargando:
            return {
                ...state,
                cargando: action.payload
            };

        case typesAlmacen.setUbicacion:
            return {
                ...state,
                ubicacion: action.payload
            };

        case typesAlmacen.setNombre:
            return {
                ...state,
                nombre: action.payload
            };

        case typesAlmacen.setAlmacen:
            return {
                ...state,
                almacen: action.payload
            };

        case typesAlmacen.setClear:
            return {
                ...state,
                ubicacion: '',
                nombre: '',
            };

        default:
            return state;
    }
}