const productsRoutes = require("./products-routes");
const homeRoutes = require("./home-routes");
const categoryMiddleware = require("../../middleware/client/category.middleware");
module.exports = (app) => {
    app.use(categoryMiddleware.category);

    app.use(
        "/", 
         homeRoutes
    );
    
    app.use(
        "/products", 
        productsRoutes
    );
    
}




