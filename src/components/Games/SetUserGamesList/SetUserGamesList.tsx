import SearchBar from "@/components/SearchBar/SearchBar";

import { Games } from "Games";

interface Props {
  gamesList: Games;
  steamGames: {
    appid: number;
    name: string;
  }[];
}

export default function SetUserGamesList({ gamesList, steamGames }: Props) {
  return (
    <>
      <h1>Add your Games Below</h1>
      <SearchBar gamesList={gamesList} steamGames={steamGames} />
    </>
  );
}
