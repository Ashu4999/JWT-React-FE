import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(item => allowedRoles.includes(item))
            ? <Outlet />
            : auth?.username ? <Navigate to="unauthorized" state={{ from: location }} replace />
                : <Navigate to="login" state={{ from: location }} replace />
    );
};

export default RequireAuth;