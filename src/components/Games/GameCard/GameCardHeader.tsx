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

export default function GameCardHeader({
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
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Your Games</h2>
        {isMobile ? (
          <SearchIcon />
        ) : (
          <button
            className="dark:bg-black/60 bg-white hover:cursor-pointer text-black dark:text-white py-2 px-4 rounded border-2 border-black hover:bg-slate-200 dark:border-white dark:hover:bg-black/50 transition"
            onClick={() => setToggleSearchBar(!toggleSearchBar)}
          >
            <BiSearchAlt2 className="inline-block mr-5" />
            Search Game
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
