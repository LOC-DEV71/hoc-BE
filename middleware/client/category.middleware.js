const ProductCategory = require("../../models/products.category.model");
const createTreeHelper = require("../../helpers/create-tree");
module.exports.category = async (req, res, next) =>{
     const find ={
        deleted: false,
    }
    const productsCategory = await ProductCategory.find(find);
    const newProductsCategory = createTreeHelper.tree(productsCategory);

    res.locals.category = newProductsCategory;
    next();
}