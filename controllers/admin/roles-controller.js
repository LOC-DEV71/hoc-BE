const roleSchema = require("../../models/role.models");
const systemConfig = require("../../config/system"); 
const generateSlug = require("../../helpers/slugHelper");

// [GET] admin/roles
module.exports.index = async (req, res) => {
    const roles = await roleSchema.find({
        deleted: false
    })
    res.render("admin/pages/roles/index", {
        title: "Nhóm quyền",
        roles: roles,
    })
}
// [GET] admin/roles/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create", {
        title: "Tạo nhóm quyền",
    })
}
// [POST] admin/roles/create
module.exports.createPost = async (req, res) => {
    const record = new roleSchema(req.body);
    await record.save();
    res.redirect(`/admin/roles`);
}

// [GET] admin/roles/edit/:id
module.exports.edit = async (req, res)=>{
    const id = req.params.id;
    const find = {
        deleted: false,
        _id: id
    }
    const roles = await roleSchema.findOne(find);
    res.render("admin/pages/roles/edit", {
        title: "Chỉnh sửa nhóm quyền",
        roles: roles
    })
}
// [PATCH] admin/roles/edit/:id
module.exports.editPatch = async (req, res)=>{
    const id = req.params.id;

    await roleSchema.updateOne({_id: id}, req.body)
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

// [GET] admin/roles/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const find = {
        deleted: false,
        _id: id
    }
    const roles  = await roleSchema.findOne(find);
    res.render("admin/pages/roles/detail", {
        title: "Chi tiết Nhóm quyền",
        roles: roles
    })
}
// [DELETE] admin/roles/detail/:id
module.exports.deleteRoles = async (req, res) => {
    const id = req.params.id;

    await roleSchema.updateOne(
        {_id: id}, 
        {
            deleted: true, 
            deletedAt: Date()
        }
    )

    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

// [GET] admin/roles/permission
module.exports.permission = async (req, res) =>{
    const find = {
        deleted: false,
    }
    const record = await roleSchema.find(find);
    res.render("admin/pages/roles/permission", {
        title: "Phân quyền",
        record: record
    })
}
// [PATCH] admin/roles/permission
module.exports.permissionPatch = async (req, res) => {
  try {
    const permission = JSON.parse(req.body.permission || "[]");

    for (const item of permission) {
      await roleSchema.updateOne(
        { _id: item.id },
        { permissions: item.permission }
      );
    }

    req.flash("success", "Cập nhật phân quyền thành công");
    return res.redirect("/admin/roles/permission");
  } catch (error) {
    req.flash("error", "Cập nhật phân quyền thất bại");
    return res.redirect("/admin/roles/permission");
  }
};

