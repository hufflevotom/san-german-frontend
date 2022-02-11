import { typesAlmacen } from "../types/types";

const initState = {
    codigo: '',
    nombre: '',
    almacen: [],
};

export const AlmacenReducer = (state = initState, action) => {
    switch (action.type) {
        case typesAlmacen.setCodigo:
            return {
                ...state,
                codigo: action.payload
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

        default:
            return state;
    }
}