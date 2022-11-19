import React, { Component } from 'react';

// Componentes
import Sidebar from '../Sidebar';

// Imagenes
import mercadolibre from '../../../assets/img/mercadolibre.png'
import tiendanube from '../../../assets/img/tiendanube.png'
import mercadolibre2 from '../../../assets/img/mercadolibre2.png'
import tiendanube2 from '../../../assets/img/tiendanube2.png'

// Importo llamada a endpoint
import {GetTokensByUserId as GetTokensByUserIdAPI} from "../../../controller/PermissionController";

class Permission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'main',
            userId: localStorage.getItem("usuarioId"),
            userName: localStorage.getItem("nombre"),
            userLastName: localStorage.getItem("apellido"),
            userData: [],
            mUserId: '',
            mUserIdCreated: '',
            tUserId: '',
            tUserIdCreated: '',
        };
        this.handleActiveView = this.handleActiveView.bind(this);
    }

    componentDidMount() {
        this.getPermissionFromAClient();
    }

    // Actualizo el usuario.
    getPermissionFromAClient = async () =>{
        let userId = this.state.userId

        this.setState({ active_view: 'loading' });

        // Ejecuto el endopoint para obtener los tokens del usuario.
        let getTokensByUserId = await GetTokensByUserIdAPI(userId);

        if(getTokensByUserId.rdo === 200) {
            if (getTokensByUserId.data) {
                getTokensByUserId.data.map(token => 
                    token.SalesChannel === "Mercadolibre" ? (
                        this.setState({
                            mUserId: token.MUserId,
                            mUserIdCreated: token.Created,
                            
                        })
                    ) : (
                        this.setState({
                            tUserId: token.TUserId,
                            tUserIdCreated: token.Created,  
                        })
                    )
                )
            }
            this.setState({
                active_view: 'main',
            })
        } else if(getTokensByUserId.rdo === 400) {
            this.setState({
                active_view: 'main'
            });
        } else {
            this.setState({active_view: 'default'});
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
        
        let mUserId = this.state.mUserId
        let tUserId = this.state.tUserId
        // Fomateo las fecha de los permisos
        let mUserIdCreated = this.state.mUserIdCreated
        let tUserIdCreated = this.state.tUserIdCreated

        let mUserIdCreatedFormat
        if( mUserIdCreated ) {
            const dbDateMUserId = new Date(mUserIdCreated);
            mUserIdCreatedFormat = new Intl.DateTimeFormat('en-GB').format(dbDateMUserId);
        }
        
        let tUserIdCreatedFormat
        if( tUserIdCreated ) {
            const dbDateTUserId = new Date(tUserIdCreated);
            tUserIdCreatedFormat = new Intl.DateTimeFormat('en-GB').format(dbDateTUserId);
        }

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
                                                        Gestioná los permisos a tus cuentas de e-commerce
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col text-center align-self-center">
                                                            <a 
                                                                type="button"
                                                                href="https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=744560801851200&redirect_uri=https://139.144.172.25:9083/api/MOrders" target="_blank">
                                                                    <img src={mercadolibre} className="card-img-top meli-img-size" alt="MercadoLibre"/>
                                                            </a>
                                                            </div>
                                                            <div className="col text-center">
                                                            <a 
                                                                type="button"
                                                                href="https://www.tiendanube.com/apps/5294/authorize" 
                                                                target="_blank">
                                                                    <img src={tiendanube} className="card-img-top tiendanube-img-size" alt="TiendaNube"/>
                                                            </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card mt-4">
                                                <div className="card-header">
                                                    <div className='text-muted p-1 fw-bold'>
                                                        Cuentas vinculadas
                                                    </div>
                                                </div>
                                                <div className="card-body p-4">
                                                    { mUserId ? 
                                                        ( 
                                                            <div className="card text-center mb-2">
                                                                <ul className="list-group list-group-flush">
                                                                    <li className="list-group-item d-flex">
                                                                        <div className="col">
                                                                            <img 
                                                                                src={mercadolibre2} 
                                                                                className="card-img-top miniatura-img-size" alt="MercadoLibre" />
                                                                        </div>
                                                                        <div className="col fs-6 text-muted">
                                                                            {this.state.userName} {this.state.userLastName}
                                                                        </div>
                                                                        <div className="col fs-6 text-muted">
                                                                            { mUserIdCreatedFormat }
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
                                                        ) : (
                                                                <div className="card text-center mb-2">
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
                                                    { tUserId ? 
                                                        ( 
                                                            <div className="card text-center">
                                                                <ul className="list-group list-group-flush">
                                                                    <li className="list-group-item d-flex">
                                                                        <div className="col">
                                                                            <img 
                                                                                src={tiendanube2} 
                                                                                className="card-img-top miniatura-img-size"
                                                                                alt="TiendaNube"/>
                                                                        </div>
                                                                        <div className="col fs-6 text-muted">
                                                                            {this.state.userName} {this.state.userLastName}
                                                                        </div>
                                                                        <div className="col fs-6 text-muted">
                                                                            { tUserIdCreatedFormat }
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
                                                        ) : (
                                                                <div className="card text-center">
                                                                    <div className="text-center mt-2 mb-2">
                                                                        <div className="text-secondary">
                                                                            No hay permisos otorgados de 
                                                                            <img 
                                                                                src={tiendanube2} 
                                                                                className="ms-2 card-img-top miniatura-img-size"
                                                                                alt="TiendaNube" />
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