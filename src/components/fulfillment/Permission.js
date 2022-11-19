import React, { Component } from 'react';

// Componentes
import Sidebar from './Sidebar';

// Imagenes
import mercadolibre2 from '../../assets/img/mercadolibre2.png'
import tiendanube2 from '../../assets/img/tiendanube2.png'

// Importo llamada a endpoint
import {GetUserByCompanieIdAndRol as GetUserByCompanieIdAndRolAPI} from "../../controller/UserController";

class Permission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'main',
            clients: [],
            companyId: localStorage.getItem("companyId"),
        };
        this.handleActiveView = this.handleActiveView.bind(this);
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

    // Ejecuta la función cuando el componente se termina de cargar.
    componentDidMount() {
        this.getClients();
    }

    // Busca el inventario que tiene un fulfillment.
    getClients = async () =>{

        let companyId = this.state.companyId
        let rol = 'Cliente'
        
        this.setState({active_view: 'loading'});
        
        // Ejecuto el endopoint para buscar las solicitudes del usuario.
        let getUserByCompanieIdAndRol = await GetUserByCompanieIdAndRolAPI(companyId, rol);

        if(getUserByCompanieIdAndRol.rdo === 200 ) {
            this.setState({
                clients: getUserByCompanieIdAndRol.data,
                active_view: 'main'
            });
        } else if(getUserByCompanieIdAndRol.rdo === 400 ) {
            this.setState({
                active_view: 'error'
            });
        } else {
            this.setState({active_view: 'default'});
        }
    }

    Permission = () => {
        window.location.reload();
    }

    render() {
        const active_view = this.state.active_view
        let clients = this.state.clients
        console.log(clients)
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
                                            <nav className="navbar navbar-light">
                                                <h4 className='float-left text-muted no-margin-botton'>Permisos</h4>
                                                <form className="d-flex">
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
                                                        <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                                                            3
                                                            <span className="visually-hidden">unread messages</span>
                                                        </span>
                                                    </button>
                                                </form>
                                            </nav>
                                        </div>
                                    </div>
                                    <hr/>
                                    <br/>
                                    <div className="row justify-content-center mt-5 mb-5">
                                        <div className="col-sm-12 col-md-7 col-lg-7 mt-5 mb-5 text-center"> 
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
            )

        case "main":
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
                                        <div className="col">
                                            <nav className="navbar navbar-light">
                                                <h4 className='float-left text-muted no-margin-botton'>Permisos</h4>
                                                <form className="d-flex"> 
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
                                                        <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                                                            3
                                                            <span className="visually-hidden">unread messages</span>
                                                        </span>
                                                    </button>
                                                </form>
                                            </nav>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row justify-content-center mb-5">
                                        <div className="col-sm-12 col-md-10 col-lg-10"> 
                                            <div className="card mt-3">
                                                <div className="card-header">
                                                    <div className='text-muted p-1 fw-bold'>
                                                        Cuentas vinculadas
                                                    </div>
                                                </div>
                                                <div className="card-body p-4">
                                                    
                                                    { clients.length > 0 ? 
                                                        ( 
                                                            /* Mapeo todos los clientes existentes en el .json */
                                                            clients
                                                                .map( 
                                                                    client =>
                                                                    client.mUserId ? (
                                                                        <div className="card text-center text-center mt-2 mb-2">
                                                                            <ul className="list-group list-group-flush">
                                                                                <li className="list-group-item d-flex">
                                                                                    <div className="col">
                                                                                        <img 
                                                                                            src={mercadolibre2} 
                                                                                            className="card-img-top miniatura-img-size" alt="MercadoLibre" />
                                                                                    </div>
                                                                                    <div className="col fs-6 text-muted">
                                                                                        { client.name } { client.lastName }
                                                                                    </div>
                                                                                    <div className="col fs-6 text-muted">
                                                                                        { client.mail }
                                                                                    </div>
                                                                                    <div className="col fs-6 text-muted">
                                                                                        <span 
                                                                                            className="badge bg-success">
                                                                                                Permisos otorgados
                                                                                        </span>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    ) : null
                                                                )

                                                        ) : (
                                                            <div className="card text-center mb-3">
                                                                <div className="text-center mt-2 mb-2">
                                                                    <div className="text-secondary">
                                                                        No hay permisos otorgados de 
                                                                        <img 
                                                                        src={mercadolibre2} 
                                                                        className="ms-2 card-img-top miniatura-img-size" alt="MercadoLibre" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) 
                                                    }
                                                    { clients.length > 0 ? 
                                                        (
                                                            /* Mapeo todos los clientes existentes en el .json */
                                                            clients
                                                                .map( 
                                                                    client =>
                                                                    client.tUserId ? (
                                                                        <div className="card text-center text-center mt-2 mb-2">
                                                                            <ul className="list-group list-group-flush">
                                                                                <li className="list-group-item d-flex">
                                                                                    <div className="col">
                                                                                        <img 
                                                                                            src={tiendanube2} 
                                                                                            className="card-img-top miniatura-img-size"
                                                                                            alt="TiendaNube"/>
                                                                                    </div>
                                                                                    <div className="col fs-6 text-muted">
                                                                                        { client.name } { client.lastName }
                                                                                    </div>
                                                                                    <div className="col fs-6 text-muted">
                                                                                        { client.mail }
                                                                                    </div>
                                                                                    <div className="col fs-6 text-muted">
                                                                                        <span 
                                                                                            className="badge bg-success">
                                                                                                Permisos otorgados
                                                                                        </span>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    ) : null
                                                                )

                                                            ) : (
                                                                <div className="card text-center">
                                                                    <div className="text-center mt-2 mb-2">
                                                                        <div className="text-secondary">
                                                                            No hay permisos otorgados de 
                                                                            <img 
                                                                            src={tiendanube2} 
                                                                            className="ms-2 card-img-top miniatura-img-size"
                                                                            alt="TiendaNube"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) 
                                                        }
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
        case "error":
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
                                        <div className="col">
                                            <nav className="navbar navbar-light">
                                                <h4 className='float-left text-muted no-margin-botton'>Permisos</h4>
                                                <form className="d-flex"> 
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
                                                        <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                                                            3
                                                            <span className="visually-hidden">unread messages</span>
                                                        </span>
                                                    </button>
                                                </form>
                                            </nav>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row align-items-center justify-content-center mb-5">
                                        <div className="col-sm-12 col-md-10 col-lg-10 align-self-center"> 
                                            <div className="card mt-5">
                                                <div className="card-body text-center mt-4 mb-4">
                                                    <i className="material-icons error-icon mb-4">error_outline</i>
                                                    <h2>No pudimos recuperar tus solicitudes</h2>
                                                    <small className="text-muted">Volvé a intentarlo en unos minutos.</small>
                                                    <br/>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-outline-dark btn-sm mt-4"
                                                        onClick={this.Permission}>
                                                            Recargar página
                                                    </button>
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
        default:
            return(
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-5 col-lg-2 text-secondary sidebar-background-color sidebar-design">
                                <Sidebar history={this.props.history}/>
                            </div>
                            <div className="col">
                                <div className="container-fluid">
                                    <div className="row mt-4">
                                        <div className="col">
                                            <nav className="navbar navbar-light">
                                                <h4 className='float-left text-muted no-margin-botton'>Solicitudes</h4>
                                                <form className="d-flex"> 
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
                                                        <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                                                            3
                                                            <span className="visually-hidden">unread messages</span>
                                                        </span>
                                                    </button>
                                                </form>
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
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Permission;