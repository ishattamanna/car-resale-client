import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const UseToken = (email) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        if (email) {
            fetch(`https://resaledotcom-server.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.accessToken) {
                        localStorage.setItem('resale token', data.accessToken);
                        setToken(data.accessToken);
                    }
                    else {
                        toast.error('Unauthorised Access');
                    }
                })
        }
    }, [email]);

    return [token];
};

export default UseToken;