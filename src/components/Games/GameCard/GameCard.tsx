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
  // console.log(appDetails);
  const details: string = appDetails[game.appid].data.short_description
    ? appDetails[game.appid].data.short_description
    : "";
  const headerImage: string = appDetails[game.appid].data.header_image
    ? appDetails[game.appid].data.header_image
    : "";

  return (
    <>
      <div className=" border border-gray-400 flex flex-col justify-center items-center max-w-md p-5 rounded-lg  ">
        <h3 className="font-bold">{game.name}</h3>
        {headerImage && (
          <Image
            height={500}
            width={500}
            src={headerImage}
            alt="header image"
          />
        )}
        {details && (
          <div className="mt-5" dangerouslySetInnerHTML={{ __html: details }} />
        )}
      </div>
    </>
  );
}
