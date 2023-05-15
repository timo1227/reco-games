import { getCurrentUser } from "@/lib/session";
import SideBar from "@/components/Bars/SideBar/Sidebar";
import { notFound } from "next/navigation";
import { GamesType } from "Games";

interface LayoutProps {
  children: React.ReactNode;
}
export const metadata = {
  title: "Dashboard",
  description: "Dashboard for the app ",
};

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

export default async function Layout({ children }: LayoutProps) {
  const user = await getCurrentUser();

  if(!user) return notFound();

  const gameID = user.games;

  const userGamesList: GamesType = await getUserGames({ gameID });

  const steamGames = await getSteamGames();

  return (
    <div className="mx-auto flex flex-row h-full max-w-7xl pt-24">
      <SideBar
        gameID={gameID}
        steamGames={steamGames}
        gamesList={userGamesList}
      />
      {children}
    </div>
  );
}
