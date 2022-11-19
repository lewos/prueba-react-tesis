import React, { Component } from 'react';

// Componentes
import Sidebar from '../Sidebar';

// Importo llamada a endpoint
import {UpdateAfterTokenTiendanube as UpdateAfterTokenAPI} from "../../../controller/UserController";

class PermissionOk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem("usuarioId"),
            source: window.location.hash,
        };
    }

    componentDidMount() {
        this.updateClient();
    }

    // Actualizo el usuario.
    updateClient = async () =>{
        let userId = this.state.userId
        let token = this.state.source

        let str = token;
        str = str.substring(1);

        // Ejecuto el endopoint para actualizar el usuario.
        let updateAfterTokenAPI = await UpdateAfterTokenAPI(userId, str);
    }

    Permission = () => {
        this.props.history.push({
            pathname: '/cliente_fulfillment/permisos',
        })
        localStorage.setItem("item_menu","permission");
    }

    render() {
        console.log(this.state.source)
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
                                    <div className="col-sm-12 col-md-7 col-lg-7 align-self-center"> 
                                        <div className="card mt-5">
                                            <div className="card-body text-center mt-5 mb-5">
                                                <i className="material-icons error-icon mb-4">done</i>
                                                <h3>Permisos otorgados correctamente</h3>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-outline-dark btn-sm mt-4"
                                                    onClick={this.Permission}>
                                                        Ir a permisos
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
    }
}

export default PermissionOk;