import { useEffect, useState } from "react";
import { useAuth, useRefreshToken } from "../hooks";
import { Outlet } from "react-router-dom";

const PersistentLogin = () => {
    const { auth, persistent } = useAuth();
    const refresh = useRefreshToken();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                const token = await refresh();
                console.log(token);
            } catch (error) {
                console.log(error);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        !auth?.accessToken && persistent // if persist false then don't get new token redirect to login
            ? verifyRefreshToken() //if accessToken doesn't exists then call persistentLogin
            : setIsLoading(false);

        return () => {
            isMounted = false;
        }
    }, []);

    return (
        isLoading
            ? <div className="loader"></div>
            : <Outlet />
    )
}

export default PersistentLogin;