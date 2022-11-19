import urlWebServices from './WebServices.js';

export const GetTokensByUserId = async (userId) => {
    //url webservices
    let URL_API = urlWebServices.getTokensByUserId;

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