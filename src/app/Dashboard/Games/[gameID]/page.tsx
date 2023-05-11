import SetUserGamesList from "@/components/Games/SetUserGamesList/SetUserGamesList";
import UserGamesList from "@/components/Games/UserGamesList/UserGamesList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { GamesType } from "Games";

async function getSteamGames() {
  const res = await fetch(
    "https://api.steampowered.com/ISteamApps/GetAppList/v2/",
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data.applist.apps;
}

async function getUserGames({ gameID }: { gameID: string }) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${url}/api/games/${gameID}`, {
    next: {
      revalidate: 5,
    },
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
  const session = await getServerSession(authOptions);
  const userGamesList: GamesType = await getUserGames({ gameID });
  let dashboardPage = null;

  if (userGamesList.length === 0) {
    const steamGames = await getSteamGames();

    dashboardPage = (
      <SetUserGamesList
        gameID={gameID}
        gamesList={userGamesList}
        steamGames={steamGames}
      />
    );
  } else {
    dashboardPage = <UserGamesList gamesList={userGamesList} />;
  }

  return (
    <main>
      <h1>{session?.user.name}&apos;s DashBoard</h1>
      {dashboardPage}
    </main>
  );
}
