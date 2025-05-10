import { useState } from "react";
import './Home.css'
import { useNavigate } from 'react-router-dom';

function RegistartionPage() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [emailError,setEmailError] = useState('');
    const [passwordError,setPasswordError] = useState('');
    const [allData,setAllData] = useState('');
    const [responseData, setResponseData] = useState('');
    const navigate = useNavigate();

    const handleEmail = (event) => {
        setEmail(event.target.value);
        setEmailError('');
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
        setPasswordError('');
    }
    const handleLogin = async (result) => {
        if (result.message === "Registration successful" && result.userId) {
            localStorage.setItem('userId', result.userId);  
        } else {
            console.log('Error: No userId in the result.');
            setEmailError('Login failed: No userId returned');
        }
    };
    const handleSubmit = async (event) => {
        let error = true;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

        if(!email.trim())
        {
            setEmailError('Email is required');
            error = false;
        }else if(!emailRegex.test(email))
        {
            setEmailError('enter valid email id');
            error = false;
        }

        if(!password.trim())
        {
            setPasswordError('Password is required');
            error = false;
        }
        else if (!passwordRegex.test(password))
        {
            setPasswordError('Password mustbe 8-16 char long including atleast one letter, one number and one special character (!@#$%^&*)');
            error = false;
        }

        if (error) {
            const data = { 
                email, 
                password 
            };
            setAllData(data);
    
            try {
                const response = await fetch("http://localhost:8080/register", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
    
                const result = await response.json();
    
                if (!response.ok) {
                    setEmailError(result.message || "Registration failed");
                    return;
                }
    
                setResponseData(result); 
                alert("Registration successful!");
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
            setAllData(null);
        }
    }
    return (
        <div>
            <div className="card-container">
                <h2>Register Here</h2>
                <form >
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
                    <button type="button" onClick={handleSubmit} className="btn">Register</button>
                </form>
            </div>
        </div>
    );
}

export default RegistartionPage;