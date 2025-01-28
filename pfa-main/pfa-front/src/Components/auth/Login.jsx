import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import recrutementImage from '../auth/img/network-reviewing-online-resume-of-job-applicant.gif';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const navigate = useNavigate();


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token);

            const societeId = response.data.societeId;
            localStorage.setItem('societeId', societeId);
            const candidatId = response.data.candidatId; 
            localStorage.setItem('candidatId', candidatId);
            const roleResponse = await axios.get('http://localhost:5000/api/user-role', { headers: { Authorization: `Bearer ${token}` } });
            const role = roleResponse.data.role;
            if (role === 'Societe') {
                onLogin(token, societeId);
                navigate("/dashboard");
            } else if (role === 'Admin') {
                navigate("/dashboardAdmin");
            }else if (role === 'Candidat') {

                navigate("/");
            }
        } catch (err) {
            console.error('Erreur lors de la connexion:', err);

        }
    };

    return (
        <div>
            <header className=" text-white py-3">
                <div className="container text-center">
                    <h1 className="mb-0">Connexion</h1>
                </div>
            </header>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">

                        <img src={recrutementImage} alt="Recrutement" className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                        {/* Formulaire de connexion */}
                        <main className="container py-4">
                            <form onSubmit={handleLoginSubmit}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mot de passe:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        onChange={(e) => setPass(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary " >Se connecter</button>
                                <Link to="/register" className="btn btn-secondary " style={{marginLeft:'10px'}}>S'inscrire</Link>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
            <footer className=" text-white py-3">
                <div className="container text-center ">
                    <p className="mb-0">&copy; 2024 Plateforme de Recrutement</p>
                </div>
            </footer>
        </div>
    );
}

export default Login;
