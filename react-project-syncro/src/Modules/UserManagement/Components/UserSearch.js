import React, { useState } from 'react';
import axios from 'axios';

const UserSearch = ({ onUserClick }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/users/search?query=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error("Error searching users", error);
        }
    };

    return (
        <div className="container mt-3">
            <input
                type="text"
                placeholder="Search by username or email"
                className="form-control"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-primary mt-2" onClick={handleSearch}>Search</button>
            <div className="list-group mt-3">
                {results.map((user) => (
                    <button
                        key={user._id}
                        className="list-group-item list-group-item-action"
                        onClick={() => onUserClick(user._id)}
                    >
                        {user.username} - {user.email}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserSearch;
