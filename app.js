require("dotenv").config();
const express = require("express");

const db = require("./db");
const userRouter = require("./routers/userRouter");
const gameRouter = require("./routers/gameRouter");

const app = express();

db.sync();

app.use(express.json());

app.use("/api/auth", userRouter);

app.use(require("./middleware/validateSession"));
app.use("/api/game", gameRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`App is listening on ${process.env.APP_PORT}`);
});
