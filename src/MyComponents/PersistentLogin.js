import { useEffect, useState } from "react";
import { useAuth, useRefreshToken } from "../hooks";
import { Outlet } from "react-router-dom";

const PersistentLogin = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                const token = await refresh();
                console.log(token);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        !auth?.accessToken
            ? verifyRefreshToken() //if accessToken doesn't exists then call persistentLogin
            : setIsLoading(false);

    }, []);

    return (
        isLoading
            ? <div className="load"></div>
            : <Outlet />
    )
}

export default PersistentLogin;