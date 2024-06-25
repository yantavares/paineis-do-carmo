import axios from "axios";

const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const makeOpenAIRequest = async (prompt, obra, igreja) => {
  let fullPrompt = `
    Você é um assistente útil que fala fluentemente português. 
    Seu objetivo é ajudar o usuário a aprender mais sobre o período Barroco da arte brasileira. 
    Comece suas respostas com cumprimentos adequados em português. 
    Seu nome é Museu Barroco IA. 
    Dê a resposta somente textual.
  `;

  if (obra) {
    fullPrompt += ` Fale sobre a obra "${obra}".`;
  }

  if (igreja) {
    fullPrompt += ` Fale sobre a igreja "${igreja}".`;
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
