import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

export default function PrivateRoute({component: Component, ...rest}) {
    const userLoginStore = useSelector(state => state.userLoginStore);
    const { infoUsuario} = userLoginStore;
    return (
        <Route {...rest} render={(props) => infoUsuario? (
            <Component {...props}></Component>
        ):
        (
            <Redirect to="auth/login" />
        )
        }>

        </Route>
    );
}