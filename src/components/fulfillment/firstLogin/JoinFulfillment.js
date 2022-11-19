import React, { Component } from 'react';

// Imagenes
import fulfillment from '../../../assets/img/fulfillment.png'

// Importo llamada a endpoint
import {GetCompanieByName as GetCompanieByNameAPI} from "../../../controller/FirstLoginController";
import {RequestsToJoinCompanie as RequestsToJoinCompanieAPI} from "../../../controller/RequestsController";

class JoinFulfillment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'join',

            fulfillments: [],

            seekFulfillment: '',

            fulfillmentName: '',

            msj_error: false,

            userId: localStorage.getItem("usuarioId"),

        };
        this.handleActiveView = this.handleActiveView.bind(this);
    }

    // Busca un fulfillment por nombre.
    seekFulfillment = async (event) =>{
        event.preventDefault();

        let seekFulfillment = this.state.seekFulfillment
        
        this.setState({active_view: 'loading'});
        
        // Ejecuto el endopoint para buscar un fulfillment
        let getCompanieByName = await GetCompanieByNameAPI(seekFulfillment);

        if(getCompanieByName.rdo === 200) {
            this.setState({
                msj_error: false,
                seekFulfillment: null,
                fulfillments: getCompanieByName.data,
                active_view: 'fulfillmentFound'
            });
        } else if(getCompanieByName.rdo === 404) {
            this.setState({
                msj_error: true,
                seekFulfillment: null,
                active_view: 'join'
            });
        } else {
            this.setState({active_view: 'default'});
        }
    }

    // Solicitar unirse a un fulfillment por nombre.
    requestToJoinFulfillment = async (idFulfillment, event) =>{
        event.preventDefault();
        
        let userId = this.state.userId

        this.setState({active_view: 'loading'});
        
        // Ejecuto el endopoint para solicitar unirse a un fulfillment
        let requestsToJoinCompanie = await RequestsToJoinCompanieAPI( userId, idFulfillment );

        if(requestsToJoinCompanie.rdo === 201) {
            this.setState({
                active_view: 'requestSuccess'
            });
        } else if(requestsToJoinCompanie.rdo === 409) {
            this.setState({
                active_view: 'requestError'
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

    Request = () => {
        this.props.history.push({
            pathname: '/admin_fulfillment/solicitudes',
        })
        localStorage.setItem("item_menu","request");
    }

    render() {
        const active_view = this.state.active_view
        const fulfillments = this.state.fulfillments
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
        case "join":
            return (
                <div>
                    <div className="row justify-content-center mt-5">
                        <div className="col col-sm-12 col-md-8 col-lg-8">
                            <div className="card">
                                <div className="card-header">
                                    Unirme a un Fulfillment
                                </div>
                                <div className="card-body row justify-content-center">
                                    <div className="col-sm-12 col-md-10 col-lg-10">
                                        <form onSubmit={this.seekFulfillment}>
                                            <label className="form-label input-label-size text-muted">
                                                Nombre o Razón Social
                                            </label>
                                            <input 
                                                className="form-control form-control-sm aling" 
                                                type="text" 
                                                placeholder="Nombre o Razón Social del Fulfillment" 
                                                aria-label=".form-control-sm example"
                                                autoComplete="off"
                                                autoFocus={true}
                                                required
                                                name='seekFulfillment'
                                                onChange={this.myChangeHandler} />
                                                { this.state.msj_error ? ( 
                                                    <div>
                                                    <small 
                                                        className="text-danger text-center">
                                                            Fulfillment no encontrado
                                                    </small></div> ) : null 
                                                }
                                            <button 
                                                type="submit" 
                                                className="btn btn-dark btn-sm mt-3">
                                                    Buscar
                                            </button>
                                        </form>
                                    </div>        
                                </div>
                                <div className="card-footer text-muted text-center">
                                    <button 
                                        type="button" 
                                        className="btn btn-link pad-left"
                                        style={{fontSize: "14px"}}
                                        name="main"
                                        onClick={ this.goBack } >
                                        Volver al paso anterior
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case "fulfillmentFound":
            return (
                <div>
                    <div className="row justify-content-center mt-5">
                        <div className="col col-sm-12 col-md-8 col-lg-8">
                            <div className="card">
                                <div className="card-header">
                                    Unirme a un Fulfillment
                                </div>
                                <div className="card-body">
                                    <div className='row justify-content-center'>
                                        <div className="col-sm-12 col-md-10 col-lg-10">
                                            <form onSubmit={this.seekFulfillment}>
                                                <label className="form-label input-label-size text-muted">
                                                    Nombre o Razón Social
                                                </label>
                                                <input 
                                                    className="form-control form-control-sm aling" 
                                                    type="text" 
                                                    placeholder="Nombre o Razón Social del Fulfillment" 
                                                    aria-label=".form-control-sm example"
                                                    autoComplete="off"
                                                    name='seekFulfillment'
                                                    autoFocus={true}
                                                    required
                                                    onChange={this.myChangeHandler} />
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-dark btn-sm mt-3">
                                                        Buscar
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className='row justify-content-center'>
                                        <div className="col-sm-12 col-md-10 col-lg-10">
                                            <div className="card mt-3">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-2 text-center">
                                                            <img 
                                                                src={fulfillment} 
                                                                className="card-img-top join-img-size align-self-center" 
                                                                alt="Unirme a un Fulfillment"/>
                                                        </div>
                                                        <div className="col fs-6 text-muted text-center align-self-center">
                                                            {fulfillments.name}
                                                        </div>
                                                        <div className="col fs-6 text-muted text-center align-self-center">
                                                            {fulfillments.street}
                                                        </div>
                                                        <div className="col fs-6 text-muted align-self-center">
                                                            <div className="d-grid gap-2 col-9 mx-auto">
                                                                <button 
                                                                    type="button" 
                                                                    className="btn btn-outline-dark btn-sm"
                                                                    name={fulfillments.id}
                                                                    onClick={(e) => {
                                                                        this.requestToJoinFulfillment(fulfillments.id, e);
                                                                    }}>
                                                                        <div className='fl-btn-size'>
                                                                            Solicitar unirme
                                                                        </div> 
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
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
        case "requestSuccess": 
            return (
                <div>
                    <div className="row justify-content-center mt-5 mb-5">
                        <div className="col-sm-12 col-md-7 col-lg-7 text-center">
                            <div className="card">
                                <div className="card-body text-center mt-4 mb-4">
                                    <i className="material-icons error-icon mb-4">done</i>
                                    <h2>Nueva solicitud generada</h2>
                                    <small className="text-muted">
                                        Generamos tu solicitud para ingresar al fulfillment. <br/> 
                                        Te notificaremos por e-mail cuando la misma sea aprobada.
                                    </small>
                                    <br/>
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-dark btn-sm mt-4"
                                        onClick={this.Request}>
                                            Ir a solicitudes
                                    </button>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            )
        case "requestError": 
            return (
                <div>
                    <div className="row justify-content-center mt-5 mb-5">
                        <div className="col-sm-12 col-md-7 col-lg-7 text-center"> 
                            <div className="card">
                                <div className="card-body text-center mt-4 mb-4">
                                    <i className="material-icons error-icon mb-4">error_outline</i>
                                    <h2>No pudimos generar la solicitud</h2>
                                    <small className="text-muted">Volvé a intentarlo en unos minutos.</small>
                                    <br/>
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-dark btn-sm mt-4"
                                        onClick={this.goBack}>
                                            Volver al paso anterior
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

export default JoinFulfillment;