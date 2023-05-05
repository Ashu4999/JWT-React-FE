import { useAuth } from "../hooks";
import axios from "../api/axios";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get("/refresh", {
                withCredentials: true, //used when works with httponly cookies
            });

            setAuth(prevState => {
                return {
                    ...prevState,
                    accessToken: response.data.accessToken,
                    roles: response.data.roles, // setting roles for route role guard
                }
            });

            return response.data.accessToken;
        } catch (error) {
            console.log(error);
        }
    };
    return refresh;
};

export default useRefreshToken;