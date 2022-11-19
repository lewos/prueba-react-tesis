import React, { Component } from 'react';

// Componentes
import Sidebar from '../Sidebar';

// Importo llamada a endpoint
import {NewProduct as NewProductAPI} from "../../../controller/ClientInventoryController";

class NewEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'main',

            description: '',
            sku: '',
            ean: '',
            quantity: '',
            lote: '',
            marketplace: '',
            itemId: '',

            tUserId: localStorage.getItem("tUserId"),
            mUserId: localStorage.getItem("mUserId"),
            userId: localStorage.getItem("usuarioId"),
            companyId: localStorage.getItem("companyId"),
        };
        this.handleActiveView = this.handleActiveView.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    // Maneja las vistas.
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

    // Validacion de los datos ingresados por el usuario.
    handleSubmit = async (event) =>{
        event.preventDefault();

        let description = this.state.description
        let sku = this.state.sku
        let ean = this.state.ean
        let quantity = this.state.quantity
        let lote = this.state.lote
        let marketplace = this.state.marketplace
        let itemId = this.state.itemId
        let mUserId = this.state.mUserId
        let tUserId = this.state.tUserId
        let userId = this.state.userId
        let companyId = this.state.companyId

        this.setState({active_view: 'loading'});
        let newProduct = await NewProductAPI(description, sku, ean, quantity, lote, marketplace, itemId, mUserId, tUserId, userId, companyId);

        if(newProduct.rdo === 201 ) {
            this.setState({active_view: 'success'});
        } else {
            this.setState({active_view: 'error'});
        }
    }

    Inventory = () => {
        this.props.history.push({
            pathname: '/cliente_fulfillment/inventario',
        })
    }

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
                                        <div className="col-sm-12 col-md-10 col-lg-10"> 
                                            <div className="card mt-2 mb-5">
                                                <div className="card-header">
                                                    Ingresar producto
                                                </div>
                                                <div className="card-body">
                                                    <div className="container">
                                                        <form onSubmit={this.handleSubmit}>
                                                            <div className="row ">
                                                                <div className="col">
                                                                    <label 
                                                                        className="form-label input-label-size text-muted">
                                                                            Descripción
                                                                    </label>
                                                                    <input 
                                                                        className="form-control form-control-sm text-muted" 
                                                                        type="text" 
                                                                        placeholder="Descripción del producto" 
                                                                        aria-label=".form-control-sm example"
                                                                        required
                                                                        name="description"
                                                                        value={this.state.description}
                                                                        onChange={this.myChangeHandler}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col">
                                                                    <label 
                                                                        className="form-label input-label-size text-muted">
                                                                            SKU
                                                                    </label>
                                                                    <input 
                                                                        className="form-control form-control-sm text-muted" 
                                                                        type="text" 
                                                                        placeholder="Código de referencia"
                                                                        aria-label=".form-control-sm example"
                                                                        required
                                                                        name="sku"
                                                                        value={this.state.sku}
                                                                        onChange={this.myChangeHandler}
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <label 
                                                                        className="form-label input-label-size text-muted">
                                                                            EAN
                                                                    </label>
                                                                    <input 
                                                                        className="form-control form-control-sm text-muted" 
                                                                        type="text" 
                                                                        placeholder="Código universal de producto"
                                                                        aria-label=".form-control-sm example"
                                                                        required
                                                                        name="ean"
                                                                        value={this.state.ean}
                                                                        onChange={this.myChangeHandler}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col">
                                                                    <label 
                                                                        className="form-label input-label-size text-muted">
                                                                            Cantidad
                                                                    </label>
                                                                    <input 
                                                                        className="form-control form-control-sm text-muted" 
                                                                        type="number" 
                                                                        placeholder="Cantidad de unidades a ingresar"
                                                                        aria-label=".form-control-sm example"
                                                                        required
                                                                        name="quantity"
                                                                        value={this.state.quantity}
                                                                        onChange={this.myChangeHandler}
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <label className="form-label input-label-size text-muted">Lote</label>
                                                                    <input 
                                                                        className="form-control form-control-sm text-muted" 
                                                                        type="text" 
                                                                        placeholder="Lote"
                                                                        aria-label=".form-control-sm example"
                                                                        required
                                                                        name="lote"
                                                                        value={this.state.lote}
                                                                        onChange={this.myChangeHandler}
                                                                    />
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="row mt-2">
                                                                <div className="col">
                                                                    <label className="form-label input-label-size text-muted">Marketplace</label>
                                                                    <select 
                                                                        className="form-select form-select-sm text-muted" 
                                                                        aria-label=".form-select-sm example"
                                                                        name="marketplace"
                                                                        required
                                                                        value={this.state.marketplace}
                                                                        onChange={this.myChangeHandler} >
                                                                            <option 
                                                                                defaultValue 
                                                                                disabled 
                                                                                value="">
                                                                                    ¿Dónde se encuentra publicado el producto?
                                                                            </option>
                                                                            <option value="Mercadolibre">Mercado Libre</option>
                                                                            <option value="Tiendanube">Tiendanube</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col">
                                                                    <label className="form-label input-label-size text-muted">ItemID</label>
                                                                    <input 
                                                                        className="form-control form-control-sm text-muted" 
                                                                        type="text" 
                                                                        placeholder="ItemID del Marketplace"
                                                                        aria-label=".form-control-sm example"
                                                                        required
                                                                        name="itemId"
                                                                        value={this.state.itemId}
                                                                        onChange={this.myChangeHandler}
                                                                    />
                                                                </div>
                                                            </div>
                                                        
                                                            <div className="d-grid gap-2 col-2">
                                                                <button 
                                                                    type="submit" 
                                                                    className="btn btn-dark btn-sm mt-4 mb-2" >
                                                                        Ingresar
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>        
                                                </div>
                                                <div className="card-footer text-muted text-center">
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-link pad-left"
                                                        style={{fontSize: "14px"}}
                                                        name="main"
                                                        onClick={this.Inventory}>
                                                            Volver al paso anterior
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
        case "success":
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
                                    <div className="row align-items-center justify-content-center mb-5">
                                        <div className="col-sm-12 col-md-7 col-lg-7 align-self-center"> 
                                            <div className="card mt-5">
                                                <div className="card-body text-center mt-5 mb-5">
                                                    <i className="material-icons error-icon mb-4">done</i>
                                                    <h2>Nueva solicitud generada</h2>
                                                    <small className="text-muted">Ya generamos tu solicitud para ingresar un nuevo producto. <br/> Te notificaremos por e-mail cuando la misma sea aprobada.</small>
                                                    <br/>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-outline-dark btn-sm mt-4"
                                                        onClick={this.Inventory}>
                                                            Ir a Inventario
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
                                    <div className="row align-items-center justify-content-center mb-5">
                                        <div className="col-sm-12 col-md-7 col-lg-7 align-self-center"> 
                                            <div className="card mt-5">
                                                <div className="card-body text-center mt-5 mb-5">
                                                    <i className="material-icons error-icon mb-4">priority_high</i>
                                                    <h3>No pudimos cargar el producto al inventario</h3>
                                                    <small className="text-muted">Verificá que hayas dado los permisos necesarios del market-place <br/> correspondiente al fulfillment o volvé a intentarlo en unos minutos.</small>
                                                    <br/>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-outline-dark btn-sm mt-4"
                                                        onClick={this.Inventory}>
                                                            Ir a Inventario
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

export default NewEntry;