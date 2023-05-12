import { useContext } from "react";
import { SuggestionContext } from "../context/SuggestContext";

export default function useSuggestionContext() {
  const context = useContext(SuggestionContext);
  if (!context) {
    throw new Error(
      "useSuggestionContext must be used within a SuggestionContextProvider"
    );
  }
  return context;
}
