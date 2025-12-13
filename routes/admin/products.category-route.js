const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/products.category-controller");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middleware/admin/uploadCloud-middleware");
const validate = require("../../validates/admin/productsCategoryValidates");
router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
    "/create", 
    upload.single("thumbnail"),
    validate.createPost,
    uploadCloud.streamUpload,
    controller.createPost
);

router.get("/edit/:id", controller.edit)
router.patch(
    "/edit/:id", 
    upload.single("thumbnail"),
    validate.createPost,
    uploadCloud.streamUpload,
    controller.editPatch
);
module.exports = router;
