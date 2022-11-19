import React, { Component } from 'react';

// Importo llamada a endpoint
import {CreateCompanie as CreateCompanieAPI} from "../../../controller/FirstLoginController";

class createFulfillment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'new',

            razon_social: '',
            cuit: '',
            apoderado: '',
            domicilio_fiscal: '',
            codigo_postal: '',
            localidad: '',
            provincia: '',
            telefono: '',
            email: '',

            createdByUserId: localStorage.getItem("usuarioId"),
        };
        this.handleActiveView = this.handleActiveView.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Validacion de los datos ingresados por el usuario.
    handleSubmit = async (event) =>{
        event.preventDefault();

        // Ejecuto el endopoint para crear un fulfillment
        let razon_social = this.state.razon_social
        let cuit = this.state.cuit
        let apoderado = this.state.apoderado
        let domicilio_fiscal = this.state.domicilio_fiscal
        let codigo_postal = this.state.codigo_postal
        let localidad = this.state.localidad
        let provincia = this.state.provincia
        let telefono = this.state.telefono
        let email = this.state.email
        let createdByUserId = this.state.createdByUserId

        this.setState({active_view: 'loading'});
        let createCompanie = await CreateCompanieAPI(razon_social, cuit, apoderado, domicilio_fiscal, localidad, provincia, telefono, email, createdByUserId);

        if(createCompanie.rdo === 201 ) {
            this.setState({active_view: 'newCompanieOK'});
        } else {
            this.setState({active_view: 'newCompanieERROR'});
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

    goBack = () => {
        window.location.reload();
    }

    home = () => {
        this.props.history.push({
            pathname: '/admin_fulfillment/solicitudes',
        })
        localStorage.setItem("item_menu","request");
    }

    render() {
        const active_view = this.state.active_view
        switch(active_view) {
        case "loading": 
            return (
                <div>
                    <div className="row justify-content-center mt-5 mb-5">
                        <div className="col-sm-12 col-md-7 col-lg-7 mt-5 mb-5 text-center"> 
                            <div className="spinner-grow spinner-color" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <br/>
                            <p className="text-muted mt-3">Cargando...</p>
                        </div>    
                    </div>
                </div>
            )
        case "new":
            return (
                <div>
                    <div className="row justify-content-center mt-5 mb-5">
                        <div className="col col-sm-12 col-md-8 col-lg-8">
                            <div className="card">
                                <div className="card-header">
                                    Crear un nuevo Fulfillment
                                </div>
                                <div className="card-body row justify-content-center">
                                    <div className="col-sm-12 col-md-10 col-lg-10">

                                        <div className="row mt-2">
                                            <div className="col">
                                                <label className="form-label input-label-size text-muted">
                                                    Nombre o Razón Social
                                                </label>
                                                <input 
                                                    className="form-control form-control-sm aling" 
                                                    type="text" 
                                                    placeholder="Nombre o Razón Social del Fulfillment"
                                                    aria-label=".form-control-sm example"
                                                    autoComplete="off"
                                                    name='razon_social'
                                                    onChange={this.myChangeHandler} />
                                            </div>
                                            <div className="col">
                                                <label className="form-label input-label-size text-muted">
                                                    CUIT
                                                </label>
                                                <input 
                                                    className="form-control form-control-sm aling" 
                                                    type="text" 
                                                    placeholder="CUIT del Fulfillment" 
                                                    aria-label=".form-control-sm example"
                                                    autoComplete="off"
                                                    name='cuit'
                                                    onChange={this.myChangeHandler} />
                                            </div>
                                        </div>

                                        <div className="row mt-2">
                                            <div className="col">
                                                <label className="form-label input-label-size text-muted">
                                                    Apoderado
                                                </label>
                                                <input 
                                                    className="form-control form-control-sm aling" 
                                                    type="text" 
                                                    placeholder="Apoderado o principal responsable" 
                                                    aria-label=".form-control-sm example"
                                                    autoComplete="off"
                                                    name='apoderado'
                                                    onChange={this.myChangeHandler} />
                                            </div>
                                            <div className="col"></div>
                                        </div>

                                        <div className="row mt-2">
                                            <div className="col">
                                                <label className="form-label input-label-size text-muted">
                                                    Domicilio Fiscal
                                                </label>
                                                <input 
                                                    className="form-control form-control-sm aling" 
                                                    type="text" 
                                                    placeholder="Calle y número" 
                                                    aria-label=".form-control-sm example"
                                                    autoComplete="off"
                                                    name='domicilio_fiscal'
                                                    onChange={this.myChangeHandler} />
                                            </div>
                                            <div className="col">
                                                <label className="form-label input-label-size text-muted">
                                                    Código postal
                                                </label>
                                                <input 
                                                    className="form-control form-control-sm aling" 
                                                    type="text" 
                                                    placeholder="Código Postal" 
                                                    aria-label=".form-control-sm example"
                                                    autoComplete="off"
                                                    name='codigo_postal'
                                                    onChange={this.myChangeHandler} />
                                            </div>
                                        </div>
                                        
                                        <div className="row mt-2">
                                            <div className="col">
                                                <label className="form-label input-label-size text-muted">
                                                    Localidad
                                                </label>
                                                <input 
                                                    className="form-control form-control-sm aling" 
                                                    type="text" 
                                                    placeholder="Localidad" 
                                                    aria-label=".form-control-sm example"
                                                    autoComplete="off"
                                                    name='localidad'
                                                    onChange={this.myChangeHandler} />
                                            </div>
                                            <div className="col">
                                                <label className="form-label input-label-size text-muted">
                                                    Provincia
                                                </label>
                                                <input 
                                                    className="form-control form-control-sm aling" 
                                                    type="text" 
                                                    placeholder="Provincia" 
                                                    aria-label=".form-control-sm example"
                                                    autoComplete="off"
                                                    name='provincia'
                                                    onChange={this.myChangeHandler} />
                                            </div>
                                        </div>
                                        
                                        <div className="row mt-2">
                                            <div className="col">
                                                <label className="form-label input-label-size text-muted">
                                                    Teléfono
                                                </label>
                                                <input 
                                                    className="form-control form-control-sm aling" 
                                                    type="text" 
                                                    placeholder="Teléfono de contacto" 
                                                    aria-label=".form-control-sm example"
                                                    autoComplete="off"
                                                    name='telefono'
                                                    onChange={this.myChangeHandler} />
                                            </div>
                                            <div className="col">
                                                <label className="form-label input-label-size text-muted">
                                                    E-mail
                                                </label>
                                                <input 
                                                    className="form-control form-control-sm aling" 
                                                    type="text" 
                                                    placeholder="E-mail de contacto" 
                                                    aria-label=".form-control-sm example"
                                                    name='email'
                                                    onChange={this.myChangeHandler} />
                                            </div>
                                        </div>
                                        
                                        <div className="d-grid gap-2 col-2">
                                        <button 
                                            type="button" 
                                            className="btn btn-dark btn-sm mt-4 mb-2"
                                            onClick={this.handleSubmit}>
                                                Crear
                                        </button>
                                        </div>
                                    </div>        
                                </div>
                                <div className="card-footer text-muted text-center">
                                    <button 
                                        type="button" 
                                        className="btn btn-link pad-left"
                                        style={{fontSize: "14px"}}
                                        name="main"
                                        onClick={ this.goBack} >
                                        Volver al paso anterior
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case "newCompanieOK":
            return (
                <div>
                    <div className="row align-items-center justify-content-center mb-5">
                        <div className="col-sm-12 col-md-7 col-lg-7 align-self-center"> 
                            <div className="card mt-5">
                                <div className="card-body text-center mt-4 mb-4">
                                    <i className="material-icons error-icon mb-4">done</i>
                                    <h2>Fulfillment creado</h2>
                                    <small className="text-muted">Ya podes invitar a otros usuarios a que se unan a tu fulfillment para administrarlo desde la sección “Deposito”. También podes dar de alta a nuevos operarios para sumar a tu equipo de trabajo.</small>
                                    <br/>
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-dark btn-sm mt-4"
                                        onClick={this.home}>
                                            Continuar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        default:
            return(
                <div>
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
            )
        }
    }
}

export default createFulfillment;