import { Link } from "react-router-dom"
import { Users } from "../MyComponents";

const AdminPage = () => {
    return (
        <section className="box-container">
            <p className="form-name">Admins Page</p>
            <Users />
            <p className="text">You must have been assigned an Admin role.</p>
            <Link className="link" to="/">Home</Link>
        </section>
    )
}

export default AdminPage;