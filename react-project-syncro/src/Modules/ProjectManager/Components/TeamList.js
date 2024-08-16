import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col, Table, Form, Button, Card, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Team from '../../../contexts/Team';  // Import the Team component

const TeamList = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios.get('/api/teams').then(response => {
            setTeams(response.data);
        });
    }, []);

    return (
        <div>
            {teams.map(team => (
                <div key={team._id}>
                    <h3>{team.name}</h3>
                    <p>{team.description}</p>
                    <div>
                        {team.members.map(member => (
                            <span key={member._id}>{member.name}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeamList;
