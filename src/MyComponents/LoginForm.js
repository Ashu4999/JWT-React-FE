import { useEffect, useRef, useState } from "react";
import "./index.css";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";

const AUTH_URL = "/auth";

let initialFormFiledsValue = { username: "", password: "" };

export default function LoginForm() {
    const usernameRef = useRef();
    const responseRef = useRef();
    const [formFiledsInfo, setFormFiledsInfo] = useState(initialFormFiledsValue);
    const [isFormValid, setIsFormValid] = useState(false);
    const [responseInfo, setResponseInfoInfo] = useState({ type: "", message: "" });

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const { setAuth } = useAuth();

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        let isFormValid = Object.values(formFiledsInfo).every(item => item !== "");
        setIsFormValid(isFormValid);
        setResponseInfoInfo({ type: "", message: "" });
    }, [formFiledsInfo]);

    const changeValue = (event) => {
        let filedName = event.target.id;
        let fieldValue = event.target.value;
        setFormFiledsInfo(prevState => { return { ...prevState, [filedName]: fieldValue } });
    };

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            let apiBody = { username: formFiledsInfo.username, password: formFiledsInfo.password }

            let response = await axios.post(
                AUTH_URL,
                apiBody,
                { withCredentials: true, } //used when works with httponly cookies
            );

            const accessToken = response.data.accessToken;
            const roles = response.data.roles;
            setAuth({ username: formFiledsInfo.username, accessToken, roles })

            navigate(from, { replace: true });
            setFormFiledsInfo(initialFormFiledsValue);
        } catch (error) {
            console.log(error);
            if (!error.response) {
                setResponseInfoInfo({ type: "error", message: "No server response" });
            } else if (error.response) {
                setResponseInfoInfo({ type: "error", message: error.response.data.message ? error.response.data.message : error.response.data });
            } else {
                setResponseInfoInfo({ type: "error", message: "Login Failed" });
            }
            responseInfo.message && responseRef.current.focus();
        }
    };

    return (
        <section>
            <form onSubmit={submitForm}>
                {responseInfo.message && <p ref={responseRef} aria-live="assertive" className={[responseInfo.type.toLocaleLowerCase() === "error" ? "error-message" : "success-message"]}>{responseInfo.message}</p>}
                <p className="form-name">Login Form</p>

                <label htmlFor="username">Username :</label>
                <input
                    type="text"
                    ref={usernameRef}
                    id="username"
                    autoComplete="off"
                    value={formFiledsInfo.username}
                    onChange={changeValue}
                    required
                />

                <label htmlFor="password">Password :</label>
                <input
                    type="password"
                    id="password"
                    value={formFiledsInfo.password}
                    onChange={changeValue}
                    required
                />

                <button disabled={!isFormValid}>Sign In</button>

                <div>
                    <p className="link">Need an Account?</p>
                    <Link className="link" to="/register">Sign Up</Link>
                </div>
            </form>
        </section>
    );
}