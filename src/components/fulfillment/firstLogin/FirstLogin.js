import React, { Component } from 'react';

// Componentes
import CreateFulfillment from './CreateFulfillment'
import JoinFulfillment from './JoinFulfillment'

// Logo del proyecto
import Logo from "../../../assets/img/logo/logo11.png"

// Imagenes
import newFulfillment from '../../../assets/img/new_fulfillment.png'
import joinFulfillment from '../../../assets/img/join_fulfillment.png'

class FirstLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'main',
            name: localStorage.getItem("nombre"),
        };
        this.handleActiveView = this.handleActiveView.bind(this);
    }

    // Maneja las vistas a mostrar.
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

    // Remuevo las localStorage del usuario y redirecciono al login.
    Logout = () => {
        localStorage.removeItem("usuarioId");
        localStorage.removeItem("nombre");
        localStorage.removeItem("apellido");
        localStorage.removeItem("rol");
        localStorage.removeItem("email");
        localStorage.removeItem("tUserId");
        localStorage.removeItem("mUserId");
        localStorage.removeItem("usuarioValido");
        localStorage.removeItem("item_menu");
        this.props.history.push({
            pathname: '/login',
        })
    }

    render() {
        const active_view = this.state.active_view
        switch(active_view) {
        case "main":
            return (
                <div>
                    <div className="container fade show" data-bs-backdrop="true">
                        <div className="row mt-4">
                            <div className="col col-sm-12 col-md-12 col-lg-12">
                                <nav className="navbar navbar-light ">
                                    <img 
                                        src={Logo} 
                                        alt="Logo" 
                                        width="130" />
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-dark btn-sm fl-btn-logout float-right"
                                        onClick = { this.Logout } >
                                        <i className="material-icons align-middle ms-1 me-2">logout</i>
                                        <span className='align-middle'>Cerrar sesión</span>
                                    </button>
                                </nav>
                            </div>
                        </div>
                        <hr/>
                        <div className="row justify-content-center mt-4">
                            <h4 className='float-left text-muted no-margin-botton'>
                                Hola {this.state.name}
                            </h4>
                        </div>
                        <div className="row justify-content-center mt-5">
                            <div className="col col-sm-12 col-md-4 col-lg-4">
                                <button 
                                    type="button" 
                                    className="btn-first-login"
                                    name="new" 
                                    onClick={(e) => {
                                        this.handleActiveView('new', e);
                                    }}>
                                        <div className="card">
                                            <img src={newFulfillment} className="card-img-top fl-img-size align-self-center mt-3" alt="Nuevo Fulfillment"/>
                                            <div className="card-body">
                                                <h5 className="card-title">Crear un nuevo Fulfillment</h5>
                                                <p className="card-text">Crea un fulfillment y comenzá a visualizar el inventario y otorgar permisos a los clientes de tu empresa.</p>
                                            </div>
                                        </div>
                                </button>
                            </div>
                            <div className="col col-sm-12 col-md-4 col-lg-4">
                                <button 
                                    type="button" 
                                    className="btn-first-login"
                                    name="join" 
                                    onClick={(e) => {
                                        this.handleActiveView('join', e);
                                    }}>
                                        <div className="card">
                                            <img src={joinFulfillment} className="card-img-top fl-img-size align-self-center mt-3" alt="Nuevo Fulfillment"/>
                                            <div className="card-body">
                                                <h5 className="card-title">Unirme a un Fulfillment</h5>
                                                <p className="card-text">Solicita unirte a un fulfillment existente para comenzar a visualizar tus productos y otorgar permisos.</p>
                                            </div>
                                        </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case "new":
            return (
                <div>
                    <div className="container">
                        <div className="row mt-4">
                            <div className="col col-sm-12 col-md-12 col-lg-12">
                                <nav className="navbar navbar-light ">
                                    <img 
                                        src={Logo} 
                                        alt="Logo" 
                                        width="130" />
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-dark btn-sm fl-btn-logout float-right"
                                        onClick = { this.Logout } >
                                        <i className="material-icons align-middle ms-1 me-2">logout</i>
                                        <span className='align-middle'>Cerrar sesión</span>
                                    </button>
                                </nav>
                            </div>
                        </div>
                        <hr/>
                        <CreateFulfillment history={this.props.history}/>
                    </div>
                </div>
            )
        case "join":
            return (
                <div>
                    <div>
                        <div className="container">
                            <div className="row mt-4">
                                <div className="col col-sm-12 col-md-12 col-lg-12">
                                    <nav className="navbar navbar-light ">
                                        <img 
                                            src={Logo} 
                                            alt="Logo" 
                                            width="130" />
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-dark btn-sm fl-btn-logout float-right"
                                            onClick = { this.Logout } >
                                            <i className="material-icons align-middle ms-1 me-2">logout</i>
                                            <span className='align-middle'>Cerrar sesión</span>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                            <hr/>
                            <JoinFulfillment history={this.props.history}/>
                        </div>
                    </div>
                </div>
            )
        default:
            return(
                <div>
                    <div className="container">
                        <div className="row mt-4">
                            <div className="col">
                                <nav className="navbar navbar-light ">
                                    <img 
                                        src={Logo} 
                                        alt="Logo" 
                                        width="130" />
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-dark btn-sm fl-btn-logout float-right"
                                        onClick = { this.Logout } >
                                        <i className="material-icons align-middle ms-1 me-2">logout</i>
                                        <span className='align-middle'>Cerrar sesión</span>
                                    </button>
                                </nav>
                            </div>
                        </div> 
                        <hr/>
                        <div className="row align-items-center justify-content-center mb-5">
                            <div className="col-sm-12 col-md-7 col-lg-7 align-self-center"> 
                                <div className="card mt-5">
                                    <div className="card-body text-center mt-5 mb-5">
                                        <i className="material-icons error-icon mb-4">priority_high</i>
                                        <h3>Algo salió mal</h3>
                                        <small className="text-muted">Por favor salga y vuelva a intentarlo.</small>
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

export default FirstLogin;