import { useState, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const [persistent, setPersistent] = useState(JSON.parse(localStorage.getItem("persistent")) || false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persistent, setPersistent }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;