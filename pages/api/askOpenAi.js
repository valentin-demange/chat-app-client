import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: req.body.promptOpenAi,
    temperature: 0.9,
    max_tokens: 150,
    stop: [`${req.body.userName}:`, `Gilbert:`],
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    best_of: 1,
    });
  res.status(200).json({ result: completion.data.choices[0].text });
}

