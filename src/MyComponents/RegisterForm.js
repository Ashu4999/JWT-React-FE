import { useEffect, useRef, useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function RegisterForm() {
    const usernameRef = useRef();
    const responseRef = useRef();
    const [responseInfo, setResponseInfoInfo] = useState({ type: "", message: "" });

    const [formFiledsInfo, setFormFiledsInfo] = useState({
        username: { value: "", focus: false, valid: false },
        password: { value: "", focus: false, valid: false },
        confirmPassword: { value: "", focus: false, valid: false },
    });
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const changeFormFieldValue = (filedName, filedElement, filedValue) => {
        setFormFiledsInfo(prevState => { return { ...prevState, [filedName]: { ...prevState[filedName], [filedElement]: filedValue } } });
    };

    useEffect(() => {
        let checkUserName = USER_REGEX.test(formFiledsInfo.username.value);
        // setFormFiledsInfo(prevState => { return { ...prevState, username: { ...prevState["username"], valid: checkUserName } } });
        changeFormFieldValue("username", "valid", checkUserName);
    }, [formFiledsInfo.username.value]);

    useEffect(() => {
        let checkPassValid = PWD_REGEX.test(formFiledsInfo.password.value);
        changeFormFieldValue("password", "valid", checkPassValid);
        let isPasswordsMached = formFiledsInfo.password.value === formFiledsInfo.confirmPassword.value;
        changeFormFieldValue("confirmPassword", "valid", isPasswordsMached);
    }, [formFiledsInfo.password.value, formFiledsInfo.confirmPassword.value]);

    useEffect(() => {
        setResponseInfoInfo({ type: "", message: "" });
    }, [formFiledsInfo.username.value, formFiledsInfo.password.value, formFiledsInfo.confirmPassword.value]);

    useEffect(() => {
        let checkFormValid = Object.values(formFiledsInfo).every(item => item.valid === true);
        setIsFormValid(checkFormValid);
    }, [formFiledsInfo]);

    const changeValue = (event) => {
        let filedName = event.target.id;
        let filedValue = event.target.value;
        changeFormFieldValue(filedName, "value", filedValue);
    };

    const changeFocus = (event) => {
        let filedName = event.target.id;
        let filedValue = event.type === "focus" ? true : false;
        setFormFiledsInfo(prevState => { return { ...prevState, [filedName]: { ...prevState[filedName], focus: filedValue } } });
    };

    const submitForm = async (event) => {
        try {
            event.preventDefault();

            //if try to submit form using JS in console (hacking)
            if (!isFormValid)
                throw new Error("Invalid Entry");

            let apiBody = {
                username: formFiledsInfo.username.value,
                password: formFiledsInfo.password.value,
            };

            await axios.post("/register", apiBody);
            setResponseInfoInfo({ type: "sucess", message: "Registered" });
        } catch (error) {
            // console.log(error);
            if (!error.response) {
                setResponseInfoInfo({ type: "error", message: "No server response" });
            } else if (error.response?.status === 409) {
                console.log(error.response);
                setResponseInfoInfo({ type: "error", message: error.response.data.message });
            } if (error.message) {
                setResponseInfoInfo({ type: "error", message: error.message });
            } else {
                setResponseInfoInfo({ type: "error", message: "Registration Failed" });
            }
            responseInfo.message && responseRef.current.focus();
        }
    };

    return (
        <section>
            <form onSubmit={submitForm}>
                {responseInfo.message && <p ref={responseRef} aria-live="assertive" className={[responseInfo.type.toLocaleLowerCase() === "error" ? "error-message" : "success-message"]}>{responseInfo.message}</p>}

                <p className="form-name">Sign Up</p>

                <label htmlFor="username" className="label-with-icon">Username :
                    {formFiledsInfo.username.value && <span>
                        {(formFiledsInfo.username.valid) ? <FontAwesomeIcon icon={faCheck} color="green" size="lg" /> : <FontAwesomeIcon icon={faTimes} color="crimson" size="lg" className={"fa-beat-fade"} />}
                    </span>}
                </label>
                <input
                    type="text"
                    ref={usernameRef}
                    id="username"
                    autoComplete="off"
                    value={formFiledsInfo.username.value}
                    onChange={changeValue}
                    onFocus={changeFocus}
                    onBlur={changeFocus}

                    aria-invalid={formFiledsInfo.username.valid}
                    aria-describedby="usernameNote"
                />
                <p id="usernameNote" className={(formFiledsInfo.username.valid || !formFiledsInfo.username.value) ? "remove" : "error-info"}>
                    <FontAwesomeIcon icon={faInfoCircle} className="fa-duotone" color="#fff" size="lg" /> 4 to 24 characters. <br />
                    Must begin with a letter. <br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="password" className="label-with-icon">Password :
                    {formFiledsInfo.password.value && <span>
                        {(formFiledsInfo.password.valid) ? <FontAwesomeIcon icon={faCheck} color="green" size="lg" /> : <FontAwesomeIcon icon={faTimes} color="crimson" size="lg" className={"fa-beat-fade"} />}
                    </span>}
                </label>
                <input
                    type="password"
                    id="password"
                    value={formFiledsInfo.password.value}
                    onChange={changeValue}
                    onFocus={changeFocus}
                    onBlur={changeFocus}

                    aria-invalid={formFiledsInfo.password.valid}
                    aria-describedby="passwordNote"
                />
                <p id="passwordNote" className={(formFiledsInfo.password.valid || !formFiledsInfo.password.value) ? "remove" : "error-info"}>
                    <FontAwesomeIcon icon={faInfoCircle} className="fa-duotone" color="#fff" size="lg" /> 8 to 24 characters. <br />
                    Must inclue uppercase and lowercase letters, a number and a special characters. <br />
                    Allowed special characters. <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirmPassword" className="label-with-icon">Confirm Password :
                    {formFiledsInfo.confirmPassword.value && <span>
                        {(formFiledsInfo.confirmPassword.valid) ? <FontAwesomeIcon icon={faCheck} color="green" size="lg" /> : <FontAwesomeIcon icon={faTimes} color="crimson" size="lg" className={"fa-beat-fade"} />}
                    </span>}
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={formFiledsInfo.confirmPassword.value}
                    onChange={changeValue}
                    onFocus={changeFocus}
                    onBlur={changeFocus}

                    aria-invalid={formFiledsInfo.confirmPassword.valid}
                    aria-describedby="confirmPassword"
                />
                <p id="confirmPassword" className={(formFiledsInfo.confirmPassword.valid || !formFiledsInfo.confirmPassword.value) ? "remove" : "error-info"}>
                    <FontAwesomeIcon icon={faInfoCircle} className="fa-duotone" color="#fff" size="lg" /> Passwords not maching.
                </p>

                <button disabled={!isFormValid}>Sign Up</button>

                <div>
                    <p className="link">Already Registered?</p>
                    <Link className="link" to="/login">Sign In</Link>
                </div>
            </form>
        </section>
    );
}