const Product = require("../../models/products-models")
//[GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        // status: "active",
        // deleted: false
    }).sort({position: "desc"});


    const newProducts = products.map(item => {
        item.priceNew = item.price - (item.price*item.discountPercentage/100);
        return item;
    })
    res.render("client/pages/products/index", {
        title: "Danh sách sản phẩm",
        products: newProducts
    })
}

//[GET] /products/:slug
module.exports.detail = async (req, res) => {
    try {
        const slug = req.params.slug;
        const find ={
            slug: slug || "",
            status: "active",
            deleted: false
        }
        const products = await Product.findOne(find);

        const price = products.price.toLocaleString('vi-VN');


        res.render("client/pages/products/detail", {
            title: `Sản phẩm ${products.title}`,
            product: products,
            price: price,
            priceNew: (products.price - (products.price*products.discountPercentage/100)).toLocaleString('vi-VN')
        })
    } catch (error) {
        return res.redirect("/products");
    }
}


