import "./login-page.css";
import { useState } from "react";
import axios from "axios";
function Login() {
    const[error, setError] = useState("");
    function login(){
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        if(email == "" || password == ""){
            setError("Please fill in all fields");
            return;
        }
        setError("");
        axios.post("https://extramixture-api.vercel.app/auth/login", {
            email: email,
            password: password
        }).then((response) => {
            if(response.data.error){
                setError(response.data.error);
            }else{
                localStorage.setItem("token", response.data.token);
                window.location.href = "/";
            }
        })
    }
    return (
        <>
            <div className="loginPanel">
                <div className="headerLogin">Login</div>
                <form>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required></input>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required></input>
                    <div className="error">{error}</div>
                    <div className="register">
                        <div>First time here?</div>
                        <a href="/register">Register</a>
                    </div>
                </form>
            </div>
            <button className="submit" onClick={login}>Login</button>
        </>
    )
}
export default Login