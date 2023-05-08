import { useEffect, useRef, useState } from "react";
import "./index.css";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth, useLocalStorage, useToggle } from "../hooks";

const AUTH_URL = "/auth";

let initialFormFiledsValue = { username: "", password: "" };

export default function LoginForm() {
    const [usernameLS, setUsernameLS] = useLocalStorage("username", "");
    let initialFormFiledsValue = { username: usernameLS, password: "" };

    const usernameRef = useRef();
    const responseRef = useRef();
    const [formFiledsInfo, setFormFiledsInfo] = useState(initialFormFiledsValue);
    const [isFormValid, setIsFormValid] = useState(false);
    const [responseInfo, setResponseInfo] = useState({ type: "", message: "" });


    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const { setAuth } = useAuth();
    const [trustCheck, toggleTrustCheck] = useToggle("persist", false);

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        let isFormValid = Object.values(formFiledsInfo).every(item => item !== "");
        setIsFormValid(isFormValid);
        setResponseInfo({ type: "", message: "" });
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
                setResponseInfo({ type: "error", message: "No server response" });
            } else if (error.response) {
                setResponseInfo({ type: "error", message: error.response.data.message ? error.response.data.message : error.response.data });
            } else {
                setResponseInfo({ type: "error", message: "Login Failed" });
            }
            responseInfo.message && responseRef.current.focus();
        }
    };

    return (
        <section>
            <form onSubmit={submitForm}>
                {responseInfo.message && <p ref={responseRef} aria-live="assertive" className={[responseInfo.type.toLocaleLowerCase() === "error" ? "error-message" : "success-message"]}>{responseInfo.message}</p>}
                <p className="form-name">Sign In</p>

                <label htmlFor="username">Username :</label>
                <input
                    type="text"
                    ref={usernameRef}
                    id="username"
                    autoComplete="off"
                    value={formFiledsInfo.username}
                    onChange={(e) => { changeValue(e); setUsernameLS(e.target.value); }}
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

                <div className="trustbox-div">
                    <input type="checkbox" id="trustCheck" checked={trustCheck} onChange={toggleTrustCheck} />
                    <label htmlFor="trustCheck">Trust this device</label>
                </div>

                <button disabled={!isFormValid}>Sign In</button>

                <div>
                    <p className="link">Need an Account?</p>
                    <Link className="link" to="/register">Sign Up</Link>
                </div>
            </form>
        </section>
    );
}