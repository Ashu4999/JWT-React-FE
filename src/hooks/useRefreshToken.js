import { useAuth } from "../hooks";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

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
            navigate("/login", {
                state: { from: location }, replace: true
            });
            setAuth({});
        }
    };
    return refresh;
};

export default useRefreshToken;