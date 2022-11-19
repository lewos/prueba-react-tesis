// Users
const URL_API_users = "139.144.172.25:8080"; //https://otto.leocarmi.com
// Companies
const URL_API_companies = "139.144.172.25:8081";
// Requests
const URL_API_requests = "139.144.172.25:8082";
// Sales
const URL_API_sales = "139.144.172.25:8083";
// Sales
const URL_API_tokens = "139.144.172.25:8084";
// Client Inventory
const URL_API_ClientInventory = "139.144.172.25:8086";
// Inventory 
const URL_API_inventory = "139.144.172.25:8087";

const urlWebServices = {

    // Login and Signup
    login: URL_API_users + "/api/Users/login",
    signup: URL_API_users + "/api/Users",

    // User
    getUserById: URL_API_users + "/api/Users",
    getUserByCompanieIdAndRol: URL_API_users + "/api/Users/GetAllByCompanyId",
    updateAfterToken: URL_API_users + "/api/Users/UpdateAfterTokenUserCommand",

    // Operator
    getOperators: URL_API_users + "/api/Users/GetAllByCompanyId",
    newOperator: URL_API_users + "/api/Users/createuserasadmin",
    updateOperator: URL_API_users + "/api/Users",
    deleteOperator: URL_API_users + "/api/Users",

    // Companies
    getCompanie: URL_API_companies + "/api/companies",
    getCompanies: URL_API_companies + "/api/companies",
    getCompanieByName: URL_API_companies + "/api/companies/name",
    createCompanies: URL_API_companies + "/api/companies",

    // Orders
    getSales: URL_API_sales + "/api/companies",
    getOrdersFromACompany: URL_API_sales + "/api/order/company",
    takeOrder: URL_API_sales + "/api/order/company",
    printOrder: URL_API_sales + "/api/order/company",

    // Requests
    requestsToJoinCompanie: URL_API_requests + "/api/requests",
    getRequestByUser: URL_API_requests + "/api/requests/user",
    getRequestFromACompany: URL_API_requests + "/api/requests/company",
    acceptOrRejectRequest: URL_API_requests + "/api/requests",

    // Inventory
    getInventoryFromACompany: URL_API_inventory + "/api/stock/company",
    createProduct: URL_API_inventory + "/api/stock",
    updateProduct: URL_API_inventory + "/api/stock",
    deleteProduct: URL_API_inventory + "/api/stock",
    getStockByUserId: URL_API_inventory + "/api/stock/user",

    // Stock Requests
    createClientInventory: URL_API_ClientInventory + "/api/stockrequests",
    getStockRequest: URL_API_ClientInventory + "/api/stockrequests/user",
    getStockRequestFromACompany: URL_API_ClientInventory + "/api/stockrequests/company",
    acceptOrRejectRequestStockRequest: URL_API_ClientInventory + "/api/stockrequests",

    // Tokens
    getTokensByUserId: URL_API_tokens + "/api/MTokens/ByUserId",
}

export default urlWebServices;