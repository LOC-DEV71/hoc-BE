const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/products-controllers");
const multer = require("multer");
const upload = multer();
const validate = require("../../validates/admin/productsValidates");
const uploadCloud = require("../../middleware/admin/uploadCloud-middleware");

router.get("/", controller.products);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);
router.get("/create", controller.create);
router.post(
    "/create", 
    upload.single("thumbnail"),
    validate.createPost,
    uploadCloud.streamUpload,
    controller.createPost
);

router.get("/edit/:id", controller.edit);
router.patch(
    "/edit/:id", 
    upload.single("thumbnail"),
    validate.createPost,
    uploadCloud.streamUpload, 
    controller.editPatch
);

router.get("/detail/:id", controller.detail);

module.exports = router;


router.get("/detail/:id", controller.detail);

module.exports = router;
