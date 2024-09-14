// Importamos la biblioteca OpenAI
import OpenAI from "openai";

// Creamos una instancia de OpenAI con la clave API
// La opción dangerouslyAllowBrowser permite el uso en el navegador, pero debe usarse con precaución
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Permite el uso en el navegador
});

// Función asincrónica para generar audio a partir de texto
export async function generateVoiceAudio(text) {
  try {
    console.log("Generando audio para:", text);
    // Llamamos a la API de OpenAI para crear un audio de voz
    const mp3 = await openai.audio.speech.create({
      model: "tts-1", // Modelo de texto a voz
      voice: "alloy", // Voz seleccionada
      input: text, // Texto a convertir en audio
    });
    console.log("Audio generado exitosamente");

    // Convertimos la respuesta en un ArrayBuffer
    const buffer = await mp3.arrayBuffer();
    // Creamos un Blob a partir del ArrayBuffer
    const blob = new Blob([buffer], { type: "audio/mpeg" });
    // Creamos una URL para el Blob
    const url = URL.createObjectURL(blob);
    console.log("URL del audio generada:", url);
    return url;
  } catch (error) {
    console.error("Error al generar el audio:", error);
    return null;
  }
}

// Función asincrónica para traducir texto al español
export async function translateToSpanish(text) {
  try {
    console.log("Traduciendo texto:", text);
    // Llamamos a la API de OpenAI para realizar la traducción
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Modelo de lenguaje a utilizar
      messages: [
        { role: "system", content: "Eres un traductor experto. Traduce el siguiente texto al español." },
        { role: "user", content: text }
      ],
      max_tokens: 100 // Límite de tokens para la respuesta
    });
    // Extraemos el texto traducido de la respuesta
    const translatedText = completion.choices[0].message.content.trim();
    console.log("Texto traducido:", translatedText);
    return translatedText;
  } catch (error) {
    console.error("Error al traducir el texto:", error);
    return text; // Devolvemos el texto original si hay un error
  }
}