import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import { useLocation } from 'react-router-dom';
import '../Candidat/style.css';
import { Link } from 'react-router-dom'; 

import Footer from './Footer';

const ListeOffres = () => {
  const [offres, setOffres] = useState([]);
  const [filteredOffres, setFilteredOffres] = useState([]);
  const [societe, setSociete] = useState(null); 
  const [token, setToken] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);

          const urlSearchParams = new URLSearchParams(location.search);
          const urlSocieteId = urlSearchParams.get('societeId');
          if (urlSocieteId) {
            const response = await axios.get(`http://localhost:5000/api/societe?id=${urlSocieteId}`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            });
            setSociete(response.data.societes.find(societe => societe._id === urlSocieteId));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location.search]);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        if (token && societe) {
          const response = await axios.get(`http://localhost:5000/api/offre?societe=${societe._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const offres = response.data.offres;
          setOffres(offres);
          setFilteredOffres(offres); // Initialize filteredOffres with all offers initially
        }
      } catch (error) {
        console.error('Error fetching offres:', error);
      }
    };
  
    fetchOffres();
  }, [token, societe]);

  const handleSearchChange = event => {
    const input = event.target.value;
    setSearchInput(input);
    if (input === '') {
      setFilteredOffres(offres); // Reset filteredOffres to display all offers
    }
  };

  const handleSearchButton = () => {
    const filtered = offres.filter(offre =>
      offre.titre.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredOffres(filtered);
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        {societe && <h2 className="mb-4">Liste des Offres par {societe.nom_societe}</h2>}
        <div className="row">
          <div className="col-md-12 mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher par titre..."
                style={{ marginRight: '20px'}} 
                value={searchInput}
                onChange={handleSearchChange}
              />
              <div className="input-group-append">
                <button className="btn btn-primary " type="button" onClick={handleSearchButton}>
                  Rechercher
                </button>
              </div>
            </div>
          </div>
          {filteredOffres.map((offre, index) => (
            <div key={index} className="col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h3 className="card-title">{offre.titre}</h3>
                      <p className="card-text">{offre.description}</p>
                    </div>
                    <div className="col-md-4 d-flex flex-column justify-content-between align-items-end">
                      <p className="card-text mb-0">{new Date(offre.dateExp).toLocaleDateString()}</p>
                    <Link to={`/candidatQuiz/${offre._id}`} className="btn btn-primary mt-2">Postuler</Link>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ListeOffres;
