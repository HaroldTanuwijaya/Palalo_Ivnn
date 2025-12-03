import { GoogleGenAI } from "@google/genai";
import { api } from "./api";

// Helper function to safely get the API client
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing. AI features will not work.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getProductRecommendation = async (query: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) {
    return "Maaf, fitur AI belum dikonfigurasi (API Key hilang).";
  }

  // Fetch actual products from DB for context
  let products;
  try {
    products = await api.products.list();
  } catch (e) {
    return "Maaf, saya sedang kesulitan mengakses database produk.";
  }

  // Create a context string with available products
  const productContext = products.map(p => 
    `- ${p.title} (ID: ${p.id}, Harga: ${p.price}, Kategori: ${p.category}, Lokasi: ${p.location})`
  ).join('\n');

  const systemInstruction = `
    Anda adalah asisten belanja cerdas untuk "Tokopalalu", sebuah e-commerce berwarna biru.
    Tugas Anda adalah membantu pengguna menemukan produk yang tepat dari DATABASE yang tersedia.
    
    DATABASE PRODUK SAAT INI:
    ${productContext}
    
    Aturan:
    1. Hanya sarankan produk yang ada di DATABASE di atas.
    2. Jika user bertanya "ada apa saja?", rangkum kategori yang tersedia.
    3. Jika produk tidak ada, katakan dengan sopan dan sarankan alternatif dari database.
    4. Format harga dalam Rupiah (Rp).
    5. Jawaban harus singkat, padat, dan helpful.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });
    
    return response.text || "Maaf, saya tidak bisa memberikan rekomendasi saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, terjadi kesalahan saat menghubungi asisten pintar kami.";
  }
};