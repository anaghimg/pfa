import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const Edit = () => {
    const { id } = useParams();
    const [offer, setOffer] = useState({
        titre: '',
        description: '',
        dateExp: ''
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/offre/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    setOffer(response.data.offre);
                } else {
                    console.error(`Erreur lors de la récupération de l'offre : code d'état ${response.status}`);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'offre:', error);
            }
        };

        if (token) {
            fetchOffer();
        }
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/offre/${id}`, offer, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                navigate('/offres');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'offre:', error);
        }
    };

    if (!offer) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h2>Modifier l'Offre</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitre">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control
                        type="text"
                        value={offer.titre}
                        onChange={(e) => setOffer({ ...offer, titre: e.target.value })}
                    />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        value={offer.description}
                        onChange={(e) => setOffer({ ...offer, description: e.target.value })}
                    />
                </Form.Group>

                <Form.Group controlId="formDateExp">
                    <Form.Label>Date d'expiration</Form.Label>
                    <Form.Control
                        type="date"
                        value={new Date(offer.dateExp).toISOString().split('T')[0]}
                        onChange={(e) => setOffer({ ...offer, dateExp: e.target.value })}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Enregistrer</Button>
                <Button variant="secondary" onClick={() => navigate('/offres')}>Annuler</Button>
            </Form>
        </div>
    );
};

export default Edit;
