import React from 'react';
import OfferForm from './OfferForm';
import NavBar from '../NavBar';
import SideBar from '../SideBar'; // Importez le composant SideBar

const AddOfferPage = () => {
  return (
    <div>
      <NavBar />
      <div className="container-fluid">
  
        <div className="row">
            <SideBar /> 
          <div className="col-md-6">
            <OfferForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOfferPage;
