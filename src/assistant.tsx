import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeOpenAIRequest } from "src/api/chatbot";
import openAISvg from "src/assets/OpenAI.svg";
import { Church, Painting } from "./utils/mockData";

interface AssistantProps {
  setShowAssistant: (show: boolean) => void;
  conversation: Message[];
  setConversation: any;
}

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Assistant: React.FC<AssistantProps> = ({
  setShowAssistant,
  conversation,
  setConversation,
}) => {
  const [prompt, setPrompt] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [item, setItem] = useState<Painting | Church>(null);

  const location = useLocation().pathname.split("/");
  useEffect(() => {
    if (location.length >= 5 && location[2] === "item") {
      setType(location[3]);
      setId(location[4]);
    }
  }, [location]);

  useEffect(() => {
    if (type === "churches") {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/churches/${id}`)
        .then((res) => setItem(res.data as Church))
        .catch((err) => console.error(err));
    } else if (type === "paintings") {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/paintings/${id}`)
        .then((res) => setItem(res.data as Painting))
        .catch((err) => console.error(err));
    }
  }, [location]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!prompt) {
        setConversation([
          ...conversation,
          { sender: "bot", text: "Digite um prompt para enviar." },
        ]);
        setIsLoading(false);
        return;
      }
      setConversation([...conversation, { sender: "user", text: prompt }]);
      setPrompt("");

      const result = await makeOpenAIRequest(prompt, type, item);
      setConversation((prev: Message[]) => [
        ...prev,
        { sender: "bot", text: result.message.content },
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro:", error);
      setConversation([
        ...conversation,
        { sender: "bot", text: "Ocorreu um erro ao buscar a resposta." },
      ]);
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            paddingLeft: "1rem",
          }}
        >
          <h1>Museu Barroco IA</h1>
          <img height={"15px"} src={openAISvg} alt="OpenAI logo" />
        </div>
        <button onClick={() => setShowAssistant(false)}>x</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", marginBottom: "1rem" }}>
        {conversation.map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              fontSize: "1.4rem",
              justifyContent:
                message.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
                backgroundColor:
                  message.sender === "user" ? "#dcf8c6" : "#f0f0f0",
              }}
            >
              {message.text}
              {isLoading && <p style={{ fontSize: "1rem" }}>Carregando...</p>}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex" }}>
        <textarea
          style={{
            width: "100%",
            backgroundColor: "#f0f0f0",
            fontFamily: "monospace",
            color: "inherit",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            marginRight: "0.5rem",
          }}
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Digite seu prompt aqui"
          rows={2}
        ></textarea>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          <FontAwesomeIcon icon={faCircleArrowRight} />
        </button>
      </form>
    </div>
  );
};

export default Assistant;
