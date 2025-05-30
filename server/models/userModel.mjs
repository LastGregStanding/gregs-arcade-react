import pool from "../database/db-connector.mjs";

const getTableStats = async (userId) => {
  const [rows] = await pool
    .promise()
    .query("CALL GetUserTableStats(?)", [userId]);
  return rows[0];
};

const getGameStats = async (userId, gameName) => {
  const [rows] = await pool
    .promise()
    .query("CALL GetUserGameStats(?,?)", [userId, gameName]);
  console.log(rows[0]);
  return rows[0];
};

const updateHighScore = async (userId, gameName, highScore, playCount) => {
  const [rows] = await pool
    .promise()
    .query("CALL UpdateHighScore(?,?,?,?)", [
      userId,
      gameName,
      highScore,
      playCount,
    ]);
  console.log(rows[0]);
  return rows[0];
};

export { getTableStats, getGameStats, updateHighScore };
