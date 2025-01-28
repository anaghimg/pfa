import React from 'react'
import { Navbar, Nav,NavDropdown,Image} from 'react-bootstrap';
import recrutementlogo from './auth/img/image6.png'; 
import profile from './auth/img/business-3d-businesswoman-with-coffee-prasing-a-great-job.png'; 
import './NavbarAnimation.css';
import {  useNavigate } from 'react-router-dom';
const NavBar = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    // Effacer les données d'authentification de localStorage ou du state si nécessaire
    localStorage.removeItem('token');
    localStorage.removeItem('societeId');
    navigate('/login'); 
  };
  return (
    <Navbar expand="lg" className='m-2 animated-navbar' style={{ backgroundColor: '#cedff53d' }}>
      <Navbar.Brand >
        <img
          src={recrutementlogo}
          width="35"
          height="35"
          alt="EmploiAnalytique Logo"
          style={{ marginRight: '10px' }}
        />
        <small> EmploiAnalytique</small>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Accueil</Nav.Link>
        </Nav>
        <Nav style={{ marginLeft: 'auto' }}>
          <Nav.Link href="#profile">
            <Image src={profile} roundedCircle style={{ width: '45px', height: '35px', marginRight: '20px' }} />
            Profil
          </Nav.Link>
          <NavDropdown title="Déconnexion" id="basic-nav-dropdown" style={{  marginRight: '20px' ,marginTop:'2px' }}>
            <NavDropdown.Item onClick={handleLogout}>Déconnexion</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
  
}

export default NavBar;
