import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios for HTTP requests
import '../../src/styles/SignIn.css';

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5020/login',
                // const response = await axios.post('http://3.128.64.253:5020/login',
                {
                    Email: form.email,
                    Password: form.password,
                });

            if (response.status === 200) {
                const token = response.data.token;
                const FirstName = response.data.firstName;
                localStorage.setItem('authToken', token);
                localStorage.setItem('firstName', FirstName); 

                console.log("Sign in successful form :-", form);
                console.log("Sign in successful token :-", token);
                console.log("Sign in successful FirstName :-", FirstName);
                console.log("Sign in successful response :-", response);
                navigate('/');
            } else {
                setError("Invalid email or password.");
            }
        } catch (err) {
            console.error("Error during sign in:", err);
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="fullScreen">
            <div className="signin-container">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email ID:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Sign In</button>
                </form>
                <div className="signup-link">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
