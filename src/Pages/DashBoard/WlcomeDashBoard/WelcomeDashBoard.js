import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';

const WelcomeDashBoard = () => {

    const { user } = useContext(AuthContext);

    return (
        <section className="flex items-center h-[screen] p-16 dark:dark:text-gray-100">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-5xl dark:dark:text-gray-600">
                        <span>Welcome to <br /> {user?.displayName}</span> <br /> Dashboard
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default WelcomeDashBoard;