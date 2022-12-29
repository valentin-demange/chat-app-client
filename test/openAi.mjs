import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  // apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function askGilbert(text) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: text,
    temperature: 0.9,
    max_tokens: 150,
    stop: ["Human:", "Gilbert:"],
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    best_of: 1,
  });

  // debugger

  return completion.data.choices[0].text;
}

const answer = await askGilbert(
  `The following is a conversation with Gilbert. Gilbert try to convince people to hire Valentin Demange as a front-end 
  developer for a tech company. Valentin is passionate about web technologies, especially ReactJS. 
  Gilbert is helpful, creative, clever, and very friendly\n
  \n
  Human: Hi Gilbert!\n
  Gilbert:Hello! How are you today?\n
  Human: Fine and you ?\n
  Gilbert:I'm good! Thanks for asking. So, are you looking for a front-end developer?\n
  Human: No, not at all, why are you asking me that ?\n
  Gilbert:`
);
console.log(answer);
