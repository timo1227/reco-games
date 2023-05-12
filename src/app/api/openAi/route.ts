import { GamesType } from "Games";
import { Configuration, OpenAIApi } from "openai";
import db from "@/lib/dbConnect";
import Games from "@/models/Games";

const openAi = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

async function askGPT(prompt: string) {
  const completion = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  return completion.data.choices[0].message?.content;
}

export async function POST(req: Request) {
  try {
    const { gameID } = await req.json();

    // get games from db
    const games = await Games.findById(gameID);

    if (!games) {
      return new Response(JSON.stringify({ error: "Game not found" }), {
        status: 404,
      });
    }

    let prompt = "What are 2 Game titles that you can recommend if I played, ";
    games.games.forEach((game: any) => {
      prompt += `${game.name}, `;
    });
    prompt +=
      "? aswell as a short description of each game. and why you think I would like them. Respond in JSON format: {games: [{name: 'game name', description: 'game description', reason: 'why you think I would like it' }]}";
    const res = await askGPT(prompt);
    return new Response(res);
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: "Something went Wrong" }), {
      status: 500,
    });
  }
}
