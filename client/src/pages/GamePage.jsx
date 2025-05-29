import { useEffect } from "react";
import { useParams } from "react-router-dom";

const GamePage = () => {
  useEffect(() => {
    function handleMessage(event) {
      if (event.data?.type === "GAME_OVER") {
        const { score } = event.data;
        console.log(score);
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const { gameName } = useParams();

  return (
    <div>
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
