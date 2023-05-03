import { Link } from "react-router-dom";

export default function Links() {
    return (
        <section className="box-container">
            <p className="form-name">Links</p>
            <div>
                <p className="form-name" style={{ margin: 0 }}>Public</p>
                <Link className="link" to="/login">Login</Link>
                <Link className="link" to="/register">Register</Link>
            </div>

            <div>
                <p className="form-name" style={{ margin: 0 }}>Private</p>
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/editor">Editor Page</Link>
                <Link className="link" to="/admin">Admin Page</Link>
            </div>
        </section>
    );
}