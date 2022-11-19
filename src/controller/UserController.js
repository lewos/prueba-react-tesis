import urlWebServices from './WebServices.js';

export const GetUserById = async (id) => {
    //url webservices
    let URL_API = urlWebServices.getUserById;

    try {
        const response = await fetch('http://' + URL_API + '/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        let rdo = response.status;

        switch(rdo) {
            case 200: {
                let data = await response.json();
                return ({rdo:200, mensaje:"Ok", data}); // Correcto
            }
            case 404: {
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

export const GetUserByCompanieIdAndRol = async (companyId, rol) => {
    //url webservices
    let URL_API = urlWebServices.getUserByCompanieIdAndRol;

    try {
        const response = await fetch('http://' + URL_API + '/' + companyId + '/' + 'Rol' + '/' + rol, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        let rdo = response.status;

        switch(rdo) {
            case 200: {
                let data = await response.json();
                return ({rdo:200, mensaje:"Ok", data}); // Correcto
            }
            case 404: {
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

export const UpdateAfterToken = async (userId, token) => {
    //url webservices
    let URL_API = urlWebServices.updateAfterToken;

    let req = JSON.stringify({
        mUserId: token
    })

    try {
        const response = await fetch('http://' + URL_API + '/' + userId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        let rdo = response.status;
        console.log(rdo);
        
        switch(rdo) {
            case 200: {
                // Solicitud creada
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

export const UpdateAfterTokenTiendanube = async (userId, token) => {
    //url webservices
    let URL_API = urlWebServices.updateAfterToken;

    let req = JSON.stringify({
        tUserId: token
    })

    try {
        const response = await fetch('http://' + URL_API + '/' + userId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        let rdo = response.status;
        console.log(rdo);
        
        switch(rdo) {
            case 200: {
                // Solicitud creada
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