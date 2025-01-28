import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SocieteForm = () => {
  const [nomSociete, setNomSociete] = useState('');
  const [poste, setPoste] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [societes, setSocietes] = useState([]);

  useEffect(() => {
    fetchSocietes();
  }, []);

  const fetchSocietes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/societes');
      setSocietes(response.data.societes);
    } catch (error) {
      console.error('Error fetching societes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/societes', {
        nom_societe: nomSociete,
        poste: poste,
        email: email,
        password: password
      });
      setNomSociete('');
      setPoste('');
      setEmail('');
      setPassword('');
      fetchSocietes(); // Fetch societes after creating a new one
    } catch (error) {
      console.error('Error creating societe:', error);
    }
  };

  return (
    <div>
      <h2>Create Societe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom Societe:</label>
          <input type="text" value={nomSociete} onChange={(e) => setNomSociete(e.target.value)} />
        </div>
        <div>
          <label>Poste:</label>
          <input type="text" value={poste} onChange={(e) => setPoste(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Create Societe</button>
      </form>
      <h2>Societes</h2>
      <ul>
        {societes.map((societe) => (
          <li key={societe._id}>
            Nom Societe: {societe.nom_societe}, Poste: {societe.poste}, Email: {societe.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocieteForm;
