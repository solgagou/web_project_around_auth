import React from "react";
import { Link } from 'react-router-dom';
import logo from '../images/logo_around.png';
import headerLine from '../images/line.jpg';
import * as auth from "../utils/auth.js";
//import { AppContext } from './AppContext.js';


class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
      const { name, value } = e.target;
      this.setState({
        [name]: value,
      });
    }
    handleSubmit(e) {
      e.preventDefault();
      if (!this.state.email || !this.state.password) {
        return;
      }

      
    auth.login(this.state.email, this.state.password)
    .then((data) => {
      if (data.jwt) {
        this.setState({
          email: '',
          password: ''
        }, () => {
          this.props.handleLogin();
          this.props.navigate('/users/me');
        })
      }
    })
    .catch(err => console.log(
    err));
    }

   render() {
      return (
        <>
        <div className= "login">
          <header className="login__header">
            <div className="login__header-info">
              <img src={logo} className="header__logo" alt="Around logo" />
              <button 
              className="header__register-link" 
              onClick={() => this.props.navigate('/signup')}
            >Regístrate</button>
            </div>
            <img src={headerLine} className="header__line" alt="a line" />
          </header>
          <main className="login__main">
            <h1 className="login__title">Inicia sesión</h1>
            <form className="login__form" onSubmit={this.handleSubmit}>
              <input
                className="form form__input"
                type="email"
                id="input-email"
                required
                placeholder="Correo electrónico"
                minLength="5"
                maxLength="50"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
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
                 value={this.state.password}
                 onChange={this.handleChange}
              />
               <span className="form__input-error input-job-error"></span>
               <div className="login__footer">
                 <button className="login__button" onClick={this.handleSubmit} type="submit">Inicia sesión</button>
                 <button className="footer__register-link" onClick={() => this.props.navigate('/signup')}> ¿Aún no eres miembro? Regístrate aquí</button>
               </div>
            </form>
          </main>
          </div> 
        </>
      );
    }
  }
  
  export default Login;