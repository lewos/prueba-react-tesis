import React, { Component } from 'react';

// Componentes
import Sidebar from './Sidebar'

import ProfileImg from '../../assets/img/user.png'

// Importo llamada a endpoint
//import {UpdatePassword as UpdatePasswordAPI} from "../controller/CompanyUserController";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem("nombre"),
            lastname: localStorage.getItem("apellido"),
            rol: localStorage.getItem("rol"),
            email: localStorage.getItem("email"),

            active_view: 'profile',
            
            current_password: localStorage.getItem('pass'),
            input_current_password: '',
            new_password: '',
            confirm_password: '',

            msj_error_current_pass: '',
            msj_error_new_pass: '',
            className_current_pass: 'form-control',
            className_new_pass: 'form-control',

        };
        this.handleActiveView = this.handleActiveView.bind(this);
        };

    /*componentDidMount() {
        this.getCompany();
    }

    getCompany = async () => {
        
        this.setState({active_view: 'loading'});

        let company_id = this.state.company_id

        let getCompanyAPIFromAPI = await GetCompanyAPI(company_id);

        if(getCompanyAPIFromAPI.rdo === 0) {
            this.setState({
                empresa: getCompanyAPIFromAPI.data.data,
            })
            this.setState({active_view: 'profile'});
        } else {
            this.setState({active_view: 'error'});
        }
    }

    // Validacion de los datos ingresados por el usuario.
    handleSubmit = async (event) =>{
        event.preventDefault();

        let new_password = false
        let current_password_valid = false

        if(this.state.current_password === this.state.input_current_password) {
            this.setState({msj_error_current_pass: ''});
            this.setState({className_current_pass: "form-control is-valid"});
            current_password_valid = true
        } else {
            this.setState({msj_error_current_pass: 'La contraseña actual no es valida.'});
            this.setState({className_current_pass: "form-control is-invalid"});
            current_password_valid = false
        }

        if(this.state.new_password === this.state.confirm_password) {
            if(this.state.new_password !== this.state.current_password) {
                this.setState({msj_error_new_pass: ''});
                this.setState({className_new_pass: "form-control is-valid"});
                new_password = true
            } else {
                this.setState({msj_error_new_pass: 'La nueva contraseña debe ser distinta de la anterior.'});
                this.setState({className_new_pass: "form-control is-invalid"});
                new_password = false
            }
        } else {
            this.setState({msj_error_new_pass: 'Las contraseñas ingresadas no son iguales.'});
            this.setState({className_new_pass: "form-control is-invalid"});
            new_password = false
        }

        if(current_password_valid && new_password) {

            let company_id = this.state.company_id
            let new_password = this.state.new_password

            this.setState({active_view: 'loading'});

            let UpdatePassword = await UpdatePasswordAPI(company_id, new_password);

            if(UpdatePassword.rdo === 0 ) {
                this.setState({active_view: "success"});
            } else {
                this.setState({active_view: "error"});
            }
        }
    }

    }*/

    handleActiveView(e) {
        const { name } = e.target;
        this.setState(() => ({
            active_view: name
        }));
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    } 

    /*
    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }*/

    render() {
        const active_view = this.state.active_view
        switch(active_view) {
        case "loading": 
            return (
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-5 col-lg-2 text-secondary sidebar-background-color sidebar-design">
                                <Sidebar history={this.props.history}/>
                            </div>
                            <div className="col">
                                <div className="container-fluid">
                                    <div className="row mt-4">
                                        <div className="col col-sm-12 col-md-12 col-lg-12">
                                            <nav className="navbar navbar-light justify-content-end">
                                                <form class="d-flex">
                                                    <input 
                                                        className="form-control me-2" 
                                                        type="search" 
                                                        placeholder="Buscar" 
                                                        aria-label="Search"
                                                        value={this.state.text_search} 
                                                        onChange={(text_search) => this.setTextFilter(text_search)}/>
                                                    <button 
                                                        className="btn" type="button">
                                                        <i 
                                                            className="material-icons float-right align-middle">
                                                            search
                                                        </i>
                                                    </button>
                                                    <button 
                                                        className="btn me-4 position-relative" 
                                                        type="button">
                                                        <i 
                                                            className="material-icons align-middle">
                                                            notifications
                                                        </i>
                                                        <span class="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                                                            3
                                                            <span class="visually-hidden">unread messages</span>
                                                        </span>
                                                    </button>
                                                </form>
                                            </nav>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row justify-content-center mb-5">
                                        <div className="col-sm-12 col-md-7 col-lg-7"> 
                                            <div className="card border-light mt-5">
                                                <div className="card-body mt-5 mb-5">
                                                    <div className="container text-center">
                                                        <div className="spinner-grow" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                        <br/>
                                                        <p className="text-muted mt-3">Cargando...</p>
                                                    </div>    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )

        case "profile":
            return (
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-5 col-lg-2 text-secondary sidebar-background-color sidebar-design">
                                <Sidebar history={this.props.history}/>
                            </div>
                            <div className="col">
                                <div className="container-fluid">
                                    <div className="row mt-4">
                                        <div className="col col-sm-12 col-md-12 col-lg-12">
                                            <nav className="navbar navbar-light ">
                                                <h4 className='float-left text-muted no-margin-botton'>Configuración de cuenta</h4>
                                                <form class="d-flex">
                                                    <input 
                                                        className="form-control me-2" 
                                                        type="search" 
                                                        placeholder="Buscar" 
                                                        aria-label="Search"
                                                        value={this.state.text_search} 
                                                        onChange={(text_search) => this.setTextFilter(text_search)}/>
                                                    <button 
                                                        className="btn" type="button">
                                                        <i 
                                                            className="material-icons float-right align-middle">
                                                            search
                                                        </i>
                                                    </button>
                                                    <button 
                                                        className="btn me-4 position-relative" 
                                                        type="button">
                                                        <i 
                                                            className="material-icons align-middle">
                                                            notifications
                                                        </i>
                                                        <span class="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                                                            3
                                                            <span class="visually-hidden">unread messages</span>
                                                        </span>
                                                    </button>
                                                </form>
                                            </nav>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row justify-content-center mb-5">
                                        <div className="col-sm-12 col-md-12 col-lg-12"> 
                                            <div className="container-fluid">
                                                <div className="row justify-content-center mb-5">
                                                    <div className="col-sm-12 col-md-10 col-lg-10">
                                                        <div className="card border-light mt-3">
                                                            <div class="card-header bg-transparent border-light"><div className='text-muted p-2 fw-bold'>Tu perfil</div><hr className='hr-no-margin-top'/></div>
                                                            <div className="card-body">
                                                                <div className="container">
                                                                    <div className="row justify-content-center">
                                                                        <div className="col-sm-4 col-md-3 col-lg-3 text-center">
                                                                            <img src={ProfileImg} alt="react" className="profile-size-img mx-auto d-block rounded-circle" /> <br/>
                                                                            <button 
                                                                                type="button" 
                                                                                className="btn btn-outline-secondary me-2 padding-5px"
                                                                                disabled>
                                                                                    <i className="material-icons align-middle profile-icon-size">sync</i>
                                                                            </button>
                                                                            <button 
                                                                                type="button" 
                                                                                className="btn btn-outline-secondary padding-5px"
                                                                                disabled>
                                                                                    <i className="material-icons align-middle profile-icon-size">close</i>
                                                                            </button>
                                                                        </div>
                                                                        <div className="col-sm-8 col-md-8 col-lg-8">
                                                                            <h6 className="text-muted">Información General</h6>
                                                                            <div className="container-fluid">
                                                                                <div className="row">
                                                                                    <div className="col-sm-12 col-md-6 col-lg-6 no-padding-left">
                                                                                        <label className="form-label input-label-size text-muted">Nombre</label>
                                                                                        <input 
                                                                                            className="form-control form-control-sm" 
                                                                                            type="text" 
                                                                                            placeholder={this.state.name} 
                                                                                            aria-label=".form-control-sm example" 
                                                                                            disabled></input>
                                                                                    </div>
                                                                                    <div className="col-sm-12 col-md-6 col-lg-6 no-padding-left">
                                                                                        <label className="form-label input-label-size text-muted">Apellido</label>
                                                                                        <input 
                                                                                            className="form-control form-control-sm" 
                                                                                            type="text"
                                                                                            placeholder={this.state.lastname} 
                                                                                            aria-label=".form-control-sm example" 
                                                                                            disabled></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row mt-2">
                                                                                    <div className="col-sm-12 col-md-6 col-lg-6 no-padding-left">
                                                                                        <label className="form-label input-label-size text-muted">E-mail</label>
                                                                                        <input 
                                                                                            className="form-control form-control-sm" 
                                                                                            type="text" 
                                                                                            placeholder={this.state.email}
                                                                                            disabled 
                                                                                            aria-label=".form-control-sm example"></input>
                                                                                    </div>
                                                                                    <div className="col-sm-12 col-md-6 col-lg-6 no-padding-left col align-self-end">
                                                                                        <button 
                                                                                            type="button" 
                                                                                            className="btn btn-outline-dark btn-sm"
                                                                                            disabled>
                                                                                                Cambiar e-mail
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <br/>
                                                                            <br/>
                                                                            <h6 className="text-muted">Cambiar contraseña</h6>
                                                                            <div className="container-fluid">
                                                                                <div className="row">
                                                                                    <div className="col-sm-12 col-md-4 col-lg-4 no-padding-left">
                                                                                        <label className="form-label input-label-size text-muted">Contraseña actual</label>
                                                                                        <input 
                                                                                            className="form-control form-control-sm"
                                                                                            type="password"
                                                                                            aria-label=".form-control-sm example"
                                                                                            placeholder="•••••••••••"
                                                                                            disabled>
                                                                                        </input>
                                                                                    </div>
                                                                                    <div className="col-sm-12 col-md-4 col-lg-4 no-padding-left">
                                                                                        <label className="form-label input-label-size text-muted">Nueva contraseña</label>
                                                                                        <input 
                                                                                            className="form-control form-control-sm" 
                                                                                            type="password" placeholder="•••••••••••"
                                                                                            aria-label=".form-control-sm example"
                                                                                            disabled>
                                                                                        </input>
                                                                                    </div>
                                                                                    <div className="col-sm-12 col-md-4 col-lg-4 no-padding-left">
                                                                                        <label className="form-label input-label-size text-muted">Repita nueva contraseña</label>
                                                                                        <input 
                                                                                            className="form-control form-control-sm"
                                                                                            type="password"
                                                                                            placeholder="•••••••••••"
                                                                                            aria-label=".form-control-sm example"
                                                                                            disabled>
                                                                                        </input>
                                                                                    </div>
                                                                                </div>
                                                                                <br/>
                                                                                <div className="row">
                                                                                    <div className="col-sm-12 col-md-3 col-lg-3 no-padding-left d-grid">
                                                                                        <button 
                                                                                            type="button" 
                                                                                            className="btn btn-sm btn-dark"
                                                                                            disabled>Guardar
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                        <div className="card text-white bg-dark mt-5">
                                                            <div className="card-body text-center">
                                                                Lo cambios en el perfil de usuario deber&aacute;n ser solicitados al administrador del sistema.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        
        case "success":
            return(
                <div>

                </div>
            )
        case "error":
            return(
                <div>
                    
                </div>
            )
        default:
            return(
                <div>

                </div>
            )
        }
    }
}

export default Profile;