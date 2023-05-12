import { Configuration, OpenAIApi } from "openai";

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
    const { games } = await req.json();
    let prompt = "What are some Game Recommendations for me if I played ";
    games.forEach((game: string) => {
      prompt += game + ", ";
    }, prompt);
    prompt = prompt.slice(0, -2);
    prompt += "?";
    const res = await askGPT(prompt);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
