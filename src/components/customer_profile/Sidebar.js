import React, { Component } from 'react';

// Logo del proyecto
import Logo from "../../assets/img/logo/logo7.png"

// Imagen de perfil
import ProfileImg from '../../assets/img/user.png'

class LateralNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item_menu: localStorage.getItem('item_menu'),
            user_Name: localStorage.getItem('nombre'),
            user_LastName: localStorage.getItem('apellido'),
            companyId: localStorage.getItem('companyId'),
            className_permission: 'btn btn-primary-conegliano btn-sm text-start',
            className_request: 'btn btn-primary-conegliano btn-sm text-start',
            className_inventory: 'btn btn-primary-conegliano btn-sm text-start',
            className_sales: 'btn btn-primary-conegliano btn-sm text-start',
            className_warehouse: 'btn btn-primary-conegliano btn-sm text-start',
            className_home: 'btn btn-primary-conegliano btn-sm text-start',
        };
    }

    componentDidMount() {
        this.handleMenu();
    }

    // Manejo el menu actual segun una localstorage.
    handleMenu = () => {
        if(this.state.item_menu === "permission") {
            this.setState({className_permission: "btn btn-primary-conegliano btn-sm text-start active"});
            this.setState({className_request: "btn btn-primary-conegliano btn-sm text-start"});
            this.setState({className_inventory: "btn btn-primary-conegliano btn-sm text-start"});
            this.setState({className_home: "btn btn-primary-conegliano btn-sm text-start"});
        } else if (this.state.item_menu === "request") {
            this.setState({className_permission: "btn btn-primary-conegliano btn-sm text-start"});
            this.setState({className_request: "btn btn-primary-conegliano btn-sm text-start active"});
            this.setState({className_inventory: "btn btn-primary-conegliano btn-sm text-start"});
            this.setState({className_home: "btn btn-primary-conegliano btn-sm text-start"});
        } else if (this.state.item_menu === "inventory") {
            this.setState({className_permission: "btn btn-primary-conegliano btn-sm text-start"});
            this.setState({className_request: "btn btn-primary-conegliano btn-sm text-start"});
            this.setState({className_inventory: "btn btn-primary-conegliano btn-sm text-start active"});
            this.setState({className_home: "btn btn-primary-conegliano btn-sm text-start"});
        } else if (this.state.item_menu === "home") {
            this.setState({className_home: "btn btn-primary-conegliano btn-sm text-start active"});
            this.setState({className_permission: "btn btn-primary-conegliano btn-sm text-start"});
            this.setState({className_request: "btn btn-primary-conegliano btn-sm text-start"});
            this.setState({className_inventory: "btn btn-primary-conegliano btn-sm text-start"});
        } else {
            this.setState({className_permission: "btn btn-primary-conegliano btn-sm text-start"});
            this.setState({className_request: "btn btn-primary-conegliano btn-sm text-start"});
            this.setState({className_inventory: "btn btn-primary-conegliano btn-sm text-start"});
            this.setState({className_home: "btn btn-primary-conegliano btn-sm text-start"});
        }
    }

    Profile = () => {
        this.props.history.push({
            pathname: '/cliente_fulfillment/perfil',
        })
        localStorage.setItem("item_menu","none");
    }

    home = () => {
        this.props.history.push({
            pathname: '/cliente_fulfillment/inicio',
        })
        localStorage.setItem("item_menu","home");
    }

    Permission = () => {
        this.props.history.push({
            pathname: '/cliente_fulfillment/permisos',
        })
        localStorage.setItem("item_menu","permission");
    }

    Request = () => {
        this.props.history.push({
            pathname: '/cliente_fulfillment/solicitudes',
        })
        localStorage.setItem("item_menu","request");
    }

    Inventory = () => {
        this.props.history.push({
            pathname: '/cliente_fulfillment/inventario',
        })
        localStorage.setItem("item_menu","inventory");
    }

    Logout = () => {
        localStorage.removeItem("usuarioId");
        localStorage.removeItem("nombre");
        localStorage.removeItem("apellido");
        localStorage.removeItem("rol");
        localStorage.removeItem("email");
        localStorage.removeItem("tUserId");
        localStorage.removeItem("mUserId");
        localStorage.removeItem("usuarioValido");
        localStorage.removeItem("item_menu");
        localStorage.removeItem("companyId");
        this.props.history.push({
            pathname: '/login',
        })
    }

    render() {
        let companyId = this.state.companyId
        return (
            <div>
                <div className="sidebar-wrapper">
                    <div className="row sd-logo-background">
                        <div className="col d-grid gap-2">
                            <button 
                                type="button"
                                className="btn mt-4 mb-4">
                                    <img 
                                        src={Logo} 
                                        alt="Logo" 
                                        width="130" />
                            </button>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <button 
                                type="button" 
                                className="btn btn-sidebar-logout btn-sm"
                                onClick={this.Profile}>
                                    <img 
                                        src={ProfileImg} 
                                        alt="ProfileImg" 
                                        className="sb-size-img d-inline rounded-circle ms-1" />
                                    <div className="align-middle fw-bold d-inline ms-3">{this.state.user_Name} {this.state.user_LastName}</div>
                            </button>
                        </div>
                    </div>
                    <hr/>
                    {
                        companyId ? (
                            <div className="row">
                                <div className="col d-grid">
                                    <button 
                                        type="button" 
                                        className={this.state.className_home}
                                        onClick={this.home}>
                                        <i className="material-icons align-middle ms-2 me-3">home</i>
                                        <span className='align-middle'>Inicio</span>
                                    </button>
                                    <br/>
                                    <button
                                        type="button"
                                        className={this.state.className_request}
                                        onClick={this.Request}>
                                            <i className="material-icons align-middle ms-2 me-3">checklist</i>
                                            <span className='align-middle'>Solicitudes</span>
                                    </button>
                                    <br/> 
                                        <button 
                                            type="button" 
                                            className={this.state.className_permission}
                                            onClick={this.Permission}>
                                            <i className="material-icons align-middle ms-2 me-3">key</i>
                                            <span className='align-middle'>Permisos</span>
                                        </button>
                                    <br/>
                                    <button
                                        type="button"
                                        className={this.state.className_inventory}
                                        onClick={this.Inventory}>
                                            <i className="material-icons align-middle ms-2 me-3">inventory_2</i>
                                            <span className='align-middle'>Inventario</span>
                                    </button> 
                                </div>
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col d-grid">
                                    <button
                                        type="button"
                                        className={this.state.className_request}
                                        onClick={this.Request}>
                                            <i className="material-icons align-middle ms-2 me-3">checklist</i>
                                            <span className='align-middle'>Solicitudes</span>
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    <hr/>
                    <div className="row">
                        <div className="col">
                            <button 
                                type="button" 
                                className="btn btn-sidebar-logout btn-sm"
                                onClick={this.Logout}>
                                    <i className="material-icons align-middle ms-2 me-3">logout</i>
                                    <span className='align-middle'>Cerrar sesión</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LateralNav;