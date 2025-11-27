const dashboardRoutes = require("./dashboard-routes");
const products = require("./products");
const systemConfig = require("../../config/system");
module.exports = (app) =>{
    const ADMIN_URL = systemConfig.prefixAdmin;
    app.use(ADMIN_URL + "/dashboard", dashboardRoutes)
    app.use(ADMIN_URL + "/products", products)
}