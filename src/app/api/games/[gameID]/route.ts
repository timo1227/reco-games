import db from "@/lib/dbConnect";
import Games from "@/models/Games";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  { params: { gameID } }: { params: { gameID: ObjectId } }
) {
  try {
    await db();
    // Concatenate ObjectID with the gamesID;
    const games = await Games.findById(gameID);

    if (!games) {
      return new Response(JSON.stringify({ errorMSG: "Game not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(games), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ errorMSG: err.message }), {
      status: 500,
    });
  }
}
