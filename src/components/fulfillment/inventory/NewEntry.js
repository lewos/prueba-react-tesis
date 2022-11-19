import React, { Component } from 'react';

// Componentes
import Sidebar from '../Sidebar';

// Importo llamada a endpoint
import {GetUserByCompanieIdAndRol as GetUserByCompanieIdAndRolAPI} from "../../../controller/UserController";
import {NewProduct as NewProductAPI} from "../../../controller/InventoryController";

class NewEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'main',
            clients: [],
            description: '',
            sku: '',
            ean: '',
            quantity: '',
            lote: '',
            marketplace: '',
            itemId: '',
            clientSelected: '',
            location: '',
            
            companyId: localStorage.getItem("companyId"),
        };
        this.handleActiveView = this.handleActiveView.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        if ( getUserByCompanieIdAndRol.rdo === 200 ) {
            if ( getUserByCompanieIdAndRol.data.length > 0 ) {
                this.setState({
                    clients: getUserByCompanieIdAndRol.data,
                    active_view: 'main'
                });
            } else {
                this.setState({
                    active_view: 'noClients'
                });    
            }
        } else if(getUserByCompanieIdAndRol.rdo === 400 ) {
            this.setState({
                active_view: 'default'
            });
        } else {
            this.setState({active_view: 'default'});
        }
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
        let clientSelected = this.state.clientSelected
        let location = this.state.location
        let companyId = this.state.companyId

        this.setState({active_view: 'loading'});
        let newProduct = await NewProductAPI(description, sku, ean, quantity, lote, marketplace, itemId, clientSelected, location, companyId);

        if(newProduct.rdo === 201 ) {
            this.setState({active_view: 'success'});
        } else {
            this.setState({active_view: 'error'});
        }
    }

    Inventory = () => {
        this.props.history.push({
            pathname: '/admin_fulfillment/inventario',
        })
    }

    render() {
        const active_view = this.state.active_view
        let clients = this.state.clients
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

                                                            <div className="row mt-2">
                                                                <div className="col">
                                                                    <label className="form-label input-label-size text-muted">Cliente</label>
                                                                    <select 
                                                                        className="form-select form-select-sm text-muted"
                                                                        name="clientSelected"
                                                                        required
                                                                        value={this.state.clientSelected}
                                                                        onChange={this.myChangeHandler} >
                                                                            <option 
                                                                                defaultValue 
                                                                                disabled 
                                                                                value="">
                                                                                    Seleccion&aacute; un cliente
                                                                            </option>
                                                                            {
                                                                                clients.map( 
                                                                                    client => 
                                                                                        <option 
                                                                                            value={client.id}
                                                                                            key={client.id} >
                                                                                                {client.name} {client.lastName}
                                                                                        </option>
                                                                                )
                                                                            }
                                                                    </select>
                                                                </div>
                                                                <div className="col">
                                                                    <label className="form-label input-label-size text-muted">Ubicación</label>
                                                                        <input 
                                                                            className="form-control form-control-sm text-muted" 
                                                                            type="text" 
                                                                            placeholder="Ubicación en el depósito"
                                                                            aria-label=".form-control-sm example"
                                                                            required
                                                                            name="location"
                                                                            value={this.state.location}
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
                                        <div className="col col-sm-12 col-md-12 col-lg-12">
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
                                                    <h3>Producto ingresado correctamente</h3>
                                                    <small className="text-muted">Ya generamos el ingreso del nuevo producto. Podes verlo en el listado del inventario</small>
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
                                        <div className="col col-sm-12 col-md-12 col-lg-12">
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
                                                    <small className="text-muted">Verificá que el cliente seleccionado te haya dado los permisos necesarios del market-place correspondiente <br/> o volvé a intentarlo en unos minutos.</small>
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
        case "noClients":
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
                                        <div className="col ">
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
                                                    <h3>No puedes cargar inventario</h3>
                                                    <small className="text-muted">Aún no se han registrado clientes al fulfillment.</small>
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