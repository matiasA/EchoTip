import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Permite el uso en el navegador
});

export async function generateVoiceAudio(text) {
  try {
    console.log("Generando audio para:", text);
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy", // Usamos la voz "nova" que suena bien en español
      input: text,
    });
    console.log("Audio generado exitosamente");

    const buffer = await mp3.arrayBuffer();
    const blob = new Blob([buffer], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);
    console.log("URL del audio generada:", url);
    return url;
  } catch (error) {
    console.error("Error al generar el audio:", error);
    return null;
  }
}

export async function translateToSpanish(text) {
  try {
    console.log("Traduciendo texto:", text);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Cambiado de gpt-4o-mini a gpt-3.5-turbo
      messages: [
        { role: "system", content: "Eres un traductor experto. Traduce el siguiente texto al español." },
        { role: "user", content: text }
      ],
      max_tokens: 100
    });
    const translatedText = completion.choices[0].message.content.trim();
    console.log("Texto traducido:", translatedText);
    return translatedText;
  } catch (error) {
    console.error("Error al traducir el texto:", error);
    return text; // Devolvemos el texto original si hay un error
  }
}