const dashboardRoutes = require("./dashboard-routes");
const products = require("./products");
const productsCategoryRoutes = require("./products.category-route");
const roles= require("./roles");
const systemConfig = require("../../config/system");
module.exports = (app) =>{
    const ADMIN_URL = systemConfig.prefixAdmin;
    app.use(ADMIN_URL + "/dashboard", dashboardRoutes)
    app.use(ADMIN_URL + "/products", products)
    app.use(ADMIN_URL + "/products-category", productsCategoryRoutes)
    app.use(ADMIN_URL + "/roles", roles)
}   