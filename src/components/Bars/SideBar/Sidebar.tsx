import { GamesType } from "Games";
import Header from "./componets/Header";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface SideBarProps {
  gamesList: GamesType;
  gameID: string;
  steamGames: {
    appid: number;
    name: string;
  }[];
}

export default function SideBar({
  gamesList,
  gameID,
  steamGames,
}: SideBarProps) {
  return (
    <div className="sticky left-0 bg-white dark:bg-[#181818] h-full w-[25rem]">
      <Header gamesList={gamesList} gameID={gameID} steamGames={steamGames} />
      <div className="mt-10">
        <Link
          href={`/Dashboard/Games/${gameID}`}
          className="flex items-center justify-between w-full px-4 py-2 text-left"
        >
          View Games
          <ChevronRightIcon className="w-5 h-5" />
        </Link>
        <Link
          href={`/Dashboard/Suggestions/${gameID}`}
          className="flex items-center justify-between w-full px-4 py-2 text-left"
        >
          Suggestions
          <ChevronRightIcon className="w-5 h-5" />
        </Link>
        {/* <Link
          href={"/"}
          className="flex items-center justify-between w-full px-4 py-2 text-left"
        >
          Profile
          <ChevronRightIcon className="w-5 h-5" />
        </Link> */}
      </div>
    </div>
  );
}
