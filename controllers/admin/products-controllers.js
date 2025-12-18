const Product = require("../../models/products-models");
const ProductCategorySchema = require("../../models/products.category.model");
const Accounts = require("../../models/accounts-models");
const fillterStatusHelper = require("../../helpers/fillterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const generateSlug = require("../../helpers/slugHelper");
const createTreeHelper = require("../../helpers/create-tree");
const dateHelper = require("../../helpers/dateHelper");

//[GET] /admin/products
module.exports.products = async (req, res) => {
    let find = {
        deleted: false,
    };


    // Lọc trạng thái
    const fillterStatus = fillterStatusHelper(req.query);
    if(req.query.status){
        find.status = req.query.status;
    }
    // end lọc trạng thái




    // Tìm kiếm
    const search = searchHelper(req.query);

    if(search.regex){
        find.title = search.regex;
    }
    // End Tìm kiếm




    // pagination

    const countProducts = await Product.countDocuments(find);

    let objectPagination = await paginationHelper( 
        {
            currentPage: Number(req.query.page) || 1,
            limitItem: 5,
        },
        req.query,
        countProducts
    )

    

    // end pagination


    // sort
    const sort = {}

    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }else{
        sort.position = "desc";
    } 
    // end sort


    try {
        const products = await Product
            .find(find)
            .sort(sort)
            .limit(objectPagination.limitItem)
            .skip(objectPagination.skip);
        // console.log(products);
        res.render("admin/pages/products/index", {
            title: "Trang quản lý sản phẩm",
            products: products,
            fillterStatus: fillterStatus,
            keyword: search.keyword,
            pagination: objectPagination
        });
    } catch (error) {
        console.error('Error loading admin products:', error);
        res.status(500).send('Lỗi khi tải danh sách sản phẩm');
    }
}

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) =>{
    const status = req.params.status;
    const id = req.params.id;

    const updatedBy = {
        account_id: res.locals.user._id,
        updatedAt: new Date()
    };
    await Product.updateOne(
        {_id: id}, 
        {// Mục đích cái này nhằm tạo ra nhiều object những user đã sửa
            $set: {status: status},
            $push: { updatedBy }
        })
    

    req.flash("success", `Cập nhật thành công trạng thái ${status}`)

    res.redirect("/admin/products")
}


//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) =>{
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    const updatedBy = {
        account_id: res.locals.user._id,
        updatedAt: new Date()
    };

    switch (type) {
        case "active":
            await Product.updateMany(
                {_id: {$in: ids}}, 
                {
                    // Mục đích cái này nhằm tạo ra nhiều object những user đã sửa
                    $set: {status: "active"},
                    $push: { updatedBy }
                }
            );
            req.flash("success", "Cập nhật còn hàng thành công!");
            break;

        case "unactive":
            await Product.updateMany(
                {_id: {$in: ids}}, 
                {
                    // Mục đích cái này nhằm tạo ra nhiều object những user đã sửa
                    $set: {status: "unactive"},
                    $push: { updatedBy }
                }
            );
            req.flash("success", "Cập nhật hết hàng thành công!");
            break;

        case "delete-all":
            await Product.updateMany(
                {_id: {$in: ids}}, 
                {
                    deleted: true, 
                    deletedBy:{
                        account_id: res.locals.user.id,
                        deletedAt: new Date()
                    }
                }
            );
            req.flash("success", "Xóa thành công!");
            break;

        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);

                await Product.updateOne(
                    { _id: id },
                    { 
                        // Mục đích cái này nhằm tạo ra nhiều object những user đã sửa
                        $set: {position: position},
                        $push: { updatedBy }
                     }
                );
            }
            req.flash("success", "Cập nhật vị trí thành công!");
            break;

        default:
            req.flash("error", "Hành động không hợp lệ!");
            break;
    }

    res.redirect("/admin/products");
}



//[DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) =>{
    const id = req.params.id;

    await Product.updateOne(
        { _id: id },
        {
            deleted: true,
            deletedBy:{
                account_id: res.locals.user.id,
                deletedAt: new Date()
            }
        }
    );

    res.redirect("/admin/products");
}


//[GET] /admin/products/create
module.exports.create = async (req, res) =>{
    const find ={
        deleted: false
    }
    const category = await ProductCategorySchema.find(find);
    const newCategory = createTreeHelper.tree(category);
    res.render("admin/pages/products/create", {
        title: "Thêm sản phẩm mới",
        category: newCategory
    })
}


//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.slug = generateSlug(req.body.title);

    if(req.body.position === ""){
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    } else{
        req.body.position = parseInt(req.body.position)
    }

    req.body.createdBy = {
        account_id: res.locals.user.id
    }

    const products = new Product(req.body);
    await products.save();


    res.redirect("/admin/products");
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
   try {
    const find = {
        deleted: false,
        _id: req.params.id
    };
    const category = await ProductCategorySchema.find({
        deleted: false
    });
    const products = await Product.findOne(find);
        const newCategory = createTreeHelper.tree(category);
    res.render("admin/pages/products/edit", {
        title: "Chỉnh sửa sản phẩm",
        products: products,
        category: newCategory
    });
   } catch (error) {
    res.redirect("/admin/products");
   }
};

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    
    if (req.body.title) {
        req.body.slug = generateSlug(req.body.title);
    }

    try {

        const updatedBy = {
            account_id: res.locals.user._id,
            updatedAt: new Date()
        };

        await Product.updateOne(
            { _id: id },
            {
                // Mục đích cái này nhằm tạo ra nhiều object những user đã sửa
                $set: req.body,
                $push: { updatedBy }
            }
        );


        req.flash("success", "Cập nhật sản phẩm thành công!");
        return res.redirect("/admin/products");

    } catch (error) {
        req.flash("error", "Có lỗi xảy ra khi cập nhật!");
        return res.redirect("/admin/products");
    }
};


// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;

    const find = {
        deleted: false,
        _id: id
    }

    const products = await Product.findOne(find);
        
    
    // Lấy ra thông tin người tạo
    const userCreate = await Accounts.findOne({
        _id: products.createdBy.account_id
    })

    
    const productObj = products.toObject();
    if(userCreate){
        productObj.fullname = userCreate.fullname;
    }

    //Danh sách người sửa
    const updateList = products.updatedBy.map(item => ({
        userId: item.account_id,
        time: new Date(item.updatedAt).toLocaleString("vi-VN")
    }));

    const userList = await Accounts.find().select("id fullname");
 

    const userUpdateList = [];

    for (const item of updateList) {
        const user = userList.find(
            u => u._id.toString() === item.userId
        );

        if (user) {
            userUpdateList.push({
                id: user._id,
                fullname: user.fullname,
                time: item.time
            });
        }
    }



    res.render("admin/pages/products/detail", {
        title: "Chi tiết sản phẩm",
        product: productObj,
        createFormatDate: dateHelper.formatDate(products.createdBy.createAt),
        updateFormatDate: userUpdateList
    })
}
   