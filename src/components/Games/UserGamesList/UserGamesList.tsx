import { GamesType } from "Games";
import GameCard from "../GameCard/GameCard";

export default function UserGamesList({ gamesList }: { gamesList: GamesType }) {
  return (
    <div>
      <h2>Games</h2>
      <ul>
        {gamesList.map((game) => (
          //@ts-ignore
          <GameCard key={game.appid} game={game} />
        ))}
      </ul>
    </div>
  );
}
