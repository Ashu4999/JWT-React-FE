import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();
    return (
        <section className="box-container">
            <p className="form-name">Unauthorized</p>
            <p className="text">You do not have access to the requested page.</p>
            <button onClick={() => navigate(-1)}>Go back</button>
        </section>
    )
}

export default Unauthorized;