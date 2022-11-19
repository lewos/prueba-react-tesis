import React, { Component } from 'react';

// Imagenes
import ProfileImg from '../../assets/img/user.png'

// Componentes
import Sidebar from './Sidebar'

class MainOperator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text_search: '',
            name: localStorage.getItem("nombre"),
            lastName: localStorage.getItem("apellido"),
            email: localStorage.getItem("email"),
        };
        
    }

    setTextFilter(event){
        var text_search = event.target.value
        this.setState({
            text_search: text_search,
        })
    }

    Profile = () => {
        this.props.history.push({
            pathname: '/operario_fulfillment/perfil',
        })
        localStorage.setItem("item_menu","none");
    }

    sales = () => {
        this.props.history.push({
            pathname: '/operario_fulfillment/ventas',
        })
        localStorage.setItem("item_menu","sales");
    }

    render() {
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
                                            <h4 className='float-left text-muted no-margin-botton'>
                                                Hola {this.state.name}
                                            </h4>
                                            <form className="d-flex">
                                                <input 
                                                    className="form-control me-2" 
                                                    type="search" 
                                                    placeholder="Buscar" 
                                                    aria-label="Search"
                                                    value={this.state.text_search} 
                                                    onChange={(text_search) => this.setTextFilter(text_search)}/>
                                                <button 
                                                    className="btn" 
                                                    type="button">
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
                                        <div className="card mt-4">
                                            <div className="card-body text-center">
                                                <div className="col">
                                                    <img 
                                                        src={ProfileImg} 
                                                        alt="ProfileImg" 
                                                        className="profile-size-img mx-auto d-block rounded-circle" 
                                                    />
                                                    <div className="mt-3">
                                                        <h5 className="d-inline align-middle">
                                                            {this.state.name} {this.state.lastName}
                                                        </h5>
                                                    </div>
                                                    <h6 className="text-muted">
                                                        {this.state.email}
                                                    </h6>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-outline-secondary btn-sm d-inline no-border" 
                                                        onClick={this.Profile}>
                                                            <i className="material-icons align-middle profile-icon-size">edit</i>
                                                    </button>
                                                </div>
                                                <hr/>
                                                <div className="row mt-3">
                                                    <div className="col align-self-center">
                                                        <div className="fs-6 text-start">
                                                            Resumen de ordenes
                                                        </div>
                                                    </div>
                                                    <div className="col text-end">
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-light btn-sm" 
                                                            onClick={this.sales}>
                                                                Ir a ordenes de venta
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="font-size-sales fw-bold ">
                                                                    Nuevos ingresos
                                                                </div>
                                                                <div className="input-label-size text-muted">
                                                                    2 ventas
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="font-size-sales fw-bold">
                                                                    Listas para despachar
                                                                </div>
                                                                <div className="input-label-size text-muted">
                                                                    4 ventas
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="font-size-sales fw-bold">
                                                                    En tránsito
                                                                </div>
                                                                <div className="input-label-size text-muted">
                                                                    1 ventas
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="font-size-sales fw-bold">
                                                                    Finalizadas
                                                                </div>
                                                                <div className="input-label-size text-muted">
                                                                    8 ventas
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
                </div>
            </div>
        )
    }
}

export default MainOperator;