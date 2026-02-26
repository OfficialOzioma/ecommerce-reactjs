import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const [mode, setMode] = useState("signup");
    const [error, setError] = useState(null);
    const { signUp, user, login, logout } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    function onSubmit(data) {
        setError(null);
        let result;
        if (mode === "signup") {
            result = signUp(data.email, data.password);
        } else {
            result = login(data.email, data.password);
        }
        if (!result.success) {
            setError(result.message);
        } else {
            navigate("/");
        }
    }
    return (
        <div className="page">
            <div className="container">
                <div className="auth-container">
                    <h1 className="page-title">
                        {mode === "signup" ? "Create an account" : "Login to your account"}
                    </h1>
                    {user && <p>Welcome, {user.email}!</p>}
                    <button onClick={() => logout()}>Logout</button>
                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        {error && <div className="error-message">{error}</div>}

                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email:</label>
                            <input className="form-input" type="email" id="email" {...register("email", { required: "Email is required" })} />
                            {errors.email && <span className="form-error">{errors.email.message}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password:</label>
                            <input className="form-input" type="password" id="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6, message: "Password must be at least 6 characters"
                                    },
                                    maxLength: {
                                        value: 12, message: "Password must not exceed 12 characters"
                                    }
                                })}
                            />
                            {errors.password && <span className="form-error">{errors.password.message}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-large">
                            {mode === "signup" ? "Sign Up" : "Login"}
                        </button>
                    </form>

                    <div className="auth-switch">
                        {mode === "signup" ? (
                            <p>Already have an account? <span className="auth-link" onClick={() => setMode("login")}>Login</span></p>
                        ) : (
                            <p>Don't have an account? <span className="auth-link" onClick={() => setMode("signup")}>Sign up</span></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}