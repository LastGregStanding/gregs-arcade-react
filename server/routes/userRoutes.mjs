import express from "express";
import {
  userTableStats,
  userGameStats,
  userNewHighScore,
} from "../controllers/userController.mjs";

const router = express.Router();

router.get("/table-stats", userTableStats);
router.get("/game-stats", userGameStats);
router.post("/new-highscore", userNewHighScore);

export default router;
