import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios for HTTP requests
import '../../src/styles/SignUp.css';

const SignUp = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!validateEmail(form.email)) {
            newErrors.email = "Email must be a valid @gmail.com address.";
        }
        if (!validatePassword(form.password)) {
            newErrors.password = "Password must contain at least 8 characters, including uppercase, lowercase, number, and symbol.";
        }
        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            console.log("Called Submit Button form", form);
            // Clear errors if the form is valid
            setErrors({});
            try {
                // const response = await axios.post('http://3.128.64.253:5020/signup',
                    const response = await axios.post('http://localhost:5020/signup',
                    {
                        FirstName: form.firstName,
                        LastName: form.lastName,
                        Email: form.email,
                        Password: form.password,
                    });

                if (response.status === 201) {
                    console.log("User registered successfully");
                    navigate('/signin');
                } else {
                    console.log("Failed to register user");
                    setErrors({ submit: "Failed to register user." });
                }
            } catch (error) {
                console.error("Error during registration:", error);
                setErrors({ submit: "An error occurred during registration." });
            }
        }
    };

    return (
        <div className="fullScreen">
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                        {errors.email && <p className="error">{errors.email}</p>}
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
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </div>
                    {errors.submit && <p className="error">{errors.submit}</p>}
                    <button type="submit">Sign Up</button>
                </form>
                <div className="signin-link">
                    <p>Already signed in? <Link to="/signin">Sign In</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
