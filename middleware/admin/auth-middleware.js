const systemConfig = require("../../config/system");
const Accounts = require("../../models/accounts-models");
const Roles = require("../../models/role.models");
module.exports.requireAuth = async (req, res, next) =>{
    if(!req.cookies.token){
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
    const user = await Accounts.findOne({
        deleted: false,
        token: req.cookies.token
    }).select("-password")
    if(!user){
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
        const role= await Roles.findOne({
            deleted: false,
            _id: user.role_id
        }).select("title permissions")
        res.locals.user = user
        res.locals.role = role
        next();
    }    
    
}