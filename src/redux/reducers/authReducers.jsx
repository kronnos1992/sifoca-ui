import { authTypes } from "../constants/authTypes";

export const loginReducer = (state={}, action) =>{
    switch (action.type) {
        case authTypes.USUARIO_LOGIN_REQ:
            return{
                loading: true
            };
        
        case authTypes.USUARIO_LOGIN_SUCESSO:
            return{
                loading: false,
                infoUsuario: action.payload
            }

        case authTypes.USUARIO_LOGIN_FALHOU:
            return{
                loading: false,
                error: action.payload 
            }

        case authTypes.USUARIO_SAIR:
            return {};
            
        default:
            return state;
    }
}

export const registroReducer = (state={}, action) =>{
    switch (action.type) {
        case authTypes.USUARIO_REGISTRO_REQ:
            return{
                loading: true
            };
        
        case authTypes.USUARIO_REGISTRO_SUCESSO:
            return{
                loading: false,
                success:true,                                                                                               
                infoUsuario: action.payload
            }
        case authTypes.USUARIO_REGISTRO_FALHOU:
            return{
                loading: false,
                success: false,
                error: action.payload 
            }
        case authTypes.USUARIO_REGISTRO_RESET:
            return {
                ...state
            }
            
        default:
            return state;
    }
}

export function getAllUsersReducer (state = {}, action) { 
    switch (action.type) {

        case authTypes.USUARIO_GET_REQ:
            return {
                loading: true,
            };

        case authTypes.USUARIO_GET_SUCESSO:
            return {
                loading: false,
                state,
                users: [...action.payload]
            };

        case authTypes.USUARIO_GET_FALHOU:
            return {
                loading: false,
                error: [...action.payload]
            };

        default:
            return state

    }
};

export const detalheUsuarioReducer = (state = {loading: true}, action) =>{
    switch (action.type) {
        case authTypes.USUARIO_DETALHE_REQ:
            return{
                loading: true
            };
        
        case authTypes.USUARIO_DETALHE_SUCESSO:
            return{
                loading: false,
                usuario: action.payload
            }
        
        case authTypes.USUARIO_DETALHE_FALHOU:
            return{
                loading: false,
                error: action.payload 
            }
            
        default:
            return state;
    }
}

export const atualizarPerfilUsuarioReducer = (state = {}, action) =>{
    switch (action.type) {
        case authTypes.USUARIO_ATUALIZAR_PERFIL_REQ:
            return{
                loading: true
            };
        
        case authTypes.USUARIO_ATUALIZAR_PERFIL_SUCESSO:
            return{
                loading: false,
                sucesso: true
            }
        
        case authTypes.USUARIO_ATUALIZAR_PERFIL_FALHOU:
            return{
                loading: false,
                error: action.payload 
            }

        case authTypes.USUARIO_ATUALIZAR_PERFIL_RESET:
            return {};
            
        default:
            return state;
    }
}