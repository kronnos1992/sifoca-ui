import { entradaTypes } from "../constants/entradaTypes";

const initialState = {
    entradas: [],
    success: false,
}

export function getAllEntradasReducer (state = initialState, action) { 
    switch (action.type) {

        case entradaTypes.REQ_GET_ENTRADA:
            return {
                loading: true,
            };

        case entradaTypes.SUCCESS_GET_ENTRADA:
            return {
                loading: false,
                state,
                entradas: [...action.payload]
            };

        case entradaTypes.FAIL_GET_ENTRADA:
            return {
                loading: false,
                error: [...action.payload]
            };

        default:
            return state

    }
};

export function getEntradasReducer (state = initialState, action) { 
    switch (action.type) {

        case entradaTypes.REQ_GET_ENTRADA:
            return {
                loading: true,
            };

        case entradaTypes.SUCCESS_GET_ENTRADA:
            return {
                loading: false,
                state,
                entradas: [...action.payload]
            };

        case entradaTypes.FAIL_GET_ENTRADA:
            return {
                loading: false,
                error: [...action.payload]
            };

        default:
            return state

    }
};

export function newEntradaReducer (state = initialState, action) {
    switch (action.type) {
        case entradaTypes.REQ_INSERT_ENTRADA:
            return { loading: true }

        case entradaTypes.SUCCESS_INSERT_ENTRADA:
            return {
                ...state,
                entradas: [state.entradas, action.payload],
                success: true,
                loading: false,
            }

        case entradaTypes.FAIL_INSERT_ENTRADA:
            return {
                loading: false,
                error: [...action.payload]
            }

        case entradaTypes.RESET_INSERT_ENTRADA:
            return {
                ...state,
                initialState
            }

        default:
            return state

    }
}
