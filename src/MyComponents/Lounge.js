import { Link } from "react-router-dom"

const Lounge = () => {
    return (
        <section className="box-container">
            <p className="form-name">The Lounge</p>
            <p className="text">Admins and Editors can hang out here.</p>
            <Link className="link" to="/">Home</Link>
        </section>
    )
}

export default Lounge;