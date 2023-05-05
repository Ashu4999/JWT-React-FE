import { useEffect } from 'react'
import { useAuth, useRefreshToken } from '../hooks';
import { axiosPrivate } from '../api/axios';

//hook to atach interceptior to axios instance.
const useAxiosPrivate = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                //could be fist time when Authorization is not set up sign in time
                if (!config.headers["Authorization"])
                    config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            //if access token expired then. 
            async (error) => {
                //getting previos request
                const pervRequest = error?.config;

                //
                if (error?.response?.status === 403 && !pervRequest.sent) {
                    // adding pervRequest.sent to true and checking in condition to not caught in infinite loops
                    pervRequest.sent = true;
                    const newAccessToken = await refresh(); // setting new token in headers
                    pervRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(pervRequest);
                }
                return Promise.reject(error);
            }
        );


        return () => {
            //removing interceptor less will gonna piled up
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        };
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;