import React from 'react';
import { Link } from 'react-router-dom';
import '../Candidat/style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Navigation</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/offres">Offres</Link></li>
              <li><Link to="/quiz">Quiz</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>Email: contact@emploi-analytique.com</li>
              <li>Téléphone: +1234567890</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Réseaux sociaux</h5>
            <ul className="list-unstyled">
              <li><a href="https://www.facebook.com/emploi-analytique">Facebook</a></li>
              <li><a href="https://twitter.com/emploi-analytique">Twitter</a></li>
              <li><a href="https://www.linkedin.com/company/emploi-analytique">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
