import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() && !password.trim()) {
            setError('Email and password are required.');
            setTimeout(() => {
                setError('');
            }, 5000);
            return;
        }
        if (!email.trim()) {
            setError('Email is required.');
            setTimeout(() => {
                setError('');
            }, 5000);
            return;
        }
        if (!password.trim()) {
            setError('password is required.');
            setTimeout(() => {
                setError('');
            }, 5000);
            return;
        }

        try {
            const userData = await UserService.login(email, password);

            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                localStorage.setItem('userId', userData.id);
                navigate('/product-list');
                navigate(0);
            } else {
                setError(userData.error || 'Invalid credentials. Please try again.');
            }
        } catch (error) {
            setError(error.message || 'Something went wrong. Please try again later.');

            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <div className="container-fluid" id="background-div">
            <div className="auth-container">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="submit-button"
                        id="loginButton"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <br />
                    <Link to="/register" className="register-link">
                        New User? Register here!
                    </Link>
                </form>
            </div>
        </div>
    );
}
export default LoginPage;