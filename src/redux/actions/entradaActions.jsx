import axios from "axios";
import { entradaTypes } from "../constants/entradaTypes";

const baseUrl = process.env.REACT_APP_BASE_URL + "/movimentos/entrada";

export const getAllEntradas = (dataInicial, dataFinal) => async (dispatch, getState) => {
    dispatch({
        type: entradaTypes.REQ_GET_ENTRADA,
    });
    // api request
    const {userLoginStore: {infoUsuario}} = getState(); 
    try {
        const { data } = await axios.get(`${baseUrl}/getbyop`, { 
            params:{dataInicial, dataFinal},
            headers:{ authorization: `Bearer ${infoUsuario.Token}`}
        });
        dispatch({
            type: entradaTypes.SUCCESS_GET_ENTRADA,
            payload: data
        });
        
    } catch (error) {
        const message = 
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({
            type: entradaTypes.FAIL_GET_ENTRADA,
            payload: message
        });
    }
}

// export const getCountryById = async (dispatch, id) => {

//     dispatch( reqOneCountry());
//     try {
//         // api request
//         const { data } = await axios.get(`${baseUrl}${id}`);
//         dispatch( oneCountry(data));
//     } catch (error) {
//         dispatch( errorOneCountry(error.response.message));
//     }
// }

export const insertEntrada = (entrada) => async (dispatch, getState) => {
    dispatch({type: entradaTypes.REQ_INSERT_ENTRADA});
    try {
        const {userLoginStore: {infoUsuario}} = getState(); 
        //api request
        const { data } = await axios.post(baseUrl, entrada, { 
            headers:{ authorization: `Bearer ${infoUsuario.Token}`}
        });
        dispatch({
            type: entradaTypes.SUCCESS_INSERT_ENTRADA,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: entradaTypes.FAIL_INSERT_ENTRADA,
            payload: error.message
        });
    }
}

// export const updateCountry = async (dispatch, country) => {
//     try {
//         // api request
//         const { data } = await axios.put(`${baseUrl}${country.Id}`, country)
//         dispatch( updateCountry(data));
//     } catch (error) {
//         dispatch( errorUpdateCountry(error.message))
//     }
// }

// export const deleteCountry = async (dispatch, country) => {
//     dispatch( reqDeleteCountry());
//     try {
//         // api request
//         await axios.delete(`${baseUrl}${country.Id}`);
//         dispatch( deleteCountry(country));
//     } catch (error) {
//         dispatch( errorDeleteCountry(error.message))
//     }
// }