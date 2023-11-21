import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

export default function AdminRoute({component: Component, ...rest}) {
    const userLoginStore = useSelector(state => state.userLoginStore);
    const { infoUsuario} = userLoginStore;
    return (
        <Route {...rest} render={(props) => infoUsuario &&
            infoUsuario.usuarioAdmin? (
            <Component {...props}></Component>
            ):
            (
                <Redirect to="auth/login" />
            )
            }>
        </Route>
    );
}