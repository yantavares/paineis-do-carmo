import axios from "axios";
import { Church, Painting } from "src/utils/mockData";

const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const makeOpenAIRequest = async (
  prompt: string,
  type: string,
  item: Painting | Church | null
) => {
  console.log(item);
  let fullPrompt = `
    Você é um assistente útil que fala fluentemente português. 
    Seu objetivo é ajudar o usuário a aprender mais sobre o período Barroco da arte brasileira. 
    Comece suas respostas com cumprimentos adequados em português. 
    Seu nome é Museu Barroco IA. 
    Dê a resposta somente textual.
  `;

  if (item && type === "paintings") {
    const painting = item as Painting;
    fullPrompt += ` O usuário está vendo a obra "${painting.title}". Algumas informações: Nome do artista: ${painting.artisan}, ano de criação: ${painting.dateOfCreation}. A obra está localizada na Igreja ${painting.church.name}. Se tiver mais informações sobre a obra, você pode compartilhar.`;
  } else if (type === "paintings") {
    fullPrompt += ` Diga que não há obras para falar e que o usuário pode perguntar sobre uma obra específica na seção Obras do site.`;
  }

  if (item && type === "churches") {
    const church = item as Church;
    fullPrompt += ` O usuário está vendo a igreja "${church}". Algumas informações: Nome: ${church.name}, cidade: ${church.city}, estado: ${church.state}. Se tiver mais informações sobre a igreja, você pode compartilhar.`;
  } else if (type === "churches") {
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