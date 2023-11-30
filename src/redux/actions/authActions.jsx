import axios from 'axios'
import { authTypes } from '../constants/authTypes';

const baseUrl = process.env.REACT_APP_BASE_URL + "/auth/";

export const handleLogin = (username, password) => async(dispatch) =>{
    
    dispatch({
        type: authTypes.USUARIO_LOGIN_REQ,
        payload: {username, password}
    });

    try {
        const { data } = await axios.post(`${baseUrl}login`, {username, password});
        dispatch({
            type: authTypes.USUARIO_LOGIN_SUCESSO,
            payload: data
        });
        localStorage.setItem("infoUsuario", JSON.stringify(data));
        
    } catch (error) {
        // buscar o error apartir do backend
        dispatch({
            type: authTypes.USUARIO_LOGIN_FALHOU,
            payload: 
                error.response && error.response.data.message
                    ?
                    error.response.data.message
                    :
                    error.message
        })
    }
}
export const handleSignup = (usuario) => async(dispatch, getState) =>{
    
    dispatch({
        type: authTypes.USUARIO_REGISTRO_REQ,
        payload: usuario
    });

    try {
        const {userLoginStore: {infoUsuario}} = getState(); 
        const { data } = await axios.post(`${baseUrl}signup`, usuario, { 
            headers:{ authorization: `Bearer ${infoUsuario.Token}`}
        });
        dispatch({
            type: authTypes.USUARIO_REGISTRO_SUCESSO,
            payload: data
        });
        localStorage.setItem("infoUsuario", JSON.stringify(data));        
    } catch (error) {
        // buscar o error apartir do backend
        dispatch({
            type: authTypes.USUARIO_REGISTRO_FALHOU,
            payload: 
                error.response && error.response.data.message
                    ?
                    error.response.data.message
                    :
                    error.message
        })
    }
}
export const detalheUsuario = (idUsuario) => async(dispatch, getState) =>{
    dispatch({ 
        type: authTypes.USUARIO_DETALHE_REQ,
        payload: idUsuario
    });

    const { usuarioLogin:{infoUsuario}} = getState(); 

    try {
        const { data } = await axios.get(`api/usuarios/${idUsuario}`,{
            headers: {
                authorization: `Bearer ${infoUsuario.token}`
            }
        });
        dispatch({
            type: authTypes.USUARIO_DETALHE_SUCESSO,
            payload: data
        })
    } catch (error) {
        const message =
        error.response && error.response.data.message
                    ?
                    error.response.data.message
                    :
                    error.message;
        dispatch({
            type: authTypes.USUARIO_DETALHE_FALHOU,
            payload: message
        })
    }
}
export const atualizarPerfilUsuario = (usuario) => async (dispatch, getState) =>{
    
    dispatch({
        type:authTypes.USUARIO_ATUALIZAR_PERFIL_REQ,
        payload: usuario
    });

    const { usuarioLogin:{infoUsuario}} = getState(); 

    try {
        const { data } = await axios.put(`/api/usuarios/atualizar`, usuario, {
            headers: {authorization: `Bearer ${infoUsuario.token}`}
        });

        dispatch({
            type: authTypes.USUARIO_ATUALIZAR_PERFIL_SUCESSO,
            payload: data
        });

        dispatch({
            type: authTypes.USUARIO_LOGIN_SUCESSO,
            payload: data
        });

        localStorage.setItem('infoUsuario', JSON.stringify(data));

    } catch (error) {
        const message =
        error.response && error.response.data.message
                    ?
                    error.response.data.message
                    :
                    error.message;
        dispatch({
            type: authTypes.USUARIO_ATUALIZAR_PERFIL_FALHOU,
            payload: message
        })
    }

}
export const getAllUsers = () => async (dispatch, getState) => {
    dispatch({
        type: authTypes.USUARIO_GET_REQ,
    });
    // api request
    const {userLoginStore: {infoUsuario}} = getState(); 
    try {
        const { data } = await axios.get(`${baseUrl}all`, { 
            //params:{dataInicial, dataFinal},
            headers:{ authorization: `Bearer ${infoUsuario.Token}`}
        });
        dispatch({
            type: authTypes.USUARIO_GET_SUCESSO,
            payload: data
        });
        
    } catch (error) {
        const message = 
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({
            type: authTypes.USUARIO_GET_FALHOU,
            payload: message
        });
    }
}
export const handleLogout = () =>(dispatch) =>{
    localStorage.removeItem('infoUsuario');
    dispatch({ type: authTypes.USUARIO_SAIR  });
}