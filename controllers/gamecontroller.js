const Game = require("../db").import("../models/game");
const User = require("../db").import("../models/user");

const getAllGames = async (req, res) => {
  try {
    const games = await Game.findAll({ where: { owner_id: req.user.id } });

    res.status(200).json({
      games: games,
      message: "Data fetched.",
    });
  } catch {
    res.status(500).json({
      message: "Data not found",
    });
  }
};

const getGameById = async (req, res) => {
  try {
    const game = await Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } });

    if (game) {
      res.status(200).json({
        game: game,
      });
    } else {
      res.status(500).json({
        message: "Data not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createGame = async (req, res) => {
  const userNotFoundHandler = () =>
    res.status(404).json({
      message: "User provided like owner not found",
    });

  try {
    const user = await User.findOne({ where: { id: req.body.user.id } });

    if (user) {
      const game = await Game.create({
        title: req.body.game.title,
        owner_id: req.body.user.id,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played,
      });
      res.status(200).json({
        game: game,
        message: "Game created.",
      });
    } else {
      userNotFoundHandler();
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateGame = async (req, res) => {
  try {
    const game = await Game.update(
      {
        title: req.body.game.title,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played,
      },
      {
        where: {
          id: req.params.id,
          owner_id: req.user.id,
        },
      }
    );

    res.status(200).json({
      game: game,
      message: "Successfully updated.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteGame = async (req, res) => {
  try {
    const game = await Game.destroy({
      where: {
        id: req.params.id,
        owner_id: req.user.id,
      },
    });

    if (game) {
      res.status(200).json({
        game: game,
        message: "Successfully deleted",
      });
    } else {
      res.status(404).json({
        message: "Game not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getAllGames, getGameById, createGame, updateGame, deleteGame };
