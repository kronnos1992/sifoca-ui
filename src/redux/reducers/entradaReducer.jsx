import { entradaTypes } from "../constants/entradaTypes";

const initialState = {
    entradas: []
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

// export function getCountryReducer (state = initialState, action) {
//     switch (action.type) {

//         case entradaTypes.REQ_DETALHE_ENTRADA:
//             return {
//                 loading: true,
//             };

//         case entradaTypes.SUCCESS_DETALHE_ENTRADA:
//             return {
//                 loading: false,
//                 countries: [...action.payload]
//             };

//         case entradaTypes.FAIL_DETALHE_ENTRADA:
//             return {
//                 loading: false,
//                 error: [...action.payload]
//             }

//         default:
//             return state

//     }
// };

export function newEntradaReducer (state = initialState, action) {
    switch (action.type) {
        case entradaTypes.REQ_INSERT_ENTRADA:
            return { loading: true }

        case entradaTypes.SUCCESS_INSERT_ENTRADA:
            //state.push(action.payload)
            return {
                ...state,
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
                entradas: []
            }

        default:
            return state

    }
}

// export function updateCountryReducer (state = initialState, action) {
//     switch (action.type) {
//         case entradaTypes.REQ_UPDATE_ENTRADA:
//             return { loading: true }

//         case entradaTypes.SUCCESS_UPDATE_ENTRADA:
            
//             return {
//                 success: true,
//                 loading: false,
//                 countries: state.countries.map(x => x.id ===  action.payload.id ? action.payload : x)
//             };

//         case entradaTypes.FAIL_UPDATE_ENTRADA:
//             return {
//                 loading: false,
//                 error: action.payload
//             }

//         case entradaTypes.RESET_UPDATE_ENTRADA:
//             return {
//                 ...state,
//                 countries: []
//             }

//         default:
//             return state

//     }
// }

// export function deleteCountryReducer (state = initialState, action) {
//     switch (action.type) {
//         case entradaTypes.REQ_DELETE_ENTRADA:
//             return { loading: true }

//         case entradaTypes.SUCCESS_DELETE_ENTRADA:
//             return {
//                 loading: false,
//                 success: true
//             };

//         case entradaTypes.FAIL_DELETE_ENTRADA:
//             return {
//                 loading: false,
//                 error: action.payload
//             }

//         case entradaTypes.RESET_DELETE_ENTRADA:
//             return {
//                 ...state,
//                 countries: []
//             }

//         default:
//             return state

//     }
// }