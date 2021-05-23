const router = require("express").Router();
const controller = require("../controllers/userController");

router.post("/signup", controller.signUp);
router.post("/signin", controller.signIn);

module.exports = router;
