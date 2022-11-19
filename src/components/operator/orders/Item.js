import React, { Component } from "react";

import product from '../../../assets/img/product.png'

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
        };
    }

    render() {
        let item = this.state.item
        return (
            <>
                <div className="col-5 no-padding-left no-padding-right">
                    <img 
                        src={product} 
                        alt="producto-miniatura" 
                        className="sales-size-img d-inline me-3" 
                    />
                                            
                    <label 
                        className="form-check-label">
                            { item.itemDescription }
                    </label>
                </div>
                <div className="col text-center no-padding-left no-padding-right">
                    <span className='font-size-sales fw-bold'>SKU: { item.sku}</span>
                </div>
                <div className="col-1 text-center no-padding-left no-padding-right">
                    <span className='font-size-sales fw-bold'>{ item.quantity } u.</span>
                </div>
                <div className="col text-center no-padding-left no-padding-right">
                    <span className='font-size-sales fw-bold'>{ item.itemId }</span>
                </div>
            </>
        )
    }
}

export default Item;