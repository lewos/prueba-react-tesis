import React, { Component } from "react";

// Imagenes
import ProfileImg from '../../../assets/img/user.png'

// Importo llamada a endpoint
import {DeleteOperator as DeleteOperatorAPI} from "../../../controller/OperatorController";

class Operator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'main',
            operario: this.props.operario,
        };
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

    EditOperator = () => {
        this.props.history.push({
            pathname: '/admin_fulfillment/editar_operario',
            state: {
                operario: this.state.operario,
            }
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    deleteOperator = async () => {
        // Ejecuto el endopoint para borrar el operario
        
        this.setState({active_view: 'loading'});

        let operatorId = this.state.operario.id;

        console.log(operatorId)

        let deleteOperator = await DeleteOperatorAPI(operatorId);

        if(deleteOperator.rdo === 200) {
            window.location.reload(false);
        } else {
            this.setState({active_view: 'error'});
        }
    }

    render() {
        const active_view = this.state.active_view
        const operario = this.state.operario
        //console.log(operario)
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
                    <div className="card mb-2">
                        <div className="card-body card-request">
                            <div className="row">
                                <div className="col fs-6 text-muted">
                                    <img 
                                        src={ProfileImg} 
                                        alt="Img operario"
                                        className="sales-size-img d-inline rounded-circle me-3" />
                                    <span className='font-size-sales fw-bold'>
                                        {operario.name} {operario.lastName} 
                                    </span>
                                </div>
                                <div className="col fs-6 text-muted">
                                    {operario.mail}
                                </div>
                                <div className="col fs-6 text-muted">
                                    {operario.rol}
                                </div>
                                <div className="col fs-6 text-muted">
                                    <a 
                                        className="view-icon-color me-3" 
                                        type="button"
                                        onClick={this.EditOperator}>
                                        <i 
                                            className="material-icons align-middle">
                                            edit
                                        </i>
                                    </a>
                                    <a 
                                        className="delete-icon-color" 
                                        type="button"
                                        onClick={(e) => {
                                            this.handleActiveView('delete', e);
                                        }}>
                                        <i 
                                            className="material-icons align-middle">
                                            delete_outline
                                        </i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )

    case "delete": 
        return (
            <div>
                <div className="card mb-2">
                    <div className="card-body card-request">
                        <div className="row">
                            <div className="col fs-6 text-muted">
                                <img 
                                    src={ProfileImg} 
                                    alt="Img operario"
                                    className="sales-size-img d-inline rounded-circle me-3" />
                                <span className='font-size-sales fw-bold'>
                                    {operario.name} {operario.lastName} 
                                </span>
                            </div>
                            <div className="col fs-6 text-muted">
                                {operario.mail}
                            </div>
                            <div className="col fs-6 text-muted">
                                {operario.rol}
                            </div>
                            <div className="col fs-6 text-muted">
                                <a 
                                    className="delete-icon-color" 
                                    type="button"
                                    onClick={this.deleteOperator}>
                                    Borrar operario
                                </a>
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
                                <span className="text-muted">No pudimos borrar el usuario. Vuelva a intentarlo en unos minutos.</span>
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

export default Operator;