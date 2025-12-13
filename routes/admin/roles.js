const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/roles-controller");
const validate = require("../../validates/admin/rolesValidates")
router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
    "/create", 
    validate.createPost,
    controller.createPost,
);
router.get("/edit/:id", controller.edit)
router.patch("/edit/:id", controller.editPatch);
router.get("/detail/:id", controller.detail);
router.delete("/delete/:id", controller.deleteRoles);
router.get("/permission", controller.permission)
router.patch("/permission", controller.permissionPatch)
module.exports = router;