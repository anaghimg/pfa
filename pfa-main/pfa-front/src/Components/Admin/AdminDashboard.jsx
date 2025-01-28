import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap for styling

const AdminDashboard = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/societe');
        setCompanies(response.data.societes);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleDelete = async (companyId) => {
    try {
      await axios.delete(`http://localhost:5000/api/societe/delete/${companyId}`);
      setCompanies(companies.filter(company => company._id !== companyId));
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };
  

  const handleEdit = (companyId) => {
    // Implement edit functionality here
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nom de la société</th>
            <th>Poste</th>
            <th>Email</th>
            <th>Adresse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company._id}>
              <td>{company.nom_societe}</td>
              <td>{company.poste}</td>
              <td>{company.email}</td>
              <td>{company.adresse}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(company._id)}>Modifier</Button>
                <Button variant="danger" onClick={() => handleDelete(company._id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
