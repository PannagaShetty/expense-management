const { Router } = require("express");
const controller = require("../controller/users_controller");
const router = Router();

router.post("/login", controller.login);
router.post("/signup", controller.signup);

module.exports = router;
