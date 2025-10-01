import fetch from "node-fetch";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message;

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.choices[0].message.content }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
