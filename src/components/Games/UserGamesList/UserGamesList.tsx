import { GamesType } from "Games";
import GameCard from "../GameCard/GameCard";

interface UserGamesListProps {
  gamesList: GamesType;
}

export default function UserGamesList({ gamesList }: UserGamesListProps) {
  return (
    <div className="dashboard-inner overflow-y-scroll w-full h-full scrollbar-hide dark:bg-[#121212]">
      <div className="game-cards flex flex-col md:flex-wrap sm:flex-row justify-center items-center sm:items-stretch md:justify-around">
        {gamesList.length === 0 && (
          <p className="font-bold w-full text-cent text-4xl">Add Games!</p>
        )}
        {gamesList.map((game) => (
          //@ts-ignore
          <GameCard key={game.appid} game={game} />
        ))}
      </div>
    </div>
  );
}
