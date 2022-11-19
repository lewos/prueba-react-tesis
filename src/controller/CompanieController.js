import urlWebServices from './WebServices.js';

export const GetCompaniesById = async (id) => {
    //url webservices
    let URL_API = urlWebServices.getCompanie;

    try {
        const response = await fetch('http://' + URL_API + '/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        let rdo = response.status;
        let data = await response.json();

        switch(rdo) {
            case 200: {
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