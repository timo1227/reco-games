"use client";
import { useEffect, useState } from "react";
import { Games } from "Games";

interface SearchBarProps {
  steamGames: {
    appid: number;
    name: string;
  }[];

  gamesList: any[];
}

interface SelectedGames {
  appid: number;
  name: string;
}

export default function SearchBar({ steamGames, gamesList }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGames, setSelectedGames] = useState<SelectedGames[]>([]);

  const filteredGames =
    searchTerm.length >= 3
      ? steamGames.filter((game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmitButton = () => {
    gamesList.push(...selectedGames);
    setSelectedGames([]);
    setSearchTerm("");
    console.log(gamesList);
  };

  return (
    <div
      role="dialog"
      id="radix-:r5:"
      aria-describedby="radix-:r7:"
      aria-labelledby="radix-:r6:"
      data-state="open"
      aria-label="Search Command Menu"
      cmdk-dialog=""
      tabIndex={-1}
      className="overflow-x-hidden"
    >
      <div
        className="fixed bottom-0 top-1/4 rounded-t-lg overflow-y-auto pt-1 pb-2 bg-gray-0 mx-auto max-w-2xl w-full  md:top-1/4 md:left-1/2 md:-translate-x-1/2 md:rounded-lg md:border md:border-gray-300 md:dark:border-gray-500  md:bottom-auto"
        cmdk-root=""
      >
        <label htmlFor=":rag:" cmdk-label="" id=":raf:" className="hidden">
          Search Command Menu
        </label>
        <input
          className="py-4 px-4 w-full outline-none border-b dark:border-t rounded-t-lg border-gray-300 dark:border-gray-600 bg-transparent md:border-t-none dark:bg-black/20"
          placeholder="Search Games"
          cmdk-input=""
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          aria-autocomplete="list"
          role="combobox"
          aria-expanded="true"
          aria-controls=":rae:"
          aria-labelledby=":raf:"
          id=":rag:"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          aria-label="Submit"
          className="absolute hidden right-4 top-[26px] border border-gray-200 transition text-xs text-gray-400 px-1 rounded-[4px] h-[20px] font-medium hover:text-gray-500 hover:bg-green-400 md:block"
          tabIndex={-1}
          type="button"
          onClick={handleSubmitButton}
        >
          Submit
        </button>
        <div
          className="relative px-2 max-h-96"
          data-dirty-and-empty="false"
          data-fix-height="false"
          cmdk-list=""
          role="listbox"
          aria-label="Suggestions"
          id=":rb6:"
          aria-labelledby=":rb8:"
        >
          {filteredGames.length > 0
            ? filteredGames.map((game) => (
                <div
                  key={game.appid}
                  className="py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-black/10"
                  role="option"
                  id=":rah:"
                  aria-selected="false"
                >
                  <div
                    className="flex items-center justify-between overflow-x-hidden"
                    onClick={() => {
                      setSelectedGames([...selectedGames, game]);
                    }}
                  >
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          <span className="truncate">{game.name}</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {game.appid}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : searchTerm.length >= 3 && (
                <div className="text-center text-gray-500 dark:text-gray-400 p-4">
                  No games found.
                </div>
              )}
        </div>
      </div>
    </div>
  );
}
