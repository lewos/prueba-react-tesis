import urlWebServices from './WebServices.js';

export const GetStockRequest = async (userId) => {
    //url webservices
    let URL_API = urlWebServices.getStockRequest;

    try {
        const response = await fetch('http://' + URL_API + '/' + userId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });

        let rdo = response.status;

        switch(rdo) {
            case 200: {
                const data = await response.json();
                return ({rdo:200, mensaje:"Ok", data}); // Correcto
            }
            case 400: {
                // Bad Request
                return ({rdo:400, mensaje:"Bad Request"});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const NewProduct = async (description, sku, ean, quantity, lote, marketplace, itemId, mUserId, tUserId, userId, companyId) => {
    //url webservices
    let URL_API = urlWebServices.createClientInventory;
    let req;

    if( marketplace === "Mercadolibre" ) {
        req = JSON.stringify({
            category: "category",
            code: "code",
            description: description,
            mItemId: itemId,
            mSellerId: mUserId,
            name: "name",
            origin: marketplace,
            quantity: parseInt(quantity),
            sku: sku,
            size: "size",
            batch: lote,
            ean: ean,
            state: 0,
            userId: userId,
            companyId: companyId,
        })
    } else {
        req = JSON.stringify({
            category: "category",
            code: "code",
            description: description,
            tItemId: itemId,
            tSellerId: tUserId,
            name: "name",
            origin: marketplace,
            quantity: parseInt(quantity),
            sku: sku,
            size: "size",
            batch: lote,
            ean: ean,
            state: 0,
            userId: userId,
            companyId: companyId,
        })
    }

    try {
        const response = await fetch('http://' + URL_API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        let rdo = response.status;

        switch(rdo) {
            case 201: {
                // Producto creado
                const json = await response.json();
                return ({rdo:201, mensaje:"Ok"}); // Correcto
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const UpdateProduct = async (productId, userId, companyId, description, sku, ean, quantity, lote, location) => {
    //url webservices
    let URL_API = urlWebServices.updateProduct;

    let req = JSON.stringify({
        id: productId,
        userId: userId,
        companyId: companyId,
        state: 1,
        quantity: parseInt(quantity),

        description: description,
        sku: sku,
        ean: ean,
        batch: lote,
        location: location,
    })

    try {
        const response = await fetch('http://' + URL_API + '/' + productId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        let rdo = response.status;

        switch(rdo) {
            case 204: {
                // Producto actualizado
                return ({rdo:204, mensaje:"Ok"}); // Correcto
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const DeleteProduct = async (id) => {
    //url webservices
    let URL_API = urlWebServices.deleteProduct;

    try {
        const response = await fetch('http://' + URL_API + '/' + id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });

        let rdo = response.status;

        switch(rdo) {
            case 200: {
                return ({rdo:200, mensaje:"Ok"}); // Correcto
            }
            case 404: {
                return ({rdo:404, mensaje:"Not Found"});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}