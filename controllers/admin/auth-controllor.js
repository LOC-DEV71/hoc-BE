const Accounts = require("../../models/accounts-models");
const md5 = require("md5");
const systemConfig = require("../../config/system");
module.exports.login = async (req, res) => {
    if(req.cookies.token){
        return res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
    } else{
        res.render("admin/pages/auth/login", {
            title: "Trang đăng nhập"
        })
    }
    
}
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Accounts.findOne({
        deleted: false,
        email: email
    });
    if(!user){
        req.flash("error", `Email ${email} không tồn tại`)
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }

    if(user.status === "unactive"){
        req.flash("error", `Tài khoản của bạn đã bị khóa!`)
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }

    if(md5(password) !== user.password){
        req.flash("error", `Mật khẩu không chính xác`)
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }

    res.cookie("token", user.token, {
        httpOnly: false,        // để TEST → nhìn thấy liền
        path: "/",              // áp dụng toàn site
    });

    return res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}

module.exports.logout = async (req, res) => {
    res.clearCookie("token")
    return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}