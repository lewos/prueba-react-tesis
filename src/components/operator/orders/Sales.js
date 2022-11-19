import React, { Component } from 'react';

// Componentes
import Sidebar from '../Sidebar';
import OrderWithoutOperator from './OrderWithoutOperator';
import OrderWithOperator from './OrderWithOperator';
import CompleteOrder from './CompleteOrder';

// Importo llamada a endpoint
import {GetOrdersFromACompany as GetOrdersFromACompanyAPI} from "../../../controller/OrderController";

class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'main',

            orders: [],

        };
        this.handleActiveView = this.handleActiveView.bind(this);
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders = async () => {
        
        this.setState({active_view: 'loading'});

        let companyId = localStorage.getItem("companyId");
        // Ejecuto el endopoint para traer todos los operarios
        let getOrdersFromACompany = await GetOrdersFromACompanyAPI(companyId);

        if(getOrdersFromACompany.rdo === 200) {
            this.setState({
                orders: getOrdersFromACompany.data,
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

    render() {
        const active_view = this.state.active_view
        //const operarios = this.state.operarios
        //console.log(operarios)
        const orders = this.state.orders
        console.log(orders)
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
                                                <h4 className='float-left text-muted no-margin-botton'>Ventas</h4>
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
                                            <h4 className='float-left text-muted no-margin-botton'>Ventas</h4>
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
                                        <div className="container-fluid">
                                            <div className="row justify-content-center">
                                                <div className="col-sm-12 col-md-10 col-lg-10">
                                                    <div className="card mt-3">
                                                        <div className="card-header bg-dark card-header-padd-sales"></div>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <div className="font-size-sales fw-bold ">Nuevos ingresos</div>
                                                                            <div className="input-label-size text-muted">2 ventas</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <div className="font-size-sales fw-bold">Listas para despachar</div>
                                                                            <div className="input-label-size text-muted">4 ventas</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <div className="font-size-sales fw-bold">En tránsito</div>
                                                                            <div className="input-label-size text-muted">1 ventas</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <div className="font-size-sales fw-bold">Finalizadas</div>
                                                                            <div className="input-label-size text-muted">8 ventas</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container-fluid">
                                            <div className="row justify-content-center">
                                                <div className="col-sm-12 col-md-10 col-lg-10">
                                                    {/*Mapeo todas las ordenes.*/}
                                                    { this.state.orders.length > 0 ? ( 
                                                        this.state.orders
                                                        .map(order => 
                                                            {if ( order.items[0].state === 0 ) {
                                                                return (
                                                                    <OrderWithoutOperator  
                                                                        order = {order} 
                                                                        key={order.id}
                                                                        history={this.props.history} 
                                                                    />)
                                                            } else if ( order.items[0].state === 1 ) {
                                                                return (
                                                                    <OrderWithOperator  
                                                                            order = {order} 
                                                                            key={order.id} 
                                                                            history={this.props.history} 
                                                                        />
                                                                )

                                                            } else if ( order.items[0].state === 3 ) {
                                                                return (
                                                                <CompleteOrder  
                                                                        order = {order} 
                                                                        key={order.id} 
                                                                        history={this.props.history} 
                                                                    />
                                                                )
                                                            }
                                                        }
                                                            ) 
                                                        ) : (

                                                            <div className="text-center mt-5">
                                                                <i className="material-icons global-size-icon  text-secondary mb-4">assignment</i>
                                                                <br/>
                                                                <span className="text-secondary">No ordenes de ventas activas.</span>
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
            )
        default:
            return(
                <div>
                    <div>
                        <div className="container-fluid vh-100">
                            <div className="row align-items-center justify-content-center mb-5">
                                <div className="col-sm-12 col-md-7 col-lg-7 align-self-center"> 
                                    <div className="card mt-5">
                                        <div className="card-body text-center">
                                            <button 
                                                type="button" 
                                                className="close" 
                                                name="profile" 
                                                onClick={(e) => {
                                                    this.handleActiveView(e);
                                                }}
                                                aria-label="Close">
                                                &times;
                                            </button>

                                            <div className="mt-4"></div>

                                            <i className="material-icons ico-no-companies">error</i>
                                            <br/>
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
            )
        }
    }
}

export default Sales;