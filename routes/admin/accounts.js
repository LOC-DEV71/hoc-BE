const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/accounts-controller");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,  // 10MB cho file
    fieldSize: 10 * 1024 * 1024  // 10MB cho nội dung text form
  }
});
const uploadCloud = require("../../middleware/admin/uploadCloud-middleware");
const validate = require("../../validates/admin/accountsValidates");

router.get("/", controller.index)
router.get("/create", controller.create
)
router.post(
    "/create", 
    upload.single("avatar"),
    uploadCloud.streamUpload,
    validate.createPost,
    controller.createPost
)

router.get(
  "/edit/:id",
  controller.edit
)
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadCloud.streamUpload,
  validate.editPatch,
  controller.editPatch
)

router.delete(
  "/delete/:id",
  controller.delete,
)

module.exports = router;