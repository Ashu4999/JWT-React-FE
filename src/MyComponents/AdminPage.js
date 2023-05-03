import { Link } from "react-router-dom"

const AdminPage = () => {
    return (
        <section className="box-container">
            <p className="form-name">Admins Page</p>
            <p className="text">You must have been assigned an Admin role.</p>
            <Link className="link" to="/">Home</Link>
        </section>
    )
}

export default AdminPage;