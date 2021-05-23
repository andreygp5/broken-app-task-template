const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const signUp = async (req, res) => {
  try {
    const user = await User.create({
      full_name: req.body.user.full_name,
      username: req.body.user.username,
      passwordHash: bcrypt.hashSync(req.body.user.password, 10),
      email: req.body.user.email,
    });

    const token = jwt.sign({ id: user.id }, "lets_play_sum_games_man", {
      expiresIn: 60 * 60 * 24,
    });
    res.status(200).json({
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.user.username } });

    if (user) {
      bcrypt.compare(req.body.user.password, user.passwordHash, (err, matches) => {
        if (matches) {
          const token = jwt.sign({ id: user.id }, "lets_play_sum_games_man", {
            expiresIn: 60 * 60 * 24,
          });
          res.json({
            user: user,
            message: "Successfully authenticated",
            sessionToken: token,
          });
        } else {
          res.status(502).send({ error: "Passwords do not match" });
        }
      });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { signUp, signIn };
