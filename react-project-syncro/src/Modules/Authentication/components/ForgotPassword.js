import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleSendCode = async () => {
        try {
            await axios.post('http://localhost:4000/api/auth/forgot-password', { email: email.toLowerCase() });
            setStep(2);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const handleVerifyCode = async () => {
        try {
            await axios.post('http://localhost:4000/api/auth/verify-reset-code', { email: email.toLowerCase(), code });
            setStep(3);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://localhost:4000/api/auth/reset-password', { email: email.toLowerCase(), password });
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
                            {step === 1 && (
                                <>
                                    <h3 className="card-title text-center mb-4">Forgot Password</h3>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            value={email} 
                                            onChange={e => setEmail(e.target.value)} 
                                            className="form-control" 
                                            placeholder="Enter your email" 
                                            required 
                                        />
                                    </div>
                                    <button className="btn btn-primary w-100" onClick={handleSendCode}>Send Verification Code</button>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <h3 className="card-title text-center mb-4">Verify Code</h3>
                                    <div className="mb-3">
                                        <label htmlFor="code" className="form-label">Verification Code</label>
                                        <input 
                                            type="text" 
                                            name="code" 
                                            value={code} 
                                            onChange={e => setCode(e.target.value)} 
                                            className="form-control" 
                                            placeholder="Enter the code" 
                                            required 
                                        />
                                    </div>
                                    <button className="btn btn-primary w-100" onClick={handleVerifyCode}>Verify Code</button>
                                </>
                            )}
                            {step === 3 && (
                                <>
                                    <h3 className="card-title text-center mb-4">Reset Password</h3>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">New Password</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            value={password} 
                                            onChange={e => setPassword(e.target.value)} 
                                            className="form-control" 
                                            placeholder="Enter new password" 
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                                        <input 
                                            type="password" 
                                            name="confirmPassword" 
                                            value={confirmPassword} 
                                            onChange={e => setConfirmPassword(e.target.value)} 
                                            className="form-control" 
                                            placeholder="Confirm new password" 
                                            required 
                                        />
                                    </div>
                                    <button className="btn btn-primary w-100" onClick={handleResetPassword}>Reset Password</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
