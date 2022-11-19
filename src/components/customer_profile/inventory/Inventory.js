import React, { Component } from 'react';

// Componentes
import Sidebar from '../Sidebar';
import Product from './Product';

// Importo llamada a endpoint
import {GetStockByUserId as GetStockByUserIdAPI} from "../../../controller/InventoryController";

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'main',
            inventory: '',
            userId: localStorage.getItem("usuarioId"),
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
        this.getInventory();
    }

    // Busca el inventario que tiene un fulfillment.
    getInventory = async () =>{

        let userId = this.state.userId
        
        this.setState({active_view: 'loading'});
        
        // Ejecuto el endopoint para buscar las solicitudes del usuario.
        let getStockByUserId = await GetStockByUserIdAPI(userId);

        if(getStockByUserId.rdo === 200 ) {
            this.setState({
                inventory: getStockByUserId.data,
                active_view: 'main'
            });
        } else if(getStockByUserId.rdo === 400 ) {
            this.setState({
                active_view: 'error'
            });
        } else {
            this.setState({active_view: 'default'});
        }
    }

    NewEntry = () => {
        this.props.history.push({
            pathname: '/cliente_fulfillment/nuevo_ingreso',
        })
    }

    StockRequests = () => {
        this.props.history.push({
            pathname: '/cliente_fulfillment/solicitud_carga_producto',
        })
    }

    render() {
        const active_view = this.state.active_view
        const inventory = this.state.inventory
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
                                                <h4 className='float-left text-muted no-margin-botton'>Inventario</h4>
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
                                            <h4 className='float-left text-muted no-margin-botton'>Inventario</h4>
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
                                    <div className="col"> 
                                        <div className="card border-light mt-2">
                                            <div className="card-header bg-transparent border-light">
                                                <div className="container">
                                                    <div className="row justify-content-center">
                                                        <div className="col">
                                                            <button 
                                                                type="button" 
                                                                className="btn btn-outline-dark btn-sm"
                                                                onClick={this.NewEntry}>
                                                                    Nuevo ingreso
                                                            </button>
                                                        </div>
                                                        <div className="col text-end">
                                                            <button 
                                                                type="button" 
                                                                className="btn btn-outline-dark btn-sm"
                                                                onClick={this.StockRequests}>
                                                                    Mis solicitudes
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className='hr-no-margin-bottom'/>
                                            </div>
                                            <div className="card-body">
                                                <div className="container">
                                                    <div className="row justify-content-center">
                                                        <div className="col text-center align-self-center">
                                                            <div className="card text-white bg-dark mb-2 ">
                                                                <div className="card-body card-request">
                                                                    <div className="row">
                                                                        <div className="col fs-6">
                                                                            Descripción
                                                                        </div>
                                                                        <div className="col fs-6">
                                                                            Market-Place
                                                                        </div>
                                                                        <div className="col fs-6">
                                                                            SKU
                                                                        </div>
                                                                        <div className="col-2 fs-6">
                                                                            Cantidad
                                                                        </div>
                                                                        <div className="col fs-6">
                                                                            Acciones
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/*Mapeo todas los productos.*/}
                                                            { inventory.length > 0 ? ( 
                                                                inventory
                                                                .map(product => 
                                                                        <Product 
                                                                            product = {product} 
                                                                            key={product.id} 
                                                                            history={this.props.history} 
                                                                        />
                                                                    ) 
                                                                ) : (
                                                                    <div className="text-center ">
                                                                        <i className="material-icons  global-size-icon text-secondary">view_list</i>
                                                                        <br/>
                                                                        <span className="text-secondary">No hay productos para mostrar.</span>
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
                                        <div className="col">
                                            <nav className="navbar navbar-light">
                                                <h4 className='float-left text-muted no-margin-botton'>Inventario</h4>
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

export default Inventory;