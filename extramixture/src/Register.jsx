import axios from "axios";
import "./Register-page.css";
import { useState } from "react";
function Register() {
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [emailError, setEmailError] = useState("")
    function register() {
        var username = document.getElementById("username").value
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        var passwordError = "";
        var validCharacters =
            ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        var upperCaseCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        var lowerCaseCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        for (let i = 0; i < username.length; i++) {
            if (validCharacters.includes(username[i]) == false) {
                setUsernameError("Username should only contain letters and numbers")
                return
            }
        }
        if (username.length > 32) {
            setUsernameError("Username should be less than 32 characters")
            return
        }
        setUsernameError("")
        if (password.length > 64) {
            setPasswordError("Password should be less than 64 characters")
            return
        }
        if (password.length < 8) {
            setPasswordError("Password should be at least 8 characters")
            return
        }
        var checkPasswordSpecial = false;
        var checkPasswordNumber = false;
        var checkPasswordUpper = false;
        var checkPasswordLower = false;
        for (let i = 0; i < password.length; i++) {
            if (validCharacters.includes(password[i]) == false) {
                checkPasswordSpecial = true;
            }
            if (numbers.includes(password[i])) {
                checkPasswordNumber = true;
            }
            if (upperCaseCharacters.includes(password[i])) {
                checkPasswordUpper = true;
            }
            if (lowerCaseCharacters.includes(password[i])) {
                checkPasswordLower = true;
            }
        }
        if (!checkPasswordLower) {
            setPasswordError("Password should contain at least one lowercase letter")
            return;
        }
        if (!checkPasswordUpper) {
            setPasswordError("Password should contain at least one uppercase letter")
            return;
        }
        if (!checkPasswordNumber) {
            setPasswordError("Password should contain at least one number")
            return;
        }
        if (!checkPasswordSpecial) {
            setPasswordError("Password should contain at least one special character")
            return;
        }
        setPasswordError("")
        axios.post("http://localhost:5174/auth/register", {
            username: username,
            email: email,
            password: password
        }).then((response) => {
            if (response.data.error) {
                if (response.data.error == "Username already exists") {
                    setUsernameError("Username already exists")
                } else if (response.data.error == "Email already exists") {
                    setEmailError("Email already exists")
                } 
            }else {
                window.location.href = "/";
            }
        })
    }
    return (
        <>
            <div className="registerPanel">
                <div className="headerRegister">Register</div>
                <form>
                    <div>
                        <span>Username:</span><span class="error"> {usernameError}</span>
                    </div>
                    <input type="text" id="username" name="username" required></input>
                    <div>
                    <span>Email:</span><span class="error"> {emailError}</span>
                    </div>
                    <input type="email" id="email" name="email" required></input>
                    <div>
                        <span>Password:</span><span class="error"> {passwordError}</span>
                    </div>
                    <input type="password" id="password" name="password" required></input>
                    <div className="register">
                        <div>Already have an account?</div>
                        <a href="/login">Login</a>
                    </div>
                </form>
            </div>
            <button className="submit" onClick={register}>Register</button>
        </>
    )
}
export default Register