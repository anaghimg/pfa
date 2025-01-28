import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import SideBar from '../SideBar';

const OfferForm = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    societe: '',
    dateExp: ''
  });

  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formDataToSend = {
      titre: formData.titre,
      description: formData.description,
      societe: formData.societe,
      dateExp: formData.dateExp
    };
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/offre', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Success:', response);
      // Redirection vers /offre après ajout avec succès
      navigate('/offre'); // Utilisez navigate pour la redirection
    } catch (error) {
      console.error('Error adding offer:', error);
    }
  };

  return (
    <div>
     
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titre" className="form-label">Title</label>
          <input type="text" className="form-control" id="titre" name="titre" value={formData.titre} onChange={handleChange} placeholder="Enter title" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Enter description"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="dateExp" className="form-label">Expiration Date</label>
          <input type="date" className="form-control" id="dateExp" name="dateExp" value={formData.dateExp} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add Offer</button>
      </form>
    </div>
  );
};

export default OfferForm;
