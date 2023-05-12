import db from "@/lib/dbConnect";
import Games from "@/models/Games";

export async function PATCH(req: Request) {
  try {
    await db();

    const { gameID, suggestedGames } = await req.json();

    const UserGamesDoc = await Games.findByIdAndUpdate(
      gameID,
      { suggestedGames },
      { new: true }
    );

    if (!UserGamesDoc) {
      return new Response(JSON.stringify({ errorMSG: "Game not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(UserGamesDoc));
  } catch (err: any) {
    return new Response(JSON.stringify({ errorMSG: err.message }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    await db();

    const { gameID } = await req.json();

    const games = await Games.findById(gameID);

    if (!games) {
      return new Response(JSON.stringify({ error: "Game not found" }), {
        status: 404,
      });
    }

    const suggestionArray = games.suggestedGames;

    return new Response(JSON.stringify({ games: suggestionArray }));
  } catch (err) {
    return new Response(JSON.stringify({ error: "Something went Wrong" }), {
      status: 500,
    });
  }
}
