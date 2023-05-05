import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks";

export default function Home() {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate("/linkPage");
    };

    return (
        <section className="box-container">
            <p className="form-name">Home</p>
            <p className="text">You are logged in!</p>
            <Link className="link" to="/editor">Go to the Editor page</Link>
            <Link className="link" to="/admin">Go to Admin page</Link>
            <Link className="link" to="/lounge">Go to the Lounge</Link>
            <Link className="link" to="/linkpage">Go to the link page</Link>
            <button onClick={signOut}>Sign out</button>
        </section>
    );
}