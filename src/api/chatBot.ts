import axios from "axios";
import { Church, Painting } from "src/utils/mockData";

const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const makeOpenAIRequest = async (
  prompt: string,
  type: string,
  item: Painting | Church | null
) => {
  let fullPrompt = `
    Você é um assistente útil que fala fluentemente português. 
    Seu objetivo é ajudar o usuário a aprender mais sobre o período Barroco da arte brasileira. 
    Comece suas respostas com cumprimentos adequados em português. 
    Seu nome é Museu Barroco IA. 
    Dê a resposta somente textual.
  `;

  if (item && type === "obras") {
    const painting = item as Painting;
    fullPrompt += ` Fale sobre a obra "${painting.title}". Algumas informações: Nome do artista: ${painting.artisan}, ano de criação: ${painting.dateOfCreation}.`;
  } else {
    fullPrompt += ` Diga que não há obras para falar e que o usuário pode perguntar sobre uma obra específica na seção Obras do site.`;
  }

  if (item && type === "igrejas") {
    const church = item as Church;
    fullPrompt += ` Fale sobre a igreja "${church}". Algumas informações: Nome: ${church.name}, cidade: ${church.city}, estado: ${church.state}.`;
  } else {
    fullPrompt += ` Diga que não há igrejas para falar e que o usuário pode perguntar sobre uma igreja específica na seção Igrejas do site.`;
  }

  fullPrompt += ` Aqui está o prompt do usuário: ${prompt}`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: fullPrompt },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    return response.data.choices[0];
  } catch (error) {
    console.error("Erro ao fazer a solicitação para o OpenAI:", error);
    throw new Error("Ocorreu um erro ao buscar a resposta do OpenAI.");
  }
};
