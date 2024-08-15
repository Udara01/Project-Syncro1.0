// src\Modules\Authentication\components\Log.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../../contexts/UserContext'; 

const Log = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            /*const res = await axios.post('http://localhost:4000/api/auth/login', { ...formData, email: email.toLowerCase() }, { withCredentials: true });
            console.log('Backend response:', res.data);
            const { username, useremail, _id } = res.data;
            setUser({ username, useremail, userId  });
            localStorage.setItem('user', JSON.stringify({ username, useremail, userId  }));
            navigate('/home');*/
        const res = await axios.post('http://localhost:4000/api/auth/login', { ...formData, email: email.toLowerCase() }, { withCredentials: true });
        console.log('Backend response:', res.data);
        const { username, useremail, userId  } = res.data; // Updated to extract _id
        const user = { username, useremail, userId };
        console.log('User data being set:', user); // Debugging log
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
        } catch (err) {
            console.error(err.response.data);
            setError(err.response.data.msg || 'An error occurred');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Login</h3>
                            {error && <div className="alert alert-danger">{error}</div>}
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
                                <button 
                                type="submit" 
                                className="btn btn-primary w-100"
                                style={{ backgroundColor: 'black', borderColor: 'black' }}
                                >Login</button>
                            </form>
                            <div className="mt-3 text-center">
                                <button className="btn btn-link" style={{marginTop:'-10px', marginLeft:'auto', marginBottom:'20px'}}onClick={() => navigate('/forgot-password')}>
                                    Forgot Password?
                                </button>

                                <p
                                    style={{ color:'gray' }}
                                    >Don't have an account yet? Sign up now</p>
                                <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={() => window.location.href = '/signup'}
                                    >
                                    Register
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Log;
