import urlWebServices from './WebServices.js';

export const GetCompanieByName = async (companieName) => {
    //url webservices
    let URL_API = urlWebServices.getCompanieByName;

    try {
        const response = await fetch('http://' + URL_API + '/' + companieName, {
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
                return ({rdo:404, mensaje:"Fulfillment no encontrado"}); // No encontrado
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

export const CreateCompanie = async (name, cuit, owner, street, city, province, phone, email, createdByUserId) => {
    //url webservices
    let URL_API = urlWebServices.createCompanies;

    let req = JSON.stringify({
        name: name,
        cuit: cuit,
        owner: owner,
        street: street,
        city: city,
        province: province,
        phone: phone,
        email: email,
        createdByUserId: createdByUserId
    })

    console.log(createdByUserId);

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
                // Fulfillment creado
                return ({rdo:201, mensaje:"Ok"}); // Correcto
            }
            case 409: {
                // Error en la creacion
                return ({rdo:409, mensaje:"Error en la creación."});
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