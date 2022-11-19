import React, { Component } from 'react';

// Componentes
import Sidebar from '../Sidebar';

// Importo llamada a endpoint
import {UpdateOperator as UpdateOperatorAPI} from "../../../controller/OperatorController";

class EditOperator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'main',

            className_email: 'form-control form-control-sm text-muted',
            className_pass: 'form-control form-control-sm text-muted',

            name: this.props.location.state.operario.name,
            lastname: this.props.location.state.operario.lastName,
            email: this.props.location.state.operario.mail,
            rol: 'Operario',
            password: '',
            confirm_password: '',

            msj_error_email: '',
            msj_error_pass: '',

            userCreated: '',

            operario:  this.props.location.state.operario,
        };
        this.handleActiveView = this.handleActiveView.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Validacion de los datos ingresados por el usuario.
    handleSubmit = async (event) =>{
        event.preventDefault();
        let mail_valido
        let passwords_validas

        if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test((this.state.email))) {
            this.setState({msj_error_email: ''});
            this.setState({className_email: "form-control form-control-sm is-valid text-muted"});
            mail_valido = true
        } else {
            this.setState({msj_error_email: 'Ingrese un e-mail válido.'});
            this.setState({className_email: "form-control form-control-sm is-invalid text-muted"});
            mail_valido = false
        }

        if(this.state.password === this.state.confirm_password) {
            this.setState({msj_error_pass: ''});
            this.setState({className_pass: "form-control form-control-sm is-valid text-muted"});
            passwords_validas = true
        } else {
            this.setState({msj_error_pass: 'Las contraseñas ingresadas no son iguales.'});
            this.setState({className_pass: "form-control form-control-sm is-invalid text-muted"});
            passwords_validas = false
        }

        if(mail_valido && passwords_validas) {
            // Ejecuto el endopoint para crear el usuario con rol Operario
            let id = this.state.operario.id
            let name = this.state.name
            let lastName = this.state.lastname
            let email = this.state.email
            let pass = this.state.password
            let rol = this.state.rol

            this.setState({active_view: 'loading'});
            let updateOperator = await UpdateOperatorAPI(id, name, lastName, email, pass, rol);

            if(updateOperator.rdo === 200 ) {
                this.setState({active_view: 'success'});
            } else {
                this.setState({active_view: 'error'});
            }
        }
    }

    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
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

    Warehouse = () => {
        this.props.history.push({
            pathname: '/admin_fulfillment/deposito',
        })
    }

    render() {
        const active_view = this.state.active_view
        const operario = this.state.operario
        //console.log(operario)
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
                                        <div className="col-sm-12 col-md-10 col-lg-10"> 
                                            <div className="card mt-2 mb-5">
                                                <div className="card-header">
                                                    Editar operario
                                                </div>
                                                <div className="card-body">
                                                    <div className="container-fluid">
                                                        <form onSubmit={this.handleSubmit}>
                                                            <div className="row mt-2">
                                                                <div className="col">
                                                                    <label className="form-label input-label-size text-muted">Nombre</label>
                                                                    <input 
                                                                        className="form-control form-control-sm text-muted" 
                                                                        type="text" 
                                                                        placeholder="Nombre del operario"
                                                                        aria-label=".form-control-sm example"
                                                                        required
                                                                        name="name"
                                                                        value={this.state.name}
                                                                        onChange={this.myChangeHandler}
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <label className="form-label input-label-size text-muted">Apellido</label>
                                                                    <input 
                                                                        className="form-control form-control-sm text-muted" 
                                                                        type="text" 
                                                                        placeholder="Apellido del operario"
                                                                        aria-label=".form-control-sm example"
                                                                        required
                                                                        name="lastname"
                                                                        value={this.state.lastname}
                                                                        onChange={this.myChangeHandler}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col">
                                                                    <label className="form-label input-label-size text-muted">E-mail</label>
                                                                    <input 
                                                                        className={this.state.className_email} 
                                                                        type="text" 
                                                                        placeholder="operario@operario.com" 
                                                                        aria-label=".form-control-sm example" 
                                                                        required
                                                                        name="email"
                                                                        value={this.state.email}
                                                                        onChange={this.myChangeHandler} />
                                                                        { this.state.msj_error_email !== '' ? ( <small className="invalid-feedback">{this.state.msj_error_email}</small> ) : null }
                                                                </div>
                                                                <div className="col">
                                                                    <label className="form-label input-label-size text-muted">Rol</label>
                                                                    <select 
                                                                        className="form-select form-select-sm text-muted" 
                                                                        aria-label=".form-select-sm example"
                                                                        disabled>
                                                                        <option disabled value="">Seleccion&aacute; tu perfil ...</option>
                                                                        <option
                                                                            defaultValue
                                                                            value="Operario">Operario
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="row mt-2">
                                                                <div className="col-sm-12 col-md-6 col-lg-6">
                                                                    <label className="form-label input-label-size text-muted">Nueva contraseña</label>
                                                                    <input 
                                                                        className={this.state.className_pass}
                                                                        type="password" 
                                                                        placeholder="•••••••••••"
                                                                        aria-label=".form-control-sm example"
                                                                        name="password"
                                                                        required
                                                                        value={this.state.password}
                                                                        onChange={this.myChangeHandler}
                                                                    />
                                                                    { this.state.msj_error_pass !== '' ? ( <small className="invalid-feedback">{this.state.msj_error_pass}</small> ) : null }
                                                                </div>
                                                                <div className="col-sm-12 col-md-6 col-lg-6">
                                                                    <label className="form-label input-label-size text-muted">Repita nueva contraseña</label>
                                                                    <input 
                                                                        className={this.state.className_pass}
                                                                        type="password"
                                                                        placeholder="•••••••••••"
                                                                        aria-label=".form-control-sm example"
                                                                        name="confirm_password"
                                                                        required
                                                                        value={this.state.confirm_password}
                                                                        onChange={this.myChangeHandler}
                                                                    />
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="d-grid gap-2 col-2">
                                                                <button 
                                                                    type="submit" 
                                                                    className="btn btn-dark btn-sm mt-4 mb-2" >
                                                                        Actualizar
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
                                                        onClick={this.Warehouse}>
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
                                    <div className="row align-items-center justify-content-center mb-5">
                                        <div className="col-sm-12 col-md-10 col-lg-10 align-self-center"> 
                                            <div className="card mt-5">
                                                <div className="card-body text-center mt-4 mb-4">
                                                    <i className="material-icons error-icon mb-4">done</i>
                                                    <h2>Usuario actualizado</h2>
                                                    <small className="text-muted">Los cambios se guardaron con éxito.</small>
                                                    <br/>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-outline-dark btn-sm mt-4"
                                                        onClick={this.Warehouse}>
                                                            Volver al depósito
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
                                    <div className="row align-items-center justify-content-center mb-5">
                                        <div className="col-sm-12 col-md-10 col-lg-10 align-self-center"> 
                                            <div className="card mt-5">
                                                <div className="card-body text-center mt-4 mb-4">
                                                    <i className="material-icons error-icon mb-4">error_outline</i>
                                                    <h2>No pudimos actualizar los datos del usuario</h2>
                                                    <small className="text-muted">Volvé a intentarlo en unos minutos.</small>
                                                    <br/>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-outline-dark btn-sm mt-4"
                                                        onClick={this.Warehouse}>
                                                            Volver al depósito
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
                                    <div className="row align-items-center justify-content-center mb-5">
                                        <div className="col-sm-12 col-md-10 col-lg-10 align-self-center"> 
                                            <div className="card mt-5">
                                                <div className="card-body text-center mt-4 mb-4">
                                                    <i className="material-icons error-icon mb-4">error_outline</i>
                                                    <h2>Algo salió mal.</h2>
                                                    <small className="text-muted">Por favor salga y vuelva a intentarlo.</small>
                                                    <br/>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-outline-dark btn-sm mt-4"
                                                        onClick={this.Warehouse}>
                                                            Volver al depósito
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
}

export default EditOperator;