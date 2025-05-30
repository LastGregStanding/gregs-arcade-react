import {
  getTableStats,
  getGameStats,
  updateHighScore,
} from "../models/userModel.mjs";
import jwt from "jsonwebtoken";

const userTableStats = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const stats = await getTableStats(userId);
    res.json(stats);
  } catch (err) {
    console.error("Failed to get user stats:", err);
    res.status(500).json({ message: "Failed to retrieve stats" });
  }
};

const userGameStats = async (req, res) => {
  try {
    const token = req.cookies.token;

    // The game query is <gamename>-name
    // I need to grab only the first part of that query
    // which is <gamename>
    const gameNameParam = req.query.gameName;
    const gameName = gameNameParam.split("-")[0];

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const stats = await getGameStats(userId, gameName);
    res.json(stats);
  } catch (err) {
    console.error("Failed to get user stats:", err);
    res.status(500).json({ message: "Failed to retrieve stats" });
  }
};

const userNewHighScore = async (req, res) => {
  try {
    const token = req.cookies.token;

    // The game query is <gamename>-name
    // I need to grab only the first part of that query
    // which is <gamename>

    const gameNameParam = req.query.gameName;
    const gameName = gameNameParam.split("-")[0];
    const highScore = req.body.score;
    const playCount = req.body.playCount + 1;

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const stats = await updateHighScore(userId, gameName, highScore, playCount);
    res.json("Highscore updated!");
  } catch (err) {
    console.error("Failed to get user stats:", err);
    res.status(500).json({ message: "Failed to retrieve stats" });
  }
};

export { userTableStats, userGameStats, userNewHighScore };
