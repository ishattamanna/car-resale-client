import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const ErrorPage = () => {
    const { logOut } = useContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <p className='text-red-600'>Something went wrong!!!</p>
            <p className='text-red-600'>{error.statusText || error.message}</p>
            <p className="text-3xl"> Please <button onClick={handleLogOut}>LogOut out</button> and log back in</p>
        </div>
    );
};

export default ErrorPage;