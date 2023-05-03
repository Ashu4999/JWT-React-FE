import { Link } from "react-router-dom"

const EditorPage = () => {
    return (
        <section className="box-container">
            <p className="form-name">Editors Page</p>
            <p className="text">You must have been assigned an Editor role.</p>
            <Link className="link" to="/">Home</Link>
        </section>
    )
}

export default EditorPage;