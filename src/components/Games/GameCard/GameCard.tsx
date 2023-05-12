import Image from "next/image";

async function getAppDeatails(appid: string) {
  const url = `https://store.steampowered.com/api/appdetails?appids=${appid}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

interface Props {
  game: {
    appid: string;
    name: string;
  };
}

export default async function GameCard({ game }: Props) {
  const appDetails = await getAppDeatails(game.appid);
  let details = "";
  let headerImage = "";

  if (!appDetails[game.appid].success) {
    return (
      <>
        <div className=" border border-gray-400 flex flex-col justify-center items-center max-w-md p-5 rounded-lg  ">
          <h3 className="font-bold">{game.name}</h3>
          <p>Sorry, no details available for this game.</p>
        </div>
      </>
    );
  }

  details = appDetails[game.appid].data.short_description;
  headerImage = appDetails[game.appid].data.header_image
    ? appDetails[game.appid].data.header_image
    : "";

  return (
    <>
      <div
        key={game.appid}
        className="border-4 border-black/10 max-w-xs rounded-xl overflow-hidden m-5 shadow-lg"
      >
        {headerImage && (
          <Image
            className=""
            height={1600}
            width={500}
            src={headerImage}
            alt="header image"
          />
        )}
        <h3 className="font-bold h-20 text-center w-full flex justify-center items-center">
          {game.name}
        </h3>
        {details && (
          <div
            className="p-5 border-t-2 border-gray-400 text-sm text-gray-500 leading-relaxed overflow-y-auto flex justify-center items-center"
            dangerouslySetInnerHTML={{ __html: details }}
          />
        )}
      </div>
    </>
  );
}
