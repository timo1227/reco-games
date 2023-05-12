"use client";
import { useEffect, useState } from "react";
import { GamesType } from "Games";
import SearchBar from "@/components/SearchBar/SearchBar";
import { BiSearchAlt2 } from "react-icons/bi";

interface GameCardHeaderProps {
  gamesList: GamesType;
  gameID: string;
  steamGames: {
    appid: number;
    name: string;
  }[];
}

export default function Header({
  gamesList,
  gameID,
  steamGames,
}: GameCardHeaderProps) {
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setToggleSearchBar(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Initial check for mobile
    setIsMobile(window.innerWidth < 768);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const SearchIcon = () => {
    return (
      <BiSearchAlt2
        className="text-xl text-black dark:text-white cursor-pointer"
        onClick={() => setToggleSearchBar(!toggleSearchBar)}
      />
    );
  };

  return (
    <>
      <div className="flex items-center w-full">
        {isMobile ? (
          <SearchIcon />
        ) : (
          <button
            className="dark:bg-black/60 bg-gray-200/80 hover:cursor-text text-black dark:text-white py-1 px-2 rounded border-2 border-black hover:bg-slate-200 dark:border-white dark:hover:bg-black/50 transition mt-2 w-full mx-3 text-left"
            onClick={() => setToggleSearchBar(!toggleSearchBar)}
          >
            <BiSearchAlt2 className="inline-block mr-2" />
            Search Game...
          </button>
        )}
      </div>
      {toggleSearchBar && (
        <div className="fixed h-full w-full bg-[#fffffff1] dark:bg-[#181818f1] top-0 left-0 z-55">
          <SearchBar
            gamesList={gamesList}
            gameID={gameID}
            steamGames={steamGames}
          />
        </div>
      )}
    </>
  );
}
