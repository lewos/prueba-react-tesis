import React, { Component } from 'react';

// Logo del proyecto
import Logo from "../../assets/img/logo/logo5.png"

// Importo llamada a endpoint
import {Signup as SignupAPI} from "../../controller/LoginController";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            user_lastname: '',
            user_email: '',
            user_password: '',
            user_confirm_password: '',
            user_rol: '',
            msj_error_email: '',
            msj_error_pass: '',
            className_email: 'form-control',
            className_pass: 'form-control',
            userCreated: '',
            active_view: 'main',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleActiveView = this.handleActiveView.bind(this);
    }
    // Validacion de los datos ingresados por el usuario.
    handleSubmit = async (event) =>{
        event.preventDefault();
        let mail_valido = false
        let passwords_validas = false

        if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test((this.state.user_email))) {
            this.setState({msj_error_email: ''});
            this.setState({className_email: "form-control is-valid"});
            mail_valido = true
        } else {
            this.setState({msj_error_email: 'Ingrese un e-mail válido.'});
            this.setState({className_email: "form-control is-invalid"});
            mail_valido = false
        }

        if(this.state.user_password === this.state.user_confirm_password) {
            this.setState({msj_error_pass: ''});
            this.setState({className_pass: "form-control is-valid"});
            passwords_validas = true
        } else {
            this.setState({msj_error_pass: 'Las contraseñas ingresadas no son iguales.'});
            this.setState({className_pass: "form-control is-invalid"});
            passwords_validas = false
        }

        if(mail_valido && passwords_validas) {
            // Ejecuto el endopoint para crear el usuario
            let name = this.state.user_name
            let lastName = this.state.user_lastname
            let pass = this.state.user_password
            let email = this.state.user_email
            let rol = this.state.user_rol
            this.setState({active_view: 'loading'});
            let postSignup = await SignupAPI(name, lastName, pass, email, rol);

            if(postSignup.rdo === 201 ) {
                this.setState({active_view: 'success'});
            } else {
                this.setState({active_view: 'error'});
            }
        }
    }
    
    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    handleActiveView(active_view, e) {
        e.preventDefault();
        //const { name } = e.target;
        console.log({ active_view });
        this.setState(() => ({
            active_view: active_view
        }));
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    }

    login = () => {
        this.props.history.push('/login');
    }

    render() {
        const active_view = this.state.active_view
        switch(active_view) {
        case "loading": 
            return (
                <div className="fondo-login">
                    <div className="container">
                        <div className="row justify-content-center vh-100">
                            <div className="col-sm-12 col-md-9 col-lg-9 align-self-center">
                                <div className="card">
                                    <div className="card-body text-center mt-5 mb-5">
                                        <div className="spinner-grow mt-5 mb-4" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <br/>
                                        <p className="text-muted">Cargando...</p>
                                    </div>
                                    <div className="card-footer text-center">
                                        <a 
                                            type="button" 
                                            href='#'
                                            onClick={this.login} >
                                            <small>Iniciar sesi&oacute;n</small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )

        case "main":
            return (
                <div className="fondo-login">
                    <div className="container">
                        <div className="row align-items-center justify-content-center vh-100">
                            <div className="col-sm-12 col-md-9 col-lg-9 align-self-center">
                                
                                <div className="card shadow-lg">
                                    <div className="card-body">
                                        <div className="row p-3">
                                            <div className="col">
                                                <h4 className="text-center p-2">Crea una cuenta en Otto</h4>
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="row justify-content-center p-3">
                                                        <div className="col-md-12 mb-12">
                                                            <div className="input-group mb-3">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    autoComplete="off" 
                                                                    autoFocus={true} 
                                                                    placeholder="Nombre" 
                                                                    required
                                                                    name="user_name"
                                                                    value={this.state.user_name}
                                                                    onChange={this.myChangeHandler} />
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    autoComplete="off"  
                                                                    placeholder="Apellido" 
                                                                    required
                                                                    name="user_lastname"
                                                                    value={this.state.user_lastname}
                                                                    onChange={this.myChangeHandler} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 mb-12">
                                                            <div className="input-group has-validation mb-3">
                                                                <input 
                                                                    type="text" 
                                                                    className={this.state.className_email}
                                                                    autoComplete="off"  
                                                                    placeholder="Correo electr&oacute;nico" 
                                                                    required 
                                                                    name="user_email"
                                                                    value={this.state.user_email}
                                                                    onChange={this.myChangeHandler} />
                                                                    { this.state.msj_error_email !== '' ? ( <small className="invalid-feedback">{this.state.msj_error_email}</small> ) : null }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 mb-12">
                                                            <div className="input-group has-validation mb-3">
                                                                <input  
                                                                    type="password" 
                                                                    className={this.state.className_pass}
                                                                    autoComplete="off" 
                                                                    placeholder="Contrase&ntilde;a" 
                                                                    required 
                                                                    name="user_password"
                                                                    value={this.state.user_password}
                                                                    onChange={this.myChangeHandler} />
                                                                <small className="form-text text-muted">Utiliza ocho caracteres como m&iacute;nimo con una combinaci&oacute;n de letras, n&uacute;meros y s&iacute;mbolos</small>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 mb-12">
                                                            <div className="input-group has-validation mb-3">
                                                                <input 
                                                                    type="password" 
                                                                    className={this.state.className_pass}
                                                                    autoComplete="off" 
                                                                    placeholder="Confirma tu contrase&ntilde;a" 
                                                                    required
                                                                    name="user_confirm_password"
                                                                    value={this.state.user_confirm_password}
                                                                    onChange={this.myChangeHandler} />
                                                                    { this.state.msj_error_pass !== '' ? ( <small className="invalid-feedback">{this.state.msj_error_pass}</small> ) : null }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 mb-12">
                                                            <div className="input-group">
                                                                <select 
                                                                    className="form-control text-muted"
                                                                    name="user_rol"
                                                                    required
                                                                    value={this.state.user_rol}
                                                                    onChange={this.myChangeHandler} >
                                                                <option defaultValue disabled value="">Seleccion&aacute; tu perfil ...</option>
                                                                <option value="Administrador">Propietario o administrador de un fulfillment</option>
                                                                <option value="Cliente">Cliente de un fulfillment</option>
                                                            </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row p-3 justify-content-center">
                                                        <div className="col-md-12 mb-12 d-grid gap-2">
                                                            <button 
                                                            type="submit" 
                                                            id="submit-btn" 
                                                            className="btn btn-dark">
                                                                Crear cuenta
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="col align-self-center">
                                                <img 
                                                    src={Logo}
                                                    className="img-fluid rounded mx-auto d-block" 
                                                    alt="Otto"
                                                    width="40%" />
                                                <p className="font-weight-light card-subtitle mt-2 mb-2 text-center p-3">Todas las herramientas para administrar fulfillments en un solo lugar.</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="card-footer text-muted text-center">
                                        <button 
                                            type="button" 
                                            className="btn btn-link pad-left"
                                            style={{fontSize: "14px", paddingBottom: "8px"}}
                                            onClick={this.login} >
                                            Prefiero iniciar sesi&oacute;n
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )

        case "success": 
            return (
                <div className="fondo-login">
                    <div className="container">
                        <div className="row justify-content-center vh-100">
                            <div className="col-sm-12 col-md-9 col-lg-9 align-self-center">
                                <div className="card">
                                    <div className="card-body text-center mt-5 mb-5">
                                        <i className="material-icons error-icon mb-4">done</i>
                                        <h3>Usuario creado</h3>
                                        <small className="text-muted">Ya puedes iniciar sesi&oacute;n.</small>
                                    </div>
                                    <div className="card-footer text-center">
                                        <a 
                                            type="button" 
                                            href='#'
                                            onClick={this.login} >
                                            <small>Iniciar sesi&oacute;n</small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case "error": 
            return (
                <div className="fondo-login">
                    <div className="container">
                        <div className="row justify-content-center vh-100">
                            <div className="col-sm-12 col-md-9 col-lg-9 align-self-center">
                                <div className="card">
                                    <div className="card-body text-center mt-5 mb-5">
                                        <i className="material-icons error-icon mb-4">priority_high</i>
                                        <h3>No pudimos crear tu usuario</h3>
                                        <small className="text-muted">Volvé a intentarlo en unos minutos.</small>
                                    </div>
                                    <div className="card-footer text-center">
                                        <a 
                                            type="button" 
                                            href='#'
                                            onClick={this.login} >
                                            <small>Iniciar sesi&oacute;n</small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        default:
            return(
                <div className="fondo-login">
                    <div className="container">
                        <div className="row justify-content-center vh-100">
                            <div className="col-sm-12 col-md-9 col-lg-9 align-self-center">
                                <div className="card">
                                    <div className="card-body text-center mt-5 mb-5">
                                        <i className="material-icons error-icon mb-4">priority_high</i>
                                        <h3>Algo salió mal</h3>
                                        <small className="text-muted">Por favor salga y vuelva a intentarlo.</small>
                                    </div>
                                    <div className="card-footer text-center">
                                        <a 
                                            type="button" 
                                            href='#'
                                            onClick={this.login} >
                                            <small>Iniciar sesi&oacute;n</small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default SignUp;