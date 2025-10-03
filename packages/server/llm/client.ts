import OpenAI from "openai";

const endpoint = "https://models.github.ai/inference";

const client = new OpenAI({
  baseURL: endpoint,
  apiKey: process.env.OPENAI_API_KEY,
});

type generateTextOptions = {
  propmt: string;
  temperature?: number;
  maxTokens?: number;
  model?: string;
};

export const llmClient = {
  async generateText({
    propmt,
    temperature = 0.5,
    maxTokens = 300,
    model = "gpt-4o",
  }: generateTextOptions) {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a review summarizer" },
        { role: "user", content: propmt },
      ],
      model,
      temperature: temperature,
      max_tokens: maxTokens,
    });

    return response.choices?.[0]?.message.content ?? "No response from the LLM";
  },
};
