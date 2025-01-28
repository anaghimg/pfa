import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import quiz from '../auth/img/AdobeStock_433585211.jpeg';
import defaultAvatar from '../auth/img/images (1).png'; 
import { Carousel , Form, FormControl, Button } from 'react-bootstrap';
import NavBar from '../NavBar';
import Footer from './Footer';
import '../Candidat/style.css';

const Home = () => {
  const [societes, setSocietes] = useState(null); 
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/societe', {
        params: {
          name: searchName,
          address: searchAddress
        }
      });
  
      console.log('Response:', response); 
      if (response.data.societes) {
        setSocietes(response.data.societes); 
      } else {
        console.error('Data received is undefined:', response.data.societes);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleSearch = () => {
    fetchData();
  };

  return (
    <div>
      <NavBar />
      <div className="container" >
      

    <img src={quiz} class="img-fluid quiz-image"  />
    <div class='presentation'> 
      <h2>Présentation de Notre Application</h2>
      <p>
      Bienvenue dans notre plateforme novatrice de gestion de carrière ! Avant de partager votre CV, découvrez notre approche unique pour mieux cerner vos compétences et aspirations professionnelles à travers un quiz interactif. Grâce à notre application , nous vous offrons une expérience personnalisée, vous permettant de mettre en avant vos atouts et ambitions. Préparez-vous à explorer de nouvelles opportunités et à faire briller votre potentiel professionnel comme jamais auparavant !
      </p> 
  

</div>


       
       

      </div>
      <div className="container mt-4" >

<Form inline className=" search-form">
  <div className='row'>
    <div className='col-md-4'>
      <FormControl 
        type="text" 
        placeholder="Rechercher par nom" 
        className="mr-sm-2 mb-2 mb-sm-0 search-input" 
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
    </div>
    <div className='col-md-4'>
      <FormControl 
        type="text" 
        placeholder="Rechercher par adresse" 
        className="mr-sm-2 search-input" 
        value={searchAddress}
        onChange={(e) => setSearchAddress(e.target.value)}
      />
    </div>
    <div className='col-md-4'>  
      <Button variant="outline-success" onClick={handleSearch} className="search-button">Rechercher</Button>
    </div>
  </div>
</Form>

        </div>
      <br></br>
      <div class="container mt-3">
  <h2 class="text-center my-4">Les Entreprises</h2>
  <div class="row">
    {societes && societes.map((societe, index) => (
      <div class="col-md-4" key={index}>
        <div class="card mb-4" style={{width:'300px'}}>
          {societe && societe.avatar ? (
            <img src={`http://localhost:5000/${societe.avatar}`} class="card-img-top" alt="Avatar" style={{height:'150px'}}/>
          ) : (
            <img src={defaultAvatar} class="card-img-top" alt="Avatar par défaut" style="height: 200px;width:200px;" />
          )}

          <div class="card-body">
            <h5 class="card-title">{societe.nom_societe}</h5>
            <p class="card-text">Adresse: {societe.adresse}</p>
            <p class="card-text">Poste: {societe.poste}</p>
            <Link to={`/offres?societeId=${societe._id}`} class="btn btn-primary">Voir toutes les offres</Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
<div class="container mt-3">
<Carousel className='carousel'>
    <Carousel.Item className='carousel-item '>
      <div className="d-flex flex-wrap justify-content-center">
        {societes &&
          societes.map((societe, index) => (
            <img
              key={index}
              src={`http://localhost:5000/${societe.avatar}`}
              className="d-block carousel-item img"
              alt={`Avatar ${index}`}
              style={{height:'150px'}}
           
            />
          ))}
      </div>
    </Carousel.Item>
  </Carousel>

</div>
<Footer/>
    </div>
  );
}

export default Home;
