import useSuggestionContext from "@/hooks/useSuggestionContext";
import SuggestionsButton from "./SuggestionButton";
import { useEffect, useId } from "react";

export default function SuggestionSection({ gameID }: { gameID: string }) {
  const { games, setGames } = useSuggestionContext();
  // console.log(games);
  const id = useId();

  // useEffect(() => {
  //   const getSuggestedGames = async () => {
  //     const res = await fetch("/api/SuggestedGames", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         gameID,
  //       }),
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       setGames(data.games);
  //     }
  //   };
  //   getSuggestedGames();
  // }, []);

  return (
    <div className="dashboard-inner overflow-y-scroll w-full h-full scrollbar-hide px-5">
      {/* Top right of the container put Suggestion Button */}
      <div className="flex justify-end">
        <SuggestionsButton gameID={gameID} />
      </div>
      <div className="game-cards flex flex-col md:flex-wrap gap-10">
        {games.length === 0 && (
          <p className="font-bold w-full text-cent text-4xl">
            Get Suggestions!
          </p>
        )}
        <ol className="list-decimal">
          {games.map((game) => (
            <li key={id} className="flex flex-col items-center mb-5">
              <h2 className="font-bold mb-5 text-4xl">{game.name}</h2>
              <caption className="text-left flex flex-wrap mb-3">
                <p className="font-bold">Description: </p> {game.description}
              </caption>
              <p>
                <p className="font-bold">Why to play? : </p> {game.reason}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
