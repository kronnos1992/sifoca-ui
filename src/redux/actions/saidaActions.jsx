import axios from "axios";
import { saidaTypes } from "../constants/saidaTypes";

const baseUrl = process.env.REACT_APP_BASE_URL + "/movimentos/saida";

export const getAllSaidas = async (dispatch, getState) => {

    dispatch({
        type: saidaTypes.REQ_GET_SAIDA,
    });
    try {
        // api request
        const {userLoginStore: {infoUsuario}} = getState(); 
        const { data } = await axios.get(baseUrl, { 
            headers:{ authorization: `Bearer ${infoUsuario.Token}`}
        });
        dispatch({
            type: saidaTypes.SUCCESS_GET_SAIDA,
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: saidaTypes.FAIL_GET_SAIDA,
            payload: error.message
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

export const newSaida =(saida) => async (dispatch, getState) => {
    dispatch({type: saidaTypes.REQ_INSERT_SAIDA});
    try {
        //api request
        const {userLoginStore: {infoUsuario}} = getState(); 
        const { data } = await axios.post(baseUrl, saida, { 
            headers:{ authorization: `Bearer ${infoUsuario.Token}`}
        })
        dispatch({
            type: saidaTypes.SUCCESS_INSERT_SAIDA,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: saidaTypes.FAIL_INSERT_SAIDA,
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