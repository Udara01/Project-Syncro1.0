// src/components/Register.js
/*import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const { username, email, password } = formData;

    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/auth/register', formData, { withCredentials: true });
            console.log(res.data);

            navigate('/login');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Register</h3>
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input 
                                        type="text" 
                                        name="username" 
                                        value={username} 
                                        onChange={onChange} 
                                        className="form-control" 
                                        placeholder="Username" 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={email} 
                                        onChange={onChange} 
                                        className="form-control" 
                                        placeholder="Email" 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        value={password} 
                                        onChange={onChange} 
                                        className="form-control" 
                                        placeholder="Password" 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;*/
//above code is for the without email verification

import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [verificationCode, setVerificationCode] = useState('');
    const [step, setStep] = useState(1); // Step 1: Registration, Step 2: Verification

    const { username, email, password, confirmPassword } = formData;

    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const res = await axios.post('http://localhost:4000/api/auth/register', { ...formData, email: email.toLowerCase() }, { withCredentials: true });
            console.log(res.data);
            setStep(2); // Move to verification step
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const onVerify = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/auth/verify', { email: email.toLowerCase(), verificationCode });
            console.log(res.data);
            navigate('/login');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        {step === 1 ? (
                            <>
                            <h3 className="card-title text-center mb-4">Register</h3>
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input 
                                    type="text" 
                                    name="username" 
                                    value={username} 
                                    onChange={onChange} 
                                    className="form-control" 
                                    placeholder="Username" 
                                    required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={email} 
                                        onChange={onChange} 
                                        className="form-control" 
                                        placeholder="Email" 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        value={password} 
                                        onChange={onChange} 
                                        className="form-control" 
                                        placeholder="Password" 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        name="confirmPassword" 
                                        value={confirmPassword} 
                                        onChange={onChange} 
                                        className="form-control" 
                                        placeholder="Confirm Password" 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Register</button>
                                </form>
                                <div className="mt-3 text-center">
                                    <p>Already have an account?</p>
                                    <button
                                        type="button"
                                        className="btn btn-primary w-100"
                                        style={{ backgroundColor: 'black', borderColor: 'black' }}
                                        onClick={() => window.location.href = '/login'}
                                    >
                                    Login
                                    </button>
                                </div>
                                </>
                            ) : (
                                <>
                                <h3 className="card-title text-center mb-4">Verify Email</h3>
                                <form onSubmit={onVerify}>
                                    <div className="mb-3">
                                        <label htmlFor="verificationCode" className="form-label">Verification Code</label>
                                        <input 
                                            type="text" 
                                            name="verificationCode" 
                                            value={verificationCode} 
                                            onChange={e => setVerificationCode(e.target.value)} 
                                            className="form-control" 
                                            placeholder="Verification Code" 
                                            required 
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Verify</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Register;



