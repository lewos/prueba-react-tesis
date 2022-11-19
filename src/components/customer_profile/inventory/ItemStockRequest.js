import React, { Component } from 'react';

// Importo llamada a endpoint
import {GetCompaniesById as GetCompaniesByIdAPI} from "../../../controller/CompanieController";

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'main',
            companieName: '',
            stockRequest: this.props.itemStockRequest,
        };
    }

    componentDidMount() {
        this.getCompanieName();
    }

    // Busca el nombre de un fulfillment por id.
    getCompanieName = async () =>{

        let companyId = this.state.stockRequest.companyId
        
        this.setState({active_view: 'loading'});
        
        // Ejecuto el endopoint para buscar las solicitudes del usuario.
        let getCompaniesById = await GetCompaniesByIdAPI(companyId);

        if(getCompaniesById.rdo === 200) {
            this.setState({
                companieName: getCompaniesById.data.name,
                active_view: 'main'
            });
        } else if(getCompaniesById.rdo === 400) {
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
                                    { this.state.companieName }
                                </div>
                                <div className="col fs-6 text-muted">
                                    { stockRequest.description }
                                </div>
                                <div className="col fs-6 text-muted">
                                    { stockRequest.state === 'Pendiente' ? ( 
                                            <span className="badge bg-warning text-dark">Pendiente</span>
                                        ) : (
                                            stockRequest.state === 'Confirmado' ? (
                                                <span className="badge bg-success">Aprobada</span>
                                            ) : (
                                                <span className="badge bg-danger">Rechazada</span>
                                            )
                                        )
                                    }
                                </div>
                                <div className="col fs-6 text-muted">
                                    { requestCreated }
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

export default Item;