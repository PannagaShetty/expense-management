const { Router } = require("express");
const controller = require("../controller/users_controller");
const authorizeUser = require("../middleware/authorize_user");
const router = Router();

router.post("/login", controller.login);
router.post("/signup", controller.signup);

router.get("/me", authorizeUser, controller.getCurrentUser);

module.exports = router;
