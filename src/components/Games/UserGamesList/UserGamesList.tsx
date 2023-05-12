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
    <div className="dashboard-inner mt-5">
      <GameCardHeader
        gamesList={gamesList}
        gameID={gameID}
        steamGames={steamGames}
      />
      <div className="game-cards pt-10 flex flex-col md:flex-wrap sm:flex-row justify-center items-center sm:items-stretch md:justify-between">
        {gamesList.map((game) => (
          //@ts-ignore
          <GameCard key={game.appid} game={game} />
        ))}
      </div>
    </div>
  );
}
