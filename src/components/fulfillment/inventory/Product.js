import React, { Component } from "react";

import productImg from '../../../assets/img/product.png'
import ProfileImg from '../../../assets/img/user.png'

// Importo llamada a endpoint
import {DeleteProduct as DeleteProductAPI} from "../../../controller/InventoryController";

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

    EditProduct = () => {
        this.props.history.push({
            pathname: '/admin_fulfillment/editar_producto',
            state: {
                product: this.state.product,
            }
        })
    }

    deleteProduct = async () => {
        // Ejecuto el endopoint para borrar el producto
        
        this.setState({active_view: 'loading'});

        let productId = this.state.product.id;

        let deleteProduct = await DeleteProductAPI(productId);

        if(deleteProduct.rdo === 200) {
            window.location.reload(false);
        } else {
            this.setState({active_view: 'error'});
        }
    }

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
                                <div className="col-2 fs-6 text-muted">
                                    {product.quantity}
                                </div>
                                <div className="col fs-6 text-muted max-length-text">
                                    <img 
                                    src={ProfileImg} 
                                    alt="Img operario" 
                                    className="sales-size-img d-inline rounded-circle me-2" />
                                    <span className='font-size-sales fw-bold'>
                                        {product.userIdMail}
                                    </span>
                                </div>
                                <div className="col fs-6 text-muted">
                                    <a 
                                        className="view-icon-color me-3" 
                                        type="button"
                                        onClick={this.EditProduct}>
                                        <i 
                                            className="material-icons align-middle">
                                            visibility
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
                            <div className="col fs-6 text-muted max-length-text">
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
                                {product.quantity}
                            </div>
                            <div className="col fs-6 text-muted">
                                <img 
                                src={ProfileImg} 
                                alt="Img operario" 
                                className="sales-size-img d-inline rounded-circle me-2" />
                                <span className='font-size-sales fw-bold'>
                                    {product.userIdMail}
                                </span>
                            </div>
                            <div className="col fs-6 text-muted">
                                <a 
                                    className="delete-icon-color" 
                                    type="button"
                                    onClick={this.deleteProduct}>
                                    Borrar producto
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
                                <span className="text-muted">No pudimos borrar el producto. Vuelva a intentarlo en unos minutos.</span>
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