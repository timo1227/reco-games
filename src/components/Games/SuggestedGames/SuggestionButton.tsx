import { useState, useContext } from "react";
import { SuggestionContext } from "@/context/SuggestContext";

export default function SuggestionsButton({ gameID }: { gameID: string }) {
  const [islLoading, setIsLoading] = useState(false);
  const { setGames } = useContext(SuggestionContext);

  const hadnleSuggestionsClick = () => {
    const getSuggestions = async () => {
      if (islLoading) return;
      setIsLoading(true);
      const res = await fetch("/api/openAi", {
        method: "POST",
        body: JSON.stringify({
          gameID,
        }),
      });
      const data = await res.json();
      setIsLoading(false);
      if (res.ok) {
        setGames(data.games);
      }
    };
    getSuggestions();
  };

  return (
    <div className="flex justify-center">
      <button
        className="dark:bg-black/60 bg-white hover:cursor-pointer text-black dark:text-white py-2 px-4 rounded border-2 border-black hover:bg-slate-200 dark:border-white dark:hover:bg-black/50 transition"
        onClick={() => hadnleSuggestionsClick()}
      >
        {islLoading ? "Loading..." : "Get Suggestions"}
      </button>
    </div>
  );
}
