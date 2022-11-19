import React, { Component } from 'react';

// Componentes
import Sidebar from '../Sidebar';
import Item from './Item';
import Awaiting from './Awaiting';

// Importo llamada a endpoint
import {GetRequestByUser as GetRequestByUserAPI} from "../../../controller/RequestsController";
import {GetRequestFromACompany as GetRequestFromACompanyAPI} from "../../../controller/RequestsController";

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'main',
            requests: [],
            requestsFromACompany: [],
            userId: localStorage.getItem("usuarioId"),
            companyId: localStorage.getItem("companyId"),
        };
        this.handleActiveView = this.handleActiveView.bind(this);
    }

    componentDidMount() {
        if (this.state.companyId) {
            this.getRequestFromACompany();
        }
        this.getRequest();
    }

    // Busca las solicitudes que tiene un fulfillment.
    getRequestFromACompany = async () =>{

        let companyId = this.state.companyId
        
        this.setState({active_view: 'loading'});
        
        // Ejecuto el endopoint para buscar las solicitudes de la compania.
        let getRequestFromACompany = await GetRequestFromACompanyAPI(companyId);

        if( getRequestFromACompany.rdo === 200 ) {
            this.setState({
                requestsFromACompany: getRequestFromACompany.data,
                active_view: 'main'
            });
        } else if( getRequestFromACompany.rdo === 400 ) {
            this.setState({
                active_view: 'error'
            });
        } else if( getRequestFromACompany.rdo === 404 ) {
            this.setState({
                active_view: 'error'
            });
        } else {
            this.setState({active_view: 'default'});
        }
    }

    // Busca las solicitudes que tiene un usuario.
    getRequest = async () =>{

        let userId = this.state.userId
        
        this.setState({active_view: 'loading'});
        
        // Ejecuto el endopoint para buscar las solicitudes del usuario.
        let getRequestByUser = await GetRequestByUserAPI(userId);

        if(getRequestByUser.rdo === 200) {
            console.log(getRequestByUser.data)
            this.setState({
                requests: getRequestByUser.data,
                active_view: 'main'
            });
        } else if(getRequestByUser.rdo === 400) {
            this.setState({
                active_view: 'error'
            });
        } else {
            this.setState({active_view: 'default'});
        }
    }

    // Maneja las vistas a mostrar.
    handleActiveView(active_view, e) {
        e.preventDefault();
        //const { name } = e.target;
        this.setState(() => ({
            active_view: active_view
        }));
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    render() {
        const active_view = this.state.active_view
        const requests = this.state.requests
        const requestsFromACompany = this.state.requestsFromACompany
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
                                    <br/>
                                    <div className="row justify-content-center mt-5 mb-5">
                                        <div className="col mt-5 mb-5 text-center"> 
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
                                    <div className="col col-sm-12 col-md-12 col-lg-12">
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
                                <div className="row justify-content-center mb-3">
                                    <div className="col-sm-12 col-md-10 col-lg-10"> 
                                        <div className="card mt-3">
                                            <div className="card-header ">
                                                <div className='text-muted p-1 fw-bold'>
                                                    Solicitudes pendientes de aprobación
                                                </div>
                                            </div>
                                            <div className="card-body p-4">
                                                <div className="card text-center text-white bg-dark mb-2">
                                                    <div className="card-body card-request">
                                                        <div className="row">
                                                            <div className="col fs-6">
                                                                Fulfillment
                                                            </div>
                                                            <div className="col fs-6">
                                                                Estado
                                                            </div>
                                                            <div className="col fs-6">
                                                                Solicitado el
                                                            </div>
                                                            <div className="col fs-6">
                                                                Acciones
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*Mapeo todas las solicitudes que tiene el fulfillment.*/}
                                                { requestsFromACompany.length > 0 ? ( 
                                                    requestsFromACompany
                                                    .map(requestFromACompany => 
                                                            <Awaiting 
                                                                requestFromACompany = {requestFromACompany} 
                                                                key={requestFromACompany.id} 
                                                                history={this.props.history} 
                                                            />
                                                        ) 
                                                    ) : (
                                                        <div className="text-center ">
                                                            <span className="text-secondary">
                                                                No hay solicitudes para mostrar.
                                                            </span>
                                                        </div>
                                                    ) 
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center mb-5">
                                    <div className="col-sm-12 col-md-10 col-lg-10"> 
                                        <div className="card mt-3">
                                            <div className="card-header ">
                                                <div className='text-muted p-1 fw-bold'>
                                                    Solicitudes generadas por mí
                                                </div>
                                            </div>
                                            <div className="card-body p-4">
                                                <div className="card text-center text-white bg-dark mb-2">
                                                    <div className="card-body card-request">
                                                        <div className="row">
                                                            <div className="col fs-6">
                                                                Fulfillment
                                                            </div>
                                                            <div className="col fs-6">
                                                                Estado
                                                            </div>
                                                            <div className="col fs-6">
                                                                Solicitado el
                                                            </div>
                                                            {/* <div className="col fs-6">
                                                                Acciones
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*Mapeo todas las solicitudes.*/}
                                                { requests.length > 0 ? ( 
                                                    requests
                                                    .map(request => 
                                                            <Item 
                                                                request = {request} 
                                                                key={request.id} 
                                                                history={this.props.history} 
                                                            />
                                                        ) 
                                                    ) : (
                                                        <div className="text-center ">
                                                            <span className="text-secondary">
                                                                No hay solicitudes para mostrar.
                                                            </span>
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
                                                    <h3>No pudimos recuperar tus solicitudes</h3>
                                                    <small className="text-muted">Por favor intentá de nuevo en unos minutos.</small>
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

export default Request;