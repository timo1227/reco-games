import { createContext, useState } from "react";

interface SuggestionGames {
  games: {
    description: string;
    name: string;
    reason: string;
  }[];
  setGames: React.Dispatch<React.SetStateAction<any>>;
}

export const SuggestionContext = createContext<SuggestionGames>(null!);

export default function SuggestionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [games, setGames] = useState<SuggestionGames["games"]>([]);

  return (
    <SuggestionContext.Provider
      value={{
        games,
        setGames,
      }}
    >
      {children}
    </SuggestionContext.Provider>
  );
}
