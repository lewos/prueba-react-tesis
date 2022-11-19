import urlWebServices from './WebServices.js';

export const GetInventoryFromACompany = async (companyId) => {
    //url webservices
    let URL_API = urlWebServices.getInventoryFromACompany;

    try {
        const response = await fetch('http://' + URL_API + '/' + companyId, {
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

export const GetStockByUserId = async (userId) => {
    //url webservices
    let URL_API = urlWebServices.getStockByUserId;

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

export const NewProduct = async (description, sku, ean, quantity, lote, marketplace, itemId, clientSelected, location, companyId) => {
    //url webservices
    let URL_API = urlWebServices.createProduct;
    let req;

    if( marketplace === "Mercadolibre" ) {
        req = JSON.stringify({
            name: "name",
            description: description,
            origin: marketplace,
            quantity: parseInt(quantity),
            mItemId: itemId,
            sku: sku,
            code: "code",
            category: "category",
            state: 1,
            userId: clientSelected,
            companyId: companyId,
            size: "size",
            batch: lote,
            location: location,
            ean: ean
        })
    } else {
        req = JSON.stringify({
            name: "name",
            description: description,
            origin: marketplace,
            quantity: parseInt(quantity),
            TtemId: itemId,
            sku: sku,
            code: "code",
            category: "category",
            state: 1,
            userId: clientSelected,
            companyId: companyId,
            size: "size",
            batch: lote,
            location: location,
            ean: ean
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

export const GetStockRequestFromACompany = async (companyId) => {
    //url webservices
    let URL_API = urlWebServices.getStockRequestFromACompany;

    try {
        const response = await fetch('http://' + URL_API + '/' + companyId + '/' + "Pendiente", {
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

export const AcceptOrRejectRequest = async (requestId, requestState, modifiedByUserId) => {
    //url webservices
    let URL_API = urlWebServices.acceptOrRejectRequestStockRequest;

    let req = JSON.stringify({
        modifiedByUserId: modifiedByUserId,
        location:"No disponible"
    })

    try {
        const response = await fetch('http://' + URL_API + '/' + requestId + '/' + requestState,{
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
                // Solicitud creada
                return ({rdo:204, mensaje:"Ok"}); // Correcto
            }
            case 404: {
                // Not Found
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