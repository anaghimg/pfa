import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Components/auth/Login';
import Home from './Components/Candidat/Home';
import Register from './Components/auth/Register';
import Dashboard from './Components/Societe/Dashboard';
import AddOfferPage from './Components/Societe/AddOfferPage';
import ListeOffres from './Components/Candidat/ListeOffres';
import Offres from './Components/Societe/Offres';
import Edit from './Components/Societe/Edit';
import GérerDemande from './Components/Societe/GérerDemande';
import AdminDashboard from './Components/Admin/AdminDashboard';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [societeId, setSocieteId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const roleResponse = await axios.get('http://localhost:5000/api/user-role', {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          const role = roleResponse.data.role;
          setToken(storedToken);
          setAuthenticated(true);
          setRole(role);
          if (role === 'Societe') {
            const societeId = localStorage.getItem('societeId');
            setSocieteId(societeId);
          }
        } catch (error) {
          console.error(error);
          setAuthenticated(false);
        }
      }
    };
    checkAuthentication();
  }, []);

  const onLogin = (token, societeId) => {
    console.log("Logged-in token: " + token);
    console.log("Logged-in societyId: " + societeId);
    setToken(token);
    setSocieteId(societeId);
    setAuthenticated(true);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/" element={authenticated ? (role === 'Admin' ? <Navigate to="/dashboardAdmin" /> : <Home societeId={societeId} />) : <Navigate to="/login" />} />
          <Route path="/offres" element={authenticated ? <ListeOffres societeId={societeId} /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={authenticated ? <Dashboard societeId={societeId} /> : <Navigate to="/login" />} />
          <Route path="/dashboardAdmin" element={authenticated && role === 'Admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/offre" element={<Offres />} />
          <Route path="/Gere" element={<GérerDemande />} />
          <Route path="/editOffre" element={<Edit />} />
          <Route path="/addOffre" element={authenticated ? <AddOfferPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
