const Account = require("../../models/accounts-models");
const Roles = require("../../models/role.models");
const md5 = require("md5")
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) =>{
    const id = res.locals.user.id;
    const accounts = await Account.findById({
        deleted: false,
        _id: id 
    })


    const roles = await Roles.findOne({
        deleted: false,
        _id: accounts.role_id
    })


    res.render("admin/pages/my-account/index", {
        title: "Thông tin của tôi",
        roleMe: roles.title,
        account: accounts
    })
}


// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
  const id = res.locals.user.id;
  const accounts = await Account.findById({
    deleted: false,
    _id: id 
  })
  res.render("admin/pages/my-account/edit", {
      title: "Cập nhật tài khoản",
      account: accounts
  })
}
// [PATCH] /admin/my-account/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = res.locals.user.id;
    const emailExist = await Account.findOne({
      deleted: false,
      email: req.body.email,
      _id: {$ne: id}
    })

    if(emailExist){
      req.flash("error",`Email ${emailExist.email} đã tồn tại!`)
      return res.redirect(`${systemConfig.prefixAdmin}/my-account/edit/${id}`);
    } 
    else {

      if(req.body.password){
        req.body.password = md5(req.body.password)
      }else{
        delete req.body.password;
      }

      await Account.updateOne({_id: id}, req.body)

      req.flash("success", "Cập nhật tài khoản thành công");
      return res.redirect(`${systemConfig.prefixAdmin}/my-account/edit/${id}`);
    }
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!")
    return res.redirect(`${systemConfig.prefixAdmin}/my-account/edit/${id}`);
  }
}
