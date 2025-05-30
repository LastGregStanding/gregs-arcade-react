import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserStatsRow from "./UserStatsRow";
import { AuthContext } from "../context/AuthProvider";

const UserStatsTable = () => {
  // const [stats, setStats] = useState(null);
  // const [username, setUsername] = useState("");
  const [stats, setStats] = useState([]);
  const { username } = useContext(AuthContext);
  // if (stats) {
  //   const favoriteGame = stats.reduce((max, game) =>
  //     game.play_count > max.play_count ? game : max
  //   );
  //   console.log("Your favorite game: ", favoriteGame);
  // }

  useEffect(() => {
    // Fetch user info (username from JWT)
    // axios
    //   .get("http://localhost:5150/api/auth/me", { withCredentials: true })
    //   .then((res) => {
    //     setUsername(res.data.user.username);
    //   })
    //   .catch((err) => {
    //     console.error("Failed to fetch username:", err);
    //   });

    // Fetch user stats
    axios
      .get("http://localhost:5150/api/user/table-stats", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("The stats: ", res.data);
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user stats:", err);
      });
  }, []);

  return (
    <div>
      <div className="user-stats-container">
        <h1>{username ? `${username}'s Stats` : "Loading..."}</h1>

        {/* Example static data — replace with real stats when ready */}
        <div className="user-stats">
          <div className="user-stats-info-style">
            <h2>
              Account Created Date:{" "}
              {stats.length > 0
                ? new Date(stats[0].account_created_at).toLocaleDateString()
                : null}
            </h2>
          </div>
          <div className="user-stats-info-style">
            <h2>
              Favorite Game:{" "}
              {stats.length > 0 &&
                stats.reduce((max, game) =>
                  game.play_count > max.play_count ? game : max
                ).game_name}
            </h2>
          </div>
        </div>

        <table className="user-stats-game-table">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Game</th>
              <th style={{ width: "30%" }}>Times Played</th>
              <th style={{ width: "30%" }}>Highscore</th>
              <th style={{ width: "15%" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => (
              <UserStatsRow
                key={index}
                gameName={stat.game_name}
                highScore={stat.high_score}
                playCount={stat.play_count}
                date={stat.high_score_date}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserStatsTable;
