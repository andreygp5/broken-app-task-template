require("dotenv").config();
const express = require("express");

const db = require("./db");
const userRouter = require("./controllers/usercontroller");
const gameRouter = require("./controllers/gamecontroller");

const app = express();

db.sync();

app.use(express.json());
app.use(require("./middleware/validate-session"));

app.use("/api/auth", userRouter);
app.use("/api/game", gameRouter);

app.listen(process.env.APP_PORT, function () {
  console.log(`App is listening on ${process.env.APP_PORT}`);
});
