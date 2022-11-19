import urlWebServices from './WebServices.js';

export const GetOperators = async (companyId) => {
    //url webservices
    let URL_API = urlWebServices.getOperators;

    try {
        const response = await fetch('http://' + URL_API + '/' + companyId + '/' + "Rol" + '/' + "Operario", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        let rdo = response.status;

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok", data}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo recuperar la lista de operarios."});
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

export const NewOperator = async (name, lastName, pass, mail, rol, companyId) => {
    //url webservices
    let URL_API = urlWebServices.newOperator;

    let req = JSON.stringify({
        name: name,
        lastName: lastName,
        pass: pass,
        mail: mail,
        rol: rol,
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

        const json = await response.json();
        let rdo = response.status;

        switch(rdo) {
            case 201: {
                // Operario creado
                return ({rdo:201, mensaje:"Ok"}); // Correcto
            }
            case 409: {
                // Usuario invalido
                return ({rdo:409, mensaje:"El usuario ya existe."});
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

export const UpdateOperator = async (id, name, lastName, mail, pass, rol) => {
    //url webservices
    let URL_API = urlWebServices.updateOperator;

    let req = JSON.stringify({
        name: name,
        lastName: lastName,
        mail: mail,
        pass: pass,
        rol: rol
    })

    try {
        const response = await fetch('http://' + URL_API + '/' + id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        const json = await response.json();
        let rdo = response.status;

        switch(rdo) {
            case 200: {
                // Operario actualizado
                return ({rdo:200, mensaje:"Ok"}); // Correcto
            }
            case 409: {
                // Usuario invalido
                return ({rdo:409, mensaje:"No se pudo actualizar el operario."});
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

export const DeleteOperator = async (id) => {
    //url webservices
    let URL_API = urlWebServices.deleteOperator;

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
            case 400: {
                // Usuario invalido
                return ({rdo:400, mensaje:"No se pudo borrar el usuario."});
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