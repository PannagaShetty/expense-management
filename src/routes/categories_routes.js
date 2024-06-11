const { Router } = require("express");
const controller = require("../controller/categories_controller");
const authorizeUser = require("../middleware/authorize_user");
const router = Router();

router.get("/", authorizeUser, controller.getAllCategories);
router.get("/:id", authorizeUser, controller.getCategoryById);
router.post("/", authorizeUser, controller.addCategory);
router.put("/:id", authorizeUser, controller.updateCategory);
router.delete("/:id", authorizeUser, controller.deleteCategory);
module.exports = router;
