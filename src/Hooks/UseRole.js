import { useEffect, useState } from "react"

const useRole = (email) => {
    const [role, setRole] = useState('');
    const [roleLoader, setRoleLoader] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`https://resaledotcom-server.vercel.app/users?email=${email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('resale token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setRoleLoader(false);
                    setRole(data.role);
                })
        }
    }, [email]);

    return [role, roleLoader]
};

export default useRole;