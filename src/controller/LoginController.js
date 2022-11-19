import urlWebServices from './WebServices.js';

export const Login = async (mail, pass) => {
    //url webservices
    let URL_API = urlWebServices.login;

    let req = JSON.stringify({
        mail: mail,
        pass: pass
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

        switch(rdo) {
            case 201: {
                // Guardo usuario logueado
                const json = await response.json();
                let user = json;
                localStorage.setItem("usuarioId",user.id);
                localStorage.setItem("nombre",user.name);
                localStorage.setItem("apellido",user.lastName);
                localStorage.setItem("rol",user.rol);
                localStorage.setItem("email",user.mail);
                localStorage.setItem("tUserId",user.tUserId);
                localStorage.setItem("mUserId",user.mUserId);
                if ( user.companyId ) {
                    localStorage.setItem("companyId",user.companyId);
                }
                localStorage.setItem("usuarioValido", true);
                return ({rdo:201, mensaje:"Ok", data: json}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:401, mensaje:"El usuario ingresado no existe en nuestra base."});
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

export const Signup = async (name, lastName, pass, mail, rol) => {
    //url webservices
    let URL_API = urlWebServices.signup;

    let req = JSON.stringify({
        name: name,
        lastName: lastName,
        pass: pass,
        mail: mail,
        rol: rol
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
                // Guardo usuario logueado
                return ({rdo:201, mensaje:"Ok"}); // Correcto
            }
            case 401: {
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