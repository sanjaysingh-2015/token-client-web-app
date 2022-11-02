import React from 'react';
import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    return loggingIn ? <Component /> : <Navigate to="/login" />
}
export { PrivateRoute };