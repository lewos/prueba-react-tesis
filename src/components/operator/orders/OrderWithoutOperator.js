import React, { Component } from "react";

// Imagenes
import ProfileImg from '../../../assets/img/user.png'

// Componentes
import Item from "./Item";

// Importo llamada a endpoint
import {TakeOrder as TakeOrderAPI} from "../../../controller/OrderController";

class OrderWithoutOperator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: this.props.order,
            eye_state: 'visibility_off',
            assigned_to: '',
            userId: localStorage.getItem("usuarioId"),
            orderId: this.props.order.packId,
            companyId: localStorage.getItem("companyId"),
        };
        this.handleIconEyeState = this.handleIconEyeState.bind(this);
    }

    // Manejo el icono de visualizacion.
    handleIconEyeState = () => {
        if(this.state.eye_state === "visibility_off") {
            this.setState({eye_state: "visibility"});
        } else {
            this.setState({eye_state: "visibility_off"});
        }
    }

    // Validacion de los datos ingresados por el usuario.
    handleSubmit = async (operatorId) =>{
        let assigned_to = operatorId
        let orderId = this.state.orderId
        let companyId = this.state.companyId

        this.setState({active_view: 'loading'});

        let takeOrder = await TakeOrderAPI(assigned_to, orderId, companyId);

        if(takeOrder.rdo === 200 ) {
            window.location.reload();
        } else {
            //this.setState({active_view: 'error'});
        }
    }

    handleActiveOperator(operatorId, e) {
        e.preventDefault();
        //const { name } = e.target;
        console.log({ operatorId });
        this.setState(() => ({
            assigned_to: operatorId
        }));
        this.handleSubmit(operatorId);
    }

    render() {
        const order = this.state.order;
        const target = '#collapse'+order.packId;
        const targetDestination = 'collapse'+order.packId;
        return (
            <div>
                <div className="accordion accordion-border mb-3" id="accordionExample">
                    <div className="accordion-item">
                        <div className="accordion-header d-grid gap-2 p-2 accordion-background-color" id="headingOne">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <span className="font-size-sales fw-bold new-order-color">Nuevo ingreso</span>
                                        <a 
                                            className="collapsed ms-3" 
                                            type="button" 
                                            data-bs-toggle="collapse" 
                                            data-bs-target={target} 
                                            aria-expanded="true" 
                                            aria-controls="collapseOne"
                                            onClick={this.handleIconEyeState}>
                                            <i 
                                                className="material-icons float-right align-middle text-muted">
                                                {this.state.eye_state}
                                            </i>
                                        </a>
                                    </div>
                                    <div className="col-3">
                                        <span className='font-size-sales fw-bold float-end'>Asignación pendiente</span>
                                    </div>
                                    <div className="col-1">
                                        <div className="dropstart">
                                            <a 
                                                className="" 
                                                href="#" 
                                                role="button" 
                                                id="dropdownMenuLink" data-bs-toggle="dropdown" 
                                                aria-expanded="false">
                                                <i 
                                                    className="material-icons float-right align-middle text-muted">
                                                    more_vert
                                                </i>
                                            </a>

                                            <ul 
                                                className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    <li>
                                                        <a 
                                                            className="dropdown-item" href="#"
                                                            onClick={(e) => {
                                                                this.handleActiveOperator(this.state.userId, e);
                                                            }}>
                                                                <img 
                                                                    src={ProfileImg} 
                                                                    alt="Img operario"
                                                                    className="sales-size-img d-inline rounded-circle me-3" />
                                                                Asignarme a mí
                                                        </a>
                                                    </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div 
                            id={targetDestination}
                            className="accordion-collapse collapse" 
                            aria-labelledby="headingOne" 
                            data-bs-parent="#accordionExample">
                                <hr className="hr-no-margin-top hr-no-margin-bottom"/>
                                <div className="accordion-body p-2">

                                    {/*Mapeo todos los items de la orden.*/}
                                    { order.items.length > 0 ? ( 
                                        order.items
                                        .map(item =>
                                            <div className="card border-light">
                                                <div className="card-body card-body-no-padding">
                                                    <div className="container-fluid">
                                                        <div className="row">
                                                            <div className="col-1 no-padding-right no-padding-left d-flex justify-content-center">
                                                                <div className="form-check">
                                                                    <input 
                                                                        className="form-check-input"
                                                                        type="checkbox" 
                                                                        value={item.id}
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </div>
                                                            <Item 
                                                                item = {item} 
                                                                key = {item.id} 
                                                                history={this.props.history}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            ) 
                                        ) : (

                                            <div className="text-center">
                                                <span className="text-secondary">
                                                    <i className="material-icons text-secondary align-middle me-2">assignment</i>
                                                    Orden sin items.
                                                </span>
                                            </div>

                                        ) 
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default OrderWithoutOperator;