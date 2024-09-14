import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateVoiceText(context) {
  try {
    const completion = await openai.createCompletion({
      model: "gpt-4o-mini",
      prompt: `Genera un texto breve y descriptivo para un tooltip de voz basado en el siguiente contexto: ${context}`,
      max_tokens: 50,
    });
    return completion.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error al generar el texto de voz:", error);
    return "Lo siento, no pude generar el texto de voz.";
  }
}