import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import openAISvg from "src/assets/OpenAI.svg";

interface AssistantProps {
  setShowAssistant: (show: boolean) => void;
  church?: string;
  painting?: string;
}

const Assistant: React.FC<AssistantProps> = ({
  setShowAssistant,
  church = "",
  painting = "",
}) => {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!prompt) {
      setResponse("Por favor, digite um prompt.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AI_API_URL}/openai`,
        {
          prompt: prompt,
          igreja: church,
          obra: painting,
        }
      );

      setResponse(res.data.message.content);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao fazer a solicitação para o OpenAI:", error);
      setResponse("Ocorreu um erro ao buscar a resposta.");
      setIsLoading(false);
    }
  };

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "1rem",
        padding: "1rem",
        width: "45rem",
        height: "40rem",
        overflowY: "auto",
      }}
    >
      <button onClick={() => setShowAssistant(false)}>x</button>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <h1>Museu Barroco IA</h1>
        <img height={"15px"} src={openAISvg} alt="OpenAI logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Digite seu prompt aqui"
          rows={4}
          cols={50}
        ></textarea>
        <br />
        <button type="submit">Enviar</button>
      </form>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        response && (
          <div>
            <h2>Resposta:</h2>
            <p>{response}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Assistant;
