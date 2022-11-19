import React, { Component } from 'react';

// Componentes
import Sidebar from '../Sidebar';
import Operator from './Operator';

// Importo llamada a endpoint
import {GetOperators as GetOperatorsAPI} from "../../../controller/OperatorController";

// Importo llamada a endpoint
import {GetCompaniesById as GetCompaniesByIdAPI} from "../../../controller/CompanieController";

class Warehouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'main',
            companie: [],
            operarios: []
        };
        this.handleActiveView = this.handleActiveView.bind(this);
    }

    componentDidMount() {
        this.getOperatorsAndCompanie();
    }

    getOperatorsAndCompanie = async () => {
        
        this.setState({active_view: 'loading'});

        let companyId = localStorage.getItem("companyId");
        // Ejecuto el endopoint para traer todos los operarios
        let getOperatorsAPI = await GetOperatorsAPI(companyId);

        // Ejecuto el endopoint para traer el nombre de fulffilment
        let getCompaniesById = await GetCompaniesByIdAPI(companyId);

        if(getOperatorsAPI.rdo === 0 && getCompaniesById.rdo === 200) {
            this.setState({
                operarios: getOperatorsAPI.data,
                companie: getCompaniesById.data,
            })
            this.setState({active_view: 'main'});
        } else {
            //this.setState({active_view: 'error'});
        }
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

    NewEntry = () => {
        this.props.history.push({
            pathname: '/admin_fulfillment/nuevo_operario',
        })
    }

    render() {
        const active_view = this.state.active_view
        const companie = this.state.companie
        //const operarios = this.state.operarios
        //console.log(operarios)
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
                                                <h4 className='float-left text-muted no-margin-botton'>Depósito</h4>
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
                                        <div className="col col-sm-12 col-md-12 col-lg-12">
                                            <nav className="navbar navbar-light">
                                                <h4 className='float-left text-muted no-margin-botton'>Depósito</h4>
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
                                    <div className="row justify-content-center">
                                        <div className="col-sm-12 col-md-12 col-lg-12"> 
                                            <div className="card border-light mt-2">
                                                <div className="card-header bg-transparent border-light">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-sm-12 col-md-6 col-lg-6 align-self-center">
                                                                <div className='text-muted fw-bold'>
                                                                    Fulfillment {companie.name}
                                                                </div>
                                                            </div>
                                                            <div className="col align-self-center">

                                                            </div>
                                                            <div className="col-sm-12 col-md-4 col-lg-4">
                                                                <button 
                                                                    type="button" 
                                                                    className="btn btn-outline-dark btn-sm float-end"
                                                                    onClick={this.NewEntry}>
                                                                        Cargar nuevo operario
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className='hr-no-margin-bottom'/>
                                                </div>
                                                <div className="card-body">
                                                    <div className="container">
                                                        <div className="row justify-content-center">
                                                            <div className="col-sm-12 col-md-12 col-lg-12 text-center align-self-center">
                                                                <div className="card text-white bg-dark mb-2 ">
                                                                    <div className="card-body card-request">
                                                                        <div className="row">
                                                                            <div className="col fs-6">
                                                                                Nombre y Apellido
                                                                            </div>
                                                                            <div className="col fs-6">
                                                                                E-mail
                                                                            </div>
                                                                            <div className="col fs-6">
                                                                                Rol
                                                                            </div>
                                                                            <div className="col fs-6">
                                                                                Acciones
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                { this.state.operarios.length > 0 ? ( 

                                                                    /*Mapeo todos los operarios existentes en el .json */

                                                                    this.state.operarios
                                                                        .map( operario => 
                                                                            <Operator 
                                                                                operario = {operario} 
                                                                                key={operario.id} 
                                                                                history={this.props.history}
                                                                            />
                                                                        )

                                                                    ) : (

                                                                        <div className="text-center mt-5 mb-5">
                                                                            <i className="material-icons  global-size-icon text-secondary">view_list</i>
                                                                            <br/>
                                                                            <span className="text-secondary">No hay ningún operario creado</span> <br/>
                                                                            <span className="small text-secondary">Podes dar de alta uno nuevo haciendo click en el boton Cargar nuevo operario.</span>
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
                                        <div className="col col-sm-12 col-md-12 col-lg-12">
                                            <nav className="navbar navbar-light">
                                                <h4 className='float-left text-muted no-margin-botton'>Depósito</h4>
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
                                    <div className="row justify-content-center mt-5 mb-5">
                                        <div className="col-sm-12 col-md-7 col-lg-7 text-center"> 
                                            <div className="card">
                                                <div className="card-body text-center">
                                                    <div className="mt-4"></div>
                                                    <i className="material-icons error-icon mb-4">error_outline</i>
                                                    <h2>Algo salió mal.</h2>
                                                    <small className="text-muted">Por favor salga y vuelva a intentarlo.</small>
                                                    <div className="mb-5"></div>
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

export default Warehouse;