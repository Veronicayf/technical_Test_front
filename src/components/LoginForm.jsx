import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(credentials)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/task');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className='bg-white shadow-lg border-gray-200 border-2 max-w-sm p-6 rounded-lg mt-10'>
            <h2 className='text-2xl font-bold mb-4 text-black'>Login</h2>

            {error && <p className="text-red-500 mb-4">{error.message || "Login failed"}</p>}
            {loading && <p className="text-blue-500 mb-4">Loading...</p>}

            <label htmlFor="email" className='block text-lg font-bold mb-2 text-black'>Email:</label>
            <input
                type="email"
                name="email"
                onChange={handleChange}
                value={credentials.email}
                placeholder="Enter your email"
                className='w-full p-2 rounded-md border border-gray-400 mb-4 bg-gray-100 focus:ring-2 focus:ring-indigo-500 text-black'
            />

            <label htmlFor="password" className='block text-lg font-bold mb-2 text-black'>Password:</label>
            <input
                type="password"
                name="password"
                onChange={handleChange}
                value={credentials.password}
                placeholder="Enter your password"
                className='w-full p-2 rounded-md border border-gray-400 mb-4 bg-gray-100 focus:ring-2 focus:ring-indigo-500 text-black'
            />

            <button className='w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700' disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
};

export default LoginForm;