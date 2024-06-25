import React, { useState, ChangeEvent, FormEvent } from "react";
import openAISvg from "src/assets/OpenAI.svg";
import { makeOpenAIRequest } from "src/api/chatBot.js";

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

    try {
      if (!prompt) {
        setResponse("Digite um prompt para enviar.");
        setIsLoading(false);
        return;
      }
      const result = await makeOpenAIRequest(prompt, painting, church);
      setResponse(result.message.content);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro:", error);
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
