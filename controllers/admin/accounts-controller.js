const Account = require("../../models/accounts-models");
const Roles = require("../../models/role.models");
const md5 = require("md5")
const systemConfig = require("../../config/system");
// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  const find ={
    deleted: false,
  }
  const record = await Account.find(find).select("-password -token");
  for (const item of record) {
    const role = await Roles.findOne({
      deleted: false,
      _id: item.role_id
    })
    item.role = role;
  }
  res.render("admin/pages/accounts/index", {
    title: "Trang danh sách tài khoản",
    record: record,
  })
}
// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
  }
  const roles = await Roles.find(find)
  res.render("admin/pages/accounts/create", {
      title: "Tạo tài khoản",
      roles: roles
  })
}

// [Post] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  try {
    const emailExist = await Account.findOne({
      deleted: false,
      email: req.body.email
    })

    if(emailExist){
      req.flash("error",`Email ${emailExist.email} đã tồn tại!`)
      return res.redirect("/admin/accounts/create");
    } 

    req.body.password = md5(req.body.password);

    const record = new Account(req.body);
    await record.save();

    req.flash("success", "Tạo tài khoản thành công");
    return res.redirect("/admin/accounts");
    
  } catch (error) {
    console.error(error);
    req.flash("error", "Tạo tài khoản thất bại");
    return res.redirect("/admin/accounts/create");
  }
};

// [GET] /admin/accounts/edit
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const find = {
    deleted: false,
  }
  const roles = await Roles.find(find)
  const accounts = await Account.findById({
    deleted: false,
    _id: id 
  })
  res.render("admin/pages/accounts/edit", {
      title: "Tạo tài khoản",
      roles: roles,
      accounts: accounts
  })
}
// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const emailExist = await Account.findOne({
      deleted: false,
      email: req.body.email,
      _id: {$ne: id}
    })

    if(emailExist){
      req.flash("error",`Email ${emailExist.email} đã tồn tại!`)
      return res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${id}`);
    } 
    else {

      if(req.body.password){
        req.body.password = md5(req.body.password)
      }else{
        delete req.body.password;
      }

      await Account.updateOne({_id: id}, req.body)

      req.flash("success", "Cập nhật tài khoản thành công");
      return res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${id}`);
    }
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!")
    return res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${id}`);
  }
}


module.exports.delete = async (req, res) => {
  const id = req.params.id;

  await Account.updateOne(
    {_id: id},
    {
      deleted: true,
      deletedAt: new Date()
    }
  )
  return res.redirect(`${systemConfig.prefixAdmin}/accounts`)
}