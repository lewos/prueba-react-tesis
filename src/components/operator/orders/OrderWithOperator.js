import React, { Component } from "react";

// Imagenes
import ProfileImg from '../../../assets/img/user.png'

// Componentes
import Item from "./Item";

// Importo llamada a endpoint
import {PrintOrder as PrintAPI} from "../../../controller/OrderController";
import {PrintPDF as PrintPDFAPI} from "../../../controller/OrderController";

class OrderWithOperator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: this.props.order,
            eye_state: 'visibility_off',
            assigned_to: this.props.order.items[0].userIdInProgress,
            assigned_to_name: '',
            array: [],
            imprimir: false,
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

    // Manejo el icono de visualizacion.
    handleCheck = (event) => {
        let val = event.target.value;
        let array = this.state.array;
        let existeElementoEnElArray = false

        array.map(element => element == val ? (existeElementoEnElArray = true) : null );
        if (existeElementoEnElArray) {
            array = array.filter(x => x !== val);
        } else {
            array.push(val)
        }
        console.log(array)

        this.setState({array: array});

        if (array.length == this.state.order.items.length) {
            this.setState({imprimir: true});
        } else {
            this.setState({imprimir: false});
        }

    }

    Print = async () => {

        let assigned_to = this.state.order.items[0].userIdInProgress
        let orderId = this.state.orderId
        let companyId = this.state.companyId
        
        this.setState({active_view: 'loading'});

        // Ejecuto el endopoint para imprimir etiqueta.
        let printOrder = await PrintAPI(assigned_to, orderId, companyId);

        if(printOrder.rdo === 200 ) {
            let printPDFOrder = await PrintPDFAPI(printOrder.data);
                if(printPDFOrder.rdo === 200 ) { 

                }
        } else {
            //this.setState({active_view: 'error'});
        }
    }

    render() {
        const order = this.state.order;
        const target = '#collapse'+order.packId;
        const targetDestination = 'collapse'+order.packId;

        let assigned_to_name = this.state.assigned_to_name
        return (
            <div>
                <div className="accordion accordion-border mb-3" id="accordionExample">
                    <div className="accordion-item">
                        <div className="accordion-header d-grid gap-2 p-2 accordion-background-color" id="headingOne">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <span className="font-size-sales fw-bold assigned-order-color">Orden asignada</span>
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
                                    <div className="col">
                                        { this.state.imprimir ? ( 
                                            <div className="d-grid gap-2 col-8 mx-auto float-end">
                                                <button 
                                                    type="button" 
                                                    className="btn btn-outline-primary btn-sm permission-btn-size"
                                                    onClick={this.Print}>
                                                        Imprimir etiqueta
                                                </button>
                                            </div>
                                            
                                            ) : (

                                                <div className="d-grid gap-2 col-8 mx-auto float-end">
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-outline-primary btn-sm permission-btn-size"
                                                        disabled>
                                                            Imprimir etiqueta
                                                    </button>
                                                </div>
                                            ) 
                                        }
                                    </div>
                                    <div className="col text-center">
                                        <img 
                                            src={ProfileImg} 
                                            alt="Img operario" 
                                            className="sales-size-img d-inline rounded-circle me-2" />
                                        <span className='font-size-sales fw-bold'>Leonardo Diaz</span>
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
                                                                        onChange={this.handleCheck} 
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

export default OrderWithOperator;