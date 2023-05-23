import { Configuration, OpenAIApi } from 'openai'

import { Games } from '@/types/Games'

const openAi = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
)

async function askGPT(prompt: string) {
  const completion = await openAi.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })
  return completion.data.choices[0].message?.content
}

export async function POST(req: Request) {
  try {
    const { games } = await req.json()

    let prompt = 'What are 2 Game titles that you can recommend if I played, '
    games.forEach((game: Games) => {
      prompt += `${game.name}, `
    })
    prompt +=
      "? as well as a short description of each game. and why you think I would like them. Respond in JSON format: {games: [{name: 'game name', description: 'game description', reason: 'why you think I would like it' }]}"
    const res = await askGPT(prompt)
    return new Response(res)
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify({ error: 'Something went Wrong' }), {
      status: 500,
    })
  }
}
