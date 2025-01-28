import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import NavBar from '../NavBar';
import SideBar from '../SideBar';

const Offres = () => {
    const [offres, setOffres] = useState([]);
    const [token, setToken] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentOffre, setCurrentOffre] = useState(null);

    useEffect(() => {
        const fetchOffres = async () => {
            try {
                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    setToken(storedToken);
                    const urlSocieteId = localStorage.getItem('societeId');
                    const response = await axios.get(`http://localhost:5000/api/offre?societe=${urlSocieteId}`, {
                        headers: { Authorization: `Bearer ${storedToken}` },
                    });
                    setOffres(response.data.offres);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des offres:', error);
            }
        };

        fetchOffres();
    }, []);

    const handleModifier = (offreId) => {
        const offre = offres.find((o) => o._id === offreId);
        setCurrentOffre(offre);
        setIsEditing(true);
    };
    const handleSupprimer = async (offreId) => {
        try {
            await axios.delete(`http://localhost:5000/api/offre/${offreId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const updatedOffres = offres.filter((offre) => offre._id !== offreId);
            setOffres(updatedOffres);
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'offre:', error.response ? error.response.data : error.message);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/api/offre/${currentOffre._id}`, currentOffre, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const urlSocieteId = localStorage.getItem('societeId');
            const response = await axios.get(`http://localhost:5000/api/offre?societe=${urlSocieteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOffres(response.data.offres);

            setIsEditing(false);
            setCurrentOffre(null);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'offre:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="d-flex">
                <SideBar />
                <div className="container">
                    <h1>Liste des Offres</h1>
                    {isEditing ? (
                        <div>
                            <h2>Modifier l'Offre</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formTitre">
                                    <Form.Label>Titre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={currentOffre.titre}
                                        onChange={(e) => setCurrentOffre({ ...currentOffre, titre: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={currentOffre.description}
                                        onChange={(e) => setCurrentOffre({ ...currentOffre, description: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDateExp">
                                    <Form.Label>Date d'expiration</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={new Date(currentOffre.dateExp).toISOString().split('T')[0]}
                                        onChange={(e) => setCurrentOffre({ ...currentOffre, dateExp: e.target.value })}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">Enregistrer</Button>
                                <Button variant="secondary" onClick={() => setIsEditing(false)}>Annuler</Button>
                            </Form>
                        </div>
                    ) : (
                        <>
                            <Button variant="primary mb-4 mt-3">
                                <Link to="/addOffre" className="nav-link d-none d-sm-inline px-1 ">Ajouter Offre</Link>
                            </Button>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Titre</th>
                                        <th>Description</th>
                                        <th>Date d'expiration</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {offres.map((offre) => (
                                        <tr key={offre._id}>
                                            <td>{offre.titre}</td>
                                            <td>{offre.description}</td>
                                            <td>{new Date(offre.dateExp).toLocaleDateString()}</td>
                                            <td>
                                                <Button variant="success" onClick={() => handleModifier(offre._id)}>
                                                    Modifier
                                                </Button>
                                                <Button variant="danger" style={{ marginLeft: '20px' }} onClick={() => handleSupprimer(offre._id)}>Supprimer</Button>
                                                <Button style={{marginLeft:'20px'}} href='/Gere' >Gérer Demande</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Offres;
