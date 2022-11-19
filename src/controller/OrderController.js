import urlWebServices from './WebServices.js';

export const GetOrdersFromACompany = async (companieId) => {
    //url webservices
    let URL_API = urlWebServices.getOrdersFromACompany;

    try {
        const response = await fetch('http://' + URL_API + '/' + companieId, {
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
                console.log(data)
                return ({rdo:200, mensaje:"Ok", data}); // Correcto
            }
            case 400: {
                // Bad Request
                return ({rdo:400, mensaje:"Bad Request"});
            }
            case 404: {
                // Not Found
                return ({rdo:404, mensaje:"Not Found"});
            }
            default: {
                // Error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const TakeOrder = async (userId, orderId, companyId) => {
    //url webservices
    let URL_API = urlWebServices.takeOrder;

    let req = JSON.stringify({
        userIdInProgress: userId
    })

    try {
        const response = await fetch('http://' + URL_API + '/' + companyId + '/pack/' + orderId + '/start', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        let rdo = response.status;

        console.log(response);

        switch(rdo) {
            case 200: {
                // Orden actualizada
                return ({rdo:200, mensaje:"Ok"}); // Correcto
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

export const PrintOrder = async (userId, orderId, companyId) => {
    //url webservices
    let URL_API = urlWebServices.printOrder;
    
    try {
        const response = await fetch('http://' + URL_API + '/' + companyId + '/pack/' + orderId + '/print/' + userId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        let rdo = response.status;

        switch(rdo) {
            case 200: {
                const data = await response.json();
                console.log(data)
                return ({rdo:200, mensaje:"Ok", data}); // Correcto
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

export const PrintPDF = async (data) => {

    let baerer = data.requestMessage.headers.map(key => key === "Authorization" ? (baerer = key.value) : null )

    try {
        const response = await fetch(data.requestMessage.requestUri, {
            headers: {
                Accept: 'application/json',
                Authorization: baerer
            }
        })

        let rdo = response.status;

        switch(rdo) {
            case 200: {
                const data = await response.json();
                console.log(data)
                return ({rdo:200, mensaje:"Ok"}); // Correcto
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