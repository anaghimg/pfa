import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faChartSimple } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0  position-relative" style={{ backgroundColor: '#cedff53d' }}>
    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
      <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none">
        <span className="fs-5 d-none d-sm-inline" style={{color:'black'}}>Dashboard Societe</span>
      </a>
      <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu" role="navigation">
        <li className="nav-item">
          <Link to="/" className="nav-link px-0">
            <FontAwesomeIcon icon={faChartSimple} style={{ marginRight: '5px',color:'black' }}  />
            <span className="d-none d-sm-inline m-2 px-0" style={{color:'black'}}>Statistiques</span>
          </Link>
        </li>
        <li className="nav-item">
          <FontAwesomeIcon icon={faAddressBook} style={{color:'black'}} />
          <Link to="/offre" className="nav-link d-none d-sm-inline px-1" style={{color:'black'}}> Offres </Link>
 
        </li>
   
      </ul>
      <hr />
    </div>
  </div>
  )
}

export default SideBar
