import { useAuth } from "../hooks";
import axios from "../api/axios";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        try {
            await axios("/logout", { withCredentials: true });
            setAuth({});
        } catch (error) {
            console.log(error);
        }
    };

    return logout;
};

export default useLogout;