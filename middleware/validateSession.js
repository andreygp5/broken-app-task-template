const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  if (req.method == "OPTIONS") {
    next(); // allowing options as a method for request
  } else {
    const sessionToken = req.headers.authorization;
    console.log(sessionToken);

    if (!sessionToken) {
      return res.status(403).send({ auth: false, message: "No token provided" });
    } else {
      jwt.verify(sessionToken, "lets_play_sum_games_man", async (err, decoded) => {
        if (decoded) {
          try {
            const user = await User.findOne({ where: { id: decoded.id } });

            req.user = user;
            console.log(`user: ${user}`);

            next();
          } catch {
            res.status(401).send({ error: "Not authorized" });
          }
        } else {
          res.status(403).send({ error: "Forbidden" });
        }
      });
    }
  }
};
