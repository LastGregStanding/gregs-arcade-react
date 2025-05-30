import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GamePage = () => {
  const { gameName } = useParams();
  const [stats, setStats] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    // Fetch user highscore for the specific game
    axios
      .get(`http://localhost:5150/api/user/game-stats?gameName=${gameName}`, {
        withCredentials: true,
      })
      .then((res) => {
        setStats(res.data[0]);
      })
      .catch((err) => {
        console.error("Failed to fetch user stats:", err);
      });
  }, [gameName]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "GAME_OVER" && event.data?.game === "Snake") {
        setScore(event.data.score);
        // Game over, send data to database
        axios
          .post(
            `http://localhost:5150/api/user/new-highscore?gameName=${gameName}`,
            {
              gameName,
              playCount: stats.play_count,
              score: event.data.score,
            },
            { withCredentials: true }
          )
          .then(() => {
            console.log("Score submitted successfully");
          })
          .catch((err) => {
            console.error("Failed to submit score:", err);
          });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [gameName, stats, score]);

  return (
    <div>
      <h3>
        Your HighScore: {stats.high_score === null ? "N/A" : stats.high_score}
      </h3>
      <iframe
        src={`/games/${gameName}/index.html`}
        title={gameName}
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
        }}
      />
    </div>
  );
};

export default GamePage;
