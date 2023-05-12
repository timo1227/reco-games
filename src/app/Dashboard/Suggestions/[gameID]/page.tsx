"use client";
import SuggestionSection from "@/components/Games/SuggestedGames/SuggestionSection";
import SuggestionProvider from "@/context/SuggestContext";

export default function Page({
  params: { gameID },
}: {
  params: { gameID: string };
}) {
  return (
    <div className="h-full w-full">
      <SuggestionProvider>
        <SuggestionSection gameID={gameID} />
      </SuggestionProvider>
    </div>
  );
}
