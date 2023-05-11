const getAppDeatails = async (appid: string) => {
  const url = `https://store.steampowered.com/api/appdetails?appids=${appid}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

interface Props {
  game: {
    appid: number;
    name: string;
  };
}

export default async function GameCard({ game }: Props) {
  return (
    <div>
      <h3>{game.name}</h3>
      <p>{game.appid}</p>
    </div>
  );
}
