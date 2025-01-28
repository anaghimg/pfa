import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartLine, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import './societe.css';
import NavBar from '../NavBar';
import SideBar from '../SideBar';

const GérerDemande = () => {
  const [responsesCandidat, setResponsesCandidat] = useState([]);

  useEffect(() => {
    const fetchResponsesCandidat = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/Quiz/ResCandidat', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setResponsesCandidat(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des réponses des candidats :', error);
      }
    };

    fetchResponsesCandidat();
  }, []);

  const sendConfirmation = async (email, taux) => {
    try {
      const response = await axios.post('http://localhost:5000/api/Quiz/sendConfirmation', {
        email,
        taux
      });
  
      if (response.status === 200) {
        alert('Email de confirmation envoyé');
      } else {
        alert('Erreur lors de l\'envoi de l\'email');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de confirmation :', error);
    }
  };
  

  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <h1 className="text-center mb-3" style={{color:'#007bff'}}><FontAwesomeIcon icon={faUser} /> Réponses des candidats</h1>
            
            {responsesCandidat.map(response => (
              <Card key={response._id} className="mb-2">
                <Card.Body>
                  <Card.Title>
                    <FontAwesomeIcon icon={faUser} /> {response.candidat.nom} {response.candidat.prenom}
                
                  </Card.Title>
                  <Card.Text>
                    <FontAwesomeIcon icon={faChartLine} /> Taux : {response.taux}
                  </Card.Text>
                  <Button variant="primary" href={`http://localhost:5000/${response.cvUrl}`} target="_blank">
                    <FontAwesomeIcon icon={faFileAlt} /> Voir CV
                  </Button>
                  {response.taux > 60 && (
                    <Button style={{marginLeft:'20px'}} variant="success" onClick={() => sendConfirmation(response.candidat.email, response.taux)}>
                      Envoyer Email de Confirmation
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GérerDemande;
