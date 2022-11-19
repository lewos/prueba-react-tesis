import React, { Component } from "react";

import productImg from '../../../assets/img/product.png'

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'main',
            product: this.props.product,
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

    // EditProduct = () => {
    //     this.props.history.push({
    //         pathname: '/admin_fulfillment/editar_producto',
    //         state: {
    //             product: this.state.product,
    //         }
    //     })
    // }

    render() {
        const active_view = this.state.active_view
        let product = this.state.product
        switch(active_view) {
        case "loading": 
            return (
                <div>
                    <div className="card mb-2">
                        <div className="card-body card-request">
                            <div className="row">
                                <div className="col text-center"> 
                                    <div className="spinner-grow align-middle" role="status">
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
                                <div className="col fs-6 text-muted text-start max-length-text">
                                    <img 
                                        src={productImg} 
                                        alt="producto-miniatura" 
                                        className="sales-size-img d-inline me-3" />
                                    <span>
                                        {product.description}
                                    </span>
                                </div>
                                <div className="col fs-6 text-muted max-length-text">
                                    {product.origin}
                                </div>
                                <div className="col fs-6 text-muted max-length-text">
                                    {product.sku}
                                </div>
                                <div className="col-2 fs-6 text-muted">
                                    <input 
                                        className="form-control form-control-sm text-muted text-center" 
                                        type="text" 
                                        placeholder="Descripción del producto" 
                                        aria-label=".form-control-sm example"
                                        required
                                        name="description"
                                        value={product.quantity}
                                        onChange={this.myChangeHandler}
                                    />
                                </div>
                                <div className="col fs-6 text-muted">
                                    <a 
                                        className="update-icon-color" 
                                        type="button"
                                        onClick={(e) => {
                                            this.handleActiveView('updateStock', e);
                                        }}>
                                        <i 
                                            className="material-icons align-middle">
                                            drive_file_rename_outline
                                        </i>
                                        Actualizar stock
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )

    case "updateStock": 
        return (
            <div>
                <div className="card mb-2">
                    <div className="card-body card-request">
                        <div className="row">
                            <div className="col fs-6 text-muted">
                                <span>
                                    Enviaremos una solicitud para editar el stock del producto SKU: {product.sku}
                                </span>
                            </div>
                            <div className="col-3 fs-6 text-muted">
                                <a 
                                    className="update-icon-color me-2" 
                                    type="button"
                                    onClick={this.deleteProduct}>
                                    <i 
                                        className="material-icons align-middle">
                                        check
                                    </i>
                                    Confirmar
                                </a>
                                <a 
                                    className="delete-icon-color" 
                                    type="button"
                                    onClick={(e) => {
                                        this.handleActiveView('main', e);
                                    }}>
                                    <i 
                                        className="material-icons align-middle">
                                        close
                                    </i>
                                    Cancelar
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
                                <span className="text-muted">No pudimos enviar la solicitud. Vuelva a intentarlo en unos minutos.</span>
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

export default Product;