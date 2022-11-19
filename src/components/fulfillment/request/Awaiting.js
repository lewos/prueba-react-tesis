import React, { Component } from 'react';

// Importo llamada a endpoint
import {GetCompaniesById as GetCompaniesByIdAPI} from "../../../controller/CompanieController";
import {GetUserById as GetUserByIdAPI} from "../../../controller/UserController";
import {AcceptOrRejectRequest as AcceptOrRejectRequestAPI} from "../../../controller/RequestsController";

class Awaiting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'main',
            companieName: '',
            userName: '',
            requestState: '',
            request: this.props.requestFromACompany,
            userId: localStorage.getItem("usuarioId"),
        };
    }

    componentDidMount() {
        this.getCompanieNameAndUserName();
    }

    // Busca el nombre de un fulfillment por id y el nombre del usuario por id.
    getCompanieNameAndUserName = async () =>{

        let userId = this.state.request.userId
        let companyId = this.state.request.companyId
        
        this.setState({active_view: 'loading'});
        
        // Ejecuto el endopoint para buscar las companias por id.
        let getCompaniesById = await GetCompaniesByIdAPI(companyId);
        // Ejecuto el endopoint para buscar los usuarios por id.
        let getUserById = await GetUserByIdAPI(userId);

        if(getCompaniesById.rdo === 200 && getUserById.rdo === 200) {
            this.setState({
                companieName: getCompaniesById.data.name,
                userName: getUserById.data.name,
                active_view: 'main'
            });
        } else if(getCompaniesById.rdo === 400 || getUserById.rdo === 400) {
            this.setState({
                active_view: 'error'
            });
        } else if(getCompaniesById.rdo === 404 || getUserById.rdo === 404) {
            this.setState({
                active_view: 'error'
            });
        } else {
            this.setState({active_view: 'default'});
        }
    }

    // Acepta o rechaza la solicitud.
    acceptOrRejectRequest = async (OnClickOption) =>{

        let requestId = this.state.request.id
        let requestState = OnClickOption
        let userId = this.state.userId
        
        this.setState({active_view: 'loading'});
        
        // Ejecuto el endopoint para buscar las companias por id.
        let acceptOrRejectRequest = await AcceptOrRejectRequestAPI(requestId, requestState, userId);

        if( acceptOrRejectRequest.rdo === 204 ) {
            if ( requestState === "Confirmado" ) {
                this.setState({
                    active_view: 'accepted'
                });
            } else if( requestState === "Rechazado" ) {
                this.setState({
                    active_view: 'rejected'
                });
            }
        } else if( acceptOrRejectRequest.rdo === 404 ) {
            this.setState({
                active_view: 'error'
            });
        } else {
            this.setState({active_view: 'default'});
        }
    }

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

    render() {
        let request = this.state.request
        const dbDate = new Date(request.created);
        let requestCreated = new Intl.DateTimeFormat('en-GB').format(dbDate);
        let active_view = this.state.active_view
        switch(active_view) {
        case "loading": 
            return (
                <div>
                    <div className="card mb-2">
                        <div className="card-body card-request">
                            <div className="row">
                                <div className="col text-center"> 
                                    <div className="spinner-grow align-middle spinner-size me-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <div className="spinner-grow align-middle spinner-size me-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <div className="spinner-grow align-middle spinner-size" role="status">
                                        <span className="visually-hidden">Loading...</span>
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
                    <div className="card text-center mb-2">
                        <div className="card-body card-request">
                            <div className="row">
                                <div className="col fs-6 text-muted">
                                    { this.state.companieName }
                                </div>
                                <div className="col fs-6 text-muted">
                                    { this.state.userName }
                                </div>
                                <div className="col fs-6 text-muted">
                                    {requestCreated}
                                </div>
                                <div className="col fs-6 text-muted">
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-success btn-sm me-3"
                                        onClick={() => {
                                            this.acceptOrRejectRequest('Confirmado');
                                        }}>
                                            <div className='permission-btn-size'>
                                            Aceptar
                                            </div> 
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => {
                                            this.acceptOrRejectRequest('Rechazado');
                                        }}>
                                            <div className='permission-btn-size'>Denegar</div> 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case "accepted": 
            return (
                <div>
                    <div className="card mb-2">
                        <div className="card-body card-request">
                            <div className="row">
                                <div className="col text-center"> 
                                    <span className="text-muted">Solicitud aceptada</span>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            )
        case "rejected": 
            return (
                <div>
                    <div className="card mb-2">
                        <div className="card-body card-request">
                            <div className="row">
                                <div className="col text-center"> 
                                    <span className="text-muted">Solicitud rechazada</span>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            )
        case "error": 
            return (
                <div>
                    <div className="card mb-2">
                        <div className="card-body card-request">
                            <div className="row">
                                <div className="col text-center"> 
                                    <span className="text-muted">No pudimos obtener ésta solicitud. Vuelva a intentarlo en unos minutos.</span>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            )

        default:
            return(
                <div>
                    <div className="card mb-2">
                        <div className="card-body card-request">
                            <div className="row">
                                <div className="col text-center"> 
                                    <span className="text-muted">Algo salió mal. Por favor salga y vuelva a intentarlo.</span>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Awaiting;