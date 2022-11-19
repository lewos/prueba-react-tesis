import React, { Component } from 'react';

// Importo llamada a endpoint
import {AcceptOrRejectRequest as AcceptOrRejectRequestAPI} from "../../../controller/InventoryController";

class StockRequestItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'main',
            companieName: '',
            userName: '',
            stockRequest: this.props.stockRequest,
            userId: localStorage.getItem("usuarioId"),
        };
    }

    // Acepta o rechaza la solicitud.
    acceptOrRejectRequest = async (OnClickOption) =>{

        let requestId = this.state.stockRequest.id
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
        let stockRequest = this.state.stockRequest
        const dbDate = new Date(stockRequest.created);
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
                                    { stockRequest.description }
                                </div>
                                <div className="col fs-6 text-muted">
                                    { stockRequest.userIdMail }
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

export default StockRequestItem;