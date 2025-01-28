import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import recrutementImage from '../auth/img/network-reviewing-online-resume-of-job-applicant.gif'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Candidat/style.css';

const Register = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [role, setRole] = useState('');
    const [nom_societe, setNomSociete] = useState('');
    const [poste, setPoste] = useState('');
    const [adresse, setAdresse] = useState('');
    const [avatar, setAvatar] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
    
        if (role === 'Societe') {
            formData.append('nom_societe', nom_societe);
            formData.append('poste', poste);
            formData.append('adresse', adresse);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('avatar', avatar);
            
            axios.post('http://localhost:5000/api/registerSociete', formData)
                .then(response => {
                    console.log(response);
                    navigate("/login");
                })
                .catch(err => console.log(err));
        } else {
            formData.append('nom', nom);
            formData.append('prenom', prenom);
            formData.append('email', email);
            formData.append('password', password);
            
            console.log('nom',nom)
            console.log('prenom',prenom)
            console.log('email',email)
            console.log('password',password)
            console.log('role',role)
       
            axios.post('http://localhost:5000/api/register', formData ,{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
               
              })
                .then(response => {
                    console.log(response);
                    navigate("/login");
                   
                })
                .catch(err => console.log(err));
        }
    };
    
    

    return (
        <div>
            <header className=" text-white py-3">
                <div className="container text-center">
                    <h1 className="mb-0">Inscription</h1>
                </div>
            </header>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        {/* Utilisation de l'image importée */}
                        <img src={recrutementImage} alt="Recrutement" className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                        <main className="container py-4">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                {/* Type d'utilisateur */}
                                <div className="form-group">
                                    <label>Type d'utilisateur:</label>
                                    <select
                                        className="form-control"
                                        name="role"
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="">Sélectionner le type d'utilisateur</option>
                                        <option value="Candidat">Candidat</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Societe">Societe</option>
                                    </select>
                                </div>
                                {/* Champs communs */}
                                {role !== 'Societe' && (
                                    <>
                                        <div className="form-group">
  <label>Nom:</label>
  <input
    type="text"
    className="form-control"
    name="nom"
    onChange={(e) => setNom(e.target.value)}
    
  />
</div>

<div className="form-group">
  <label>Prénom:</label>
  <input
    type="text"
    className="form-control"
    name="prenom"
    onChange={(e) => setPrenom(e.target.value)}
    
  />
</div>


                                    </>
                                    
                                )}
                               <div className="form-group">
  <label>Email:</label>
  <input
    type="email"
    className="form-control"
    name="email"
    onChange={(e) => setEmail(e.target.value)}
 required
  />
</div>

<div className="form-group">
  <label>Mot de passe:</label>
  <input
    type="password"
    className="form-control"
    name="password"
    onChange={(e) => setPass(e.target.value)}
  required
  />
</div>
                                {/* Champs spécifiques pour la société */}
                                {role === 'Societe' && (
                                    <>
                                

                                        <div className="form-group">
                                            <label>Nom de la société:</label>
                                            <input
    type="text"
    className="form-control"
    name="nom_societe"  
    onChange={(e) => setNomSociete(e.target.value)}
    required
/>
                                        </div>
                                        <div className="form-group">
                                            <label>Poste:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="poste"
                                                onChange={(e) => setPoste(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Adresse:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="adresse"
                                                onChange={(e) => setAdresse(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
    <label>Choisir un avatar:</label>
    <input type="file" className="form-control-file" name="avatar" onChange={(e) => setAvatar(e.target.files[0])} />
</div>
                                    </>
                                )}
                                <button type="submit" className="btn btn-primary">S'inscrire</button>
                                <Link to="/login
                                " className="btn btn-secondary" style={{marginLeft:'10px'}}>Se connecter</Link>
                                </form>
                            </main>
                        </div>
                    </div>
                </div>
                <footer className=" text-white py-3">
                    <div className="container text-center">
                        <p className="mb-0">© 2024 Plateforme de Recrutement</p>
                    </div>
                </footer>
            </div>
        );
    }
    
    export default Register;
    