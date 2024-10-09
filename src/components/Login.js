import React, { useState } from "react";
import {  useNavigate } from 'react-router-dom';
import logo from '../images/logo_around.png';
import headerLine from '../images/line.jpg';
import * as auth from "../utils/auth.js";

const Login = ({ handleLoginClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
      
    auth.login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token); 

          setEmail('');
          setPassword('');

          handleLoginClick(); 
        } else {
          console.error('No se recibió el token en la respuesta');
        }
      })
      .catch(err => console.error('Error al iniciar sesión:', err));
  };

   return (
        <>
        <div className= "login">
          <header className="login__header">
            <div className="login__header-info">
              <img src={logo} className="header__logo" alt="Around logo" />
              <button 
              className="header__register-link" 
              onClick={() => navigate('/signup')}
            >Regístrate</button>
            </div>
            <img src={headerLine} className="header__line" alt="a line" />
          </header>
          <main className="login__main">
            <h1 className="login__title">Inicia sesión</h1>
            <form className="login__form" onSubmit={handleSubmit}>
              <input
                className="form form__input"
                type="email"
                id="input-email"
                required
                placeholder="Correo electrónico"
                minLength="5"
                maxLength="50"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <span className="form__input-error input-name-error"></span>
              <input
                className="form form__input"
                 type="password"
                 id="input-password"
                 required
                 placeholder="Contraseña"
                 minLength="20"
                 maxLength="64"
                 name="password"
                 value={password}
                 onChange={handleChange}
              />
               <span className="form__input-error input-job-error"></span>
               <div className="login__footer">
                 <button className="login__button" onClick={handleSubmit} type="submit">Inicia sesión</button>
                 <button className="footer__register-link" onClick={() => navigate('/signup')}> ¿Aún no eres miembro? Regístrate aquí</button>
               </div>
            </form>
          </main>
          </div> 
        </>
      );
    }
  
  
  export default Login;