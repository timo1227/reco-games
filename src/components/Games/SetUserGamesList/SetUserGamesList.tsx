import SearchBar from "@/components/SearchBar/SearchBar";

import { GamesType } from "Games";

interface Props {
  gamesList: GamesType;
  gameID: string;
  steamGames: {
    appid: number;
    name: string;
  }[];
}

export default function SetUserGamesList({
  gamesList,
  steamGames,
  gameID,
}: Props) {
  return (
    <>
      <h1>Add your Games Below</h1>
      <SearchBar
        gameID={gameID}
        gamesList={gamesList}
        steamGames={steamGames}
      />
    </>
  );
}
