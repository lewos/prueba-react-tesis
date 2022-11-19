import React, { Component } from "react";

// Imagenes
import ProfileImg from '../../../assets/img/user.png'

// Componentes
import Item from "./Item";

class CompleteOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: this.props.order,
            operators: this.props.operators,
            eye_state: 'visibility_off',
            assigned_to: ''
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

    render() {
        const order = this.state.order;
        const operators = this.state.operators;
        console.log(operators);
        const target = '#collapse'+order.id;
        const targetDestination = 'collapse'+order.id;
        return (
            <div>
                <div className="accordion accordion-border mb-3" id="accordionExample">
                    <div className="accordion-item">
                        <div className="accordion-header d-grid gap-2 p-2 accordion-background-color" id="headingOne">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <span className="font-size-sales fw-bold ready-order-color">Orden asignada</span>
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
                                        <div className="d-grid gap-2 col-10 mx-auto float-end">
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-primary btn-sm permission-btn-size">
                                                    Reimprimir etiqueta
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-grid gap-2 col-10 mx-auto float-end">
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-danger btn-sm permission-btn-size">
                                                    Finalizar orden
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col text-center">
                                        <img 
                                            src={ProfileImg} 
                                            alt="Img operario" 
                                            className="sales-size-img d-inline rounded-circle me-2" />
                                        <span className='font-size-sales fw-bold'>Hernán Diaz</span>
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

                                    {/*Mapeo todas las ordenes.*/}
                                    { order.items.length > 0 ? ( 
                                        order.items
                                        .map(item => 
                                                <Item 
                                                    item = {item} 
                                                    key={item.id} 
                                                    assigned = {true}
                                                    completed={true} 
                                                    history={this.props.history} 
                                                />
                                            ) 
                                        ) : (

                                            <div className="text-center mt-5">
                                                <i className="material-icons ico-no-companies text-secondary mb-4">assignment</i>
                                                <br/>
                                                <span className="text-secondary">Orden sin items.</span>
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

export default CompleteOrder;