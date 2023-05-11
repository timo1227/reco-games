import { GamesType } from "Games";
import GameCard from "../GameCard/GameCard";
import GameCardHeader from "../GameCard/GameCardHeader";

interface UserGamesListProps {
  gamesList: GamesType;
  gameID: string;
  steamGames: {
    appid: number;
    name: string;
  }[];
}

export default function UserGamesList({
  gamesList,
  gameID,
  steamGames,
}: UserGamesListProps) {
  return (
    <div className="border border-red-500 py-5">
      <GameCardHeader />
      <ul>
        {gamesList.map((game) => (
          //@ts-ignore
          <GameCard key={game.appid} game={game} />
        ))}
      </ul>
    </div>
  );
}
