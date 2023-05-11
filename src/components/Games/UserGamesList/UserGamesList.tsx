import { Games } from "Games";

export default function UserGamesList({ gamesList }: { gamesList: Games }) {
  return (
    <div>
      <h2>Games List</h2>
      <ul>
        {gamesList.map((game: any) => (
          <li key={game.appid}>
            <h3>{game.name}</h3>
            <p>{game.appid}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
