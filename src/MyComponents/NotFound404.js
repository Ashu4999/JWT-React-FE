import { Link } from "react-router-dom"

const NotFound404 = () => {
    return (
        <section className="box-container">
            <p className="form-name">Oops!</p>
            <p className="text">Page Not Found</p>
            <Link className="link" to="/">Visit Our Homepage</Link>
        </section>
    )
}

export default NotFound404;