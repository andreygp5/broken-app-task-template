const router = require("express").Router();
const controller = require("../controllers/gameController");

router.get("/all", controller.getAllGames);
router.get("/:id", controller.getGameById);
router.post("/create", controller.createGame);
router.put("/update/:id", controller.updateGame);
router.delete("/remove/:id", controller.deleteGame);

module.exports = router;
