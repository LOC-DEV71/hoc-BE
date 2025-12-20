const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/my-account-controller");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,  // 10MB cho file
    fieldSize: 10 * 1024 * 1024  // 10MB cho nội dung text form
  }
});
const uploadCloud = require("../../middleware/admin/uploadCloud-middleware");
router.get(
    "/",
    controller.index
)
router.get(
    "/edit/:id",
    controller.edit
)
router.patch(
    "/edit/:id",
    upload.single("avatar"),
    uploadCloud.streamUpload,
    controller.editPatch
)

module.exports = router;