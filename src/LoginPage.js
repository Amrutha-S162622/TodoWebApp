import { useState } from "react";
import './Home.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [responseData, setResponseData] = useState('');
    const navigate = useNavigate();

    const handleEmail = (event) => {
        setEmail(event.target.value);
        setEmailError('');
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
        setPasswordError('');
    };

    const handleLogin = async (result) => {
        console.log("Login result:", result);  
        if (result.message === "Login successful" && result.userId) {
            localStorage.setItem('userId', result.userId);  
            console.log('User ID stored in localStorage:', result.userId);
        } else {
            console.log('Error: No userId in the result.');
            setEmailError('Login failed: No userId returned');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();  

        let error = true;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

        if (!email.trim()) {
            setEmailError('Email is required');
            error = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Enter a valid email id');
            error = false;
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            error = false;
        }

        if (error) {
            const data = { 
                email, 
                password 
            };

            try {
                const response = await fetch("http://localhost:8080/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (!response.ok) {
                    setEmailError(result.message || "Login failed");
                    return;
                }

                setResponseData(result);  
                alert("Login successful!");

                handleLogin(result);

                setEmail('');
                setPassword('');
                setEmailError('');
                setPasswordError('');
                navigate('/todopage');  

            } catch (err) {
                setEmailError("An error occurred. Please try again.");
                console.error("Fetch error:", err);
            }
        } else {
            setResponseData(null);
        }
    };

    return (
        <div>
            <div className="card-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={handleEmail}
                    />
                    {emailError && <p>{emailError}</p>}
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={handlePassword}
                    />
                    {passwordError && <p>{passwordError}</p>}
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
