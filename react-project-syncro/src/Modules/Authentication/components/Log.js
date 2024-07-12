// src/components/Login.js
import React, { useState, useContext  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { UserContext } from '../../../contexts/UserContext'; 


const Log = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const { email, password } = formData;

    const { setUser } = useContext(UserContext);//

    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/auth/login', formData, { withCredentials: true });
            console.log('Backend response:', res.data);


            // username and useremail geting from the backend response
            const { username, useremail } = res.data;//Destructure the needed data from the response
            setUser({ username, useremail });// Set the user context

            // Save user data to localStorage
            localStorage.setItem('user', JSON.stringify({ username, useremail }));

            navigate('/home');
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
                            <h3 className="card-title text-center mb-4">Login</h3>
                            <form onSubmit={onSubmit}>
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
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Log;
