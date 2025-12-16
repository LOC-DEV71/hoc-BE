const systemConfig = require("../../config/system");
const Accounts = require("../../models/accounts-models");
module.exports.requireAuth = async (req, res, next) =>{
    if(!req.cookies.token){
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
    const user = await Accounts.findOne({
        deleted: false,
        token: req.cookies.token
    })
    if(!user){
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
    next();
}