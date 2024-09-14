import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Función para generar una clave única para cada texto
function generateCacheKey(text) {
  return `audio_${btoa(text)}`;
}

// Función para obtener el audio del caché
function getCachedAudio(text) {
  const cacheKey = generateCacheKey(text);
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    try {
      const { audioData, timestamp } = JSON.parse(cachedData);
      // Verificar si el audio tiene menos de 24 horas
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        return audioData;
      } else {
        // Si el audio es viejo, lo eliminamos
        localStorage.removeItem(cacheKey);
      }
    } catch (error) {
      console.error("Error al parsear datos del caché:", error);
      localStorage.removeItem(cacheKey);
    }
  }
  return null;
}

// Función para guardar el audio en el caché
function cacheAudio(text, audioData) {
  const cacheKey = generateCacheKey(text);
  const cacheData = JSON.stringify({
    audioData,
    timestamp: Date.now()
  });
  try {
    localStorage.setItem(cacheKey, cacheData);
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
    // Si hay un error (probablemente por espacio), limpiamos el localStorage
    clearOldCache();
  }
}

// Función para limpiar caché antiguo
function clearOldCache() {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('audio_')) {
      try {
        const { timestamp } = JSON.parse(localStorage.getItem(key));
        if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
          localStorage.removeItem(key);
        }
      } catch (error) {
        localStorage.removeItem(key);
      }
    }
  });
}

// Función asincrónica para generar audio a partir de texto
export async function generateVoiceAudio(text) {
  // Primero, intentamos obtener el audio del caché
  const cachedAudioData = getCachedAudio(text);
  if (cachedAudioData) {
    console.log("Audio obtenido del caché");
    return cachedAudioData;
  }

  try {
    console.log("Generando audio para:", text);
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });
    console.log("Audio generado exitosamente");

    const buffer = await mp3.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    const audioData = `data:audio/mpeg;base64,${base64Audio}`;

    // Guardamos el audio en el caché
    cacheAudio(text, audioData);

    return audioData;
  } catch (error) {
    console.error("Error al generar el audio:", error);
    return null;
  }
}

// Función asincrónica para "traducir" texto al español (en realidad, solo lo devolverá sin cambios)
export async function translateToSpanish(text) {
  console.log("Texto original (ya en español):", text);
  return text; // Simplemente devolvemos el texto original sin traducir
}