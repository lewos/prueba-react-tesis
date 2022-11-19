import urlWebServices from './WebServices.js';

export const RequestsToJoinCompanie = async (userId, companyId) => {
    //url webservices
    let URL_API = urlWebServices.requestsToJoinCompanie;

    let req = JSON.stringify({
        state: 0,
        userId: userId,
        companyId: companyId
    })

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
        console.log(rdo)
        switch(rdo) {
            case 201: {
                // Solicitud creada
                return ({rdo:201, mensaje:"Ok"}); // Correcto
            }
            case 409: {
                // Error en la creacion
                return ({rdo:409, mensaje:"Error en creando la solicitud."});
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

export const GetRequestByUser = async (userId) => {
    //url webservices
    let URL_API = urlWebServices.getRequestByUser;

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
                // Error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const GetRequestFromACompany = async (companieId) => {
    //url webservices
    let URL_API = urlWebServices.getRequestFromACompany;

    try {
        const response = await fetch('http://' + URL_API + '/' + companieId + '/' + "pendiente", {
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

export const AcceptOrRejectRequest = async (requestId, requestState, modifiedByUserId) => {
    //url webservices
    let URL_API = urlWebServices.acceptOrRejectRequest;

    let req = JSON.stringify({
        modifiedByUserId: modifiedByUserId
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
        console.log(rdo);
        console.log(response);

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