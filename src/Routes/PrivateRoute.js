import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import Loader from '../CustomComponents/Loader';

const PrivateRoute = ({ children }) => {

    const { user, loader } = useContext(AuthContext);
    const location = useLocation();

    if (loader) {
        return <Loader></Loader>
    }

    if (user?.uid) {
        return children;
    }
    else {
        return <Navigate to={'/signin'} state={{ from: location }} replace></Navigate >
    }
};

export default PrivateRoute;