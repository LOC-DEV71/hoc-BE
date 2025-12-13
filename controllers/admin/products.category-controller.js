const ProductCategorySchema = require("../../models/products.category.model");
const systemConfig = require("../../config/system"); 
const generateSlug = require("../../helpers/slugHelper");
const createTreeHelper = require("../../helpers/create-tree");

module.exports.index = async (req, res) => {
    const find ={
        deleted: false,
    }

    const records = await ProductCategorySchema.find(find);
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/products-category/products-category", {
        title: "Danh mục sản phẩm",
        category: newRecords
    });

}
module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    }


    const records = await ProductCategorySchema.find(find);
    const newRecords = createTreeHelper.tree(records);


    res.render("admin/pages/products-category/create-category", {
        title: "Tạo danh mục sản phẩm",
        category: newRecords
    });
}
module.exports.createPost = async (req, res) => {
    req.body.slug = generateSlug(req.body.title);
    const count = await ProductCategorySchema.countDocuments();
    if(req.body.position === ""){
        req.body.position = count + 1;
    } else{
        req.body.position = parseInt(req.body.position)
    }


    const record = new ProductCategorySchema(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/products-category`);   
}
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const find = {
        deleted: false,
        _id: id
    }

    const data = await ProductCategorySchema.findById(find);

    const records = await ProductCategorySchema.find({
        deleted: false
    })

    const newRecords = createTreeHelper.tree(records);


    res.render("admin/pages/products-category/edit-category", {
        title: "Chỉnh sửa danh mục sản phẩm",   
        data: data,
        records: newRecords
    })
}

module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    try {
        req.body.position = parseInt(req.body.position);

        await ProductCategorySchema.updateOne({_id: id}, req.body); 

        return res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    } catch (error) {
        req.flash("error", "update thất bại");
        return res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
}