import React, { Component } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo_around.png';
import headerLine from '../images/line.jpg';
import * as auth from "../utils/auth.js";
//import { AppContext } from './AppContext.js';

class Register extends React.Component {
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
        if (this.state.password === this.state.confirmPassword) {
            let { email, password } = this.state;
            auth.register(email, password).then((res) => {
                if (res) {
                    this.setState({ message: "" }, () => {
                    this.props.history.push("/signin");
                });
            } else {
            this.setState({
             message: "¡Algo salió mal!",
            });
        }
      });
    }
  }
  render() {
    return (
      <>
      <div className= "register">
        <header className="register__header">
          <div className="register__header-info">
            <img src={logo} className="header__logo" alt="Around logo" />
            <Link to="login" className="header__login-link">Iniciar sesión</Link>
          </div>
          <img src={headerLine} className="header__line" alt="a line" />
        </header>
        <main className="register__main">
          <h1 className="register__title">Regístrate</h1>
          <form className="register__form" onSubmit={this.handleSubmit}>
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
             <div className="register__footer">
               <button className="register__button" onClick={this.handleSubmit} type="submit">Regístrate</button>
               <Link to="login" className="footer__login-link"> ¿Ya eres miembro? Inicia sesión aquí</Link>
             </div>
          </form>
        </main>
        </div> 
      </>
    );
  }
}
  


export default Register;
