import UserGamesList from "@/components/Games/UserGamesList/UserGamesList";
import { GamesType } from "Games";

async function getUserGames({ gameID }: { gameID: string }) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${url}/api/games/${gameID}`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data.games;
}

export default async function Page({
  params: { gameID },
}: {
  params: { gameID: string };
}) {
  const userGamesList: GamesType = await getUserGames({ gameID });

  return (
    <div className="h-full w-full">
      <UserGamesList gamesList={userGamesList} />
    </div>
  );
}
