const dashboardRoutes = require("./dashboard-routes");
const products = require("./products");
const productsCategoryRoutes = require("./products.category-route");
const roles= require("./roles");
const accounts = require("./accounts")
const authRoutes = require("./auth-routes")
const systemConfig = require("../../config/system");
const middlewareAuth = require("../../middleware/admin/auth-middleware");
module.exports = (app) =>{
    const ADMIN_URL = systemConfig.prefixAdmin;
    app.use(
        ADMIN_URL + "/dashboard", 
        middlewareAuth.requireAuth,
        dashboardRoutes
    )
    app.use(
        ADMIN_URL + "/products", 
        middlewareAuth.requireAuth,
        products
    )
    app.use(
        ADMIN_URL + "/products-category", 
        middlewareAuth.requireAuth,
        productsCategoryRoutes)
    app.use(
        ADMIN_URL + "/roles", 
        middlewareAuth.requireAuth,
        roles)
    app.use(
        ADMIN_URL + "/accounts", 
        middlewareAuth.requireAuth,
        accounts)
    app.use(
        ADMIN_URL + "/auth", 
        authRoutes
    )
}   