import axios from "axios";
import { Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "src/components/DeleteModal";
import Modal from "src/components/Modal"; // Import the modal component
import { Container, ExitButton, ExitContainer, FormContainer } from "./styles";

const fetchPaintings = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/paintings/authorized`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching paintings:", error);
    throw error;
  }
};

export default function Dashboard() {
  const [paintings, setPaintings] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [dateSort, setDateSort] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [paintingToDelete, setPaintingToDelete] = useState(null);
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);
  const [suggestionText, setSuggestionText] = useState("");
  const [images, setImages] = useState([{ url: "", photographer: "" }]);
  const [isLoading, setIsLoading] = useState(false); // Add this line to define the isLoading state

  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const getPaintings = async () => {
      setIsLoading(true);
      const data = await fetchPaintings();
      setPaintings(data);
      console.log("Paintings fetched:", data);
    };

    getPaintings();
    setIsLoading(false);
  }, []);

  const handleDateArrow = (e) => {
    e.currentTarget.classList.toggle("rotate");
    const dateSorted = [...paintings].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    if (!dateSort) setPaintings([...dateSorted].reverse());
    else setPaintings(dateSorted);
    setDateSort(!dateSort);
  };

  const handleClick = (typeName) => {
    setSelectedType(typeName);
  };

  const filteredPaintings =
    selectedType === "all"
      ? paintings
      : selectedType === "published"
      ? paintings.filter((painting) => painting.isPublished)
      : paintings.filter((painting) => !painting.isPublished);

  const handleDelete = (id) => {
    setPaintingToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/paintings/${paintingToDelete}`
      );
      toast.success("Painting deleted successfully");
      setPaintings(
        paintings.filter((painting) => painting.id !== paintingToDelete)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Error deleting painting: " + error.message);
    }
  };

  const handleAddImage = () => {
    setImages([...images, { url: "", photographer: "" }]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleImageChange = (index, field, value) => {
    const newImages = images.map((img, i) =>
      i === index ? { ...img, [field]: value } : img
    );
    setImages(newImages);
  };

  const handleSubmitSuggestion = () => {
    // Logic to handle the submission of the suggestion
    console.log("Suggestion Text:", suggestionText);
    console.log("Images:", images);
    // Reset form fields
    setSuggestionText("");
    setImages([{ url: "", photographer: "" }]);
    setIsSuggestionModalOpen(false);
    toast.success("Suggestion submitted successfully!");
  };

  return (
    <Container>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />

      <Modal
        isOpen={isSuggestionModalOpen}
        onClose={() => setIsSuggestionModalOpen(false)}
      >
        <FormContainer>
          <h2>Submit Suggestion</h2>
          <textarea
            placeholder="Digite sua sugestão de edição aqui..."
            value={suggestionText}
            onChange={(e) => setSuggestionText(e.target.value)}
          />
          {images.map((image, index) => (
            <div
              key={index}
              style={{ display: "flex", gap: "10px", marginTop: "10px" }}
            >
              <input
                type="file"
                onChange={(e) =>
                  handleImageChange(index, "url", e.target.value)
                }
              />
              <input
                placeholder="Fotógrafo"
                value={image.photographer}
                onChange={(e) =>
                  handleImageChange(index, "photographer", e.target.value)
                }
              />
              <button onClick={() => handleRemoveImage(index)}>
                <Trash />
              </button>
            </div>
          ))}
          <button
            className="secondary"
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            onClick={handleAddImage}
          >
            <Plus />
            Adicionar Imagem
          </button>
          <button
            onClick={handleSubmitSuggestion}
            style={{ marginTop: "20px" }}
          >
            Enviar Sugestão
          </button>
        </FormContainer>
      </Modal>

      <h2>Submissões Recentes</h2>

      <main className="table">
        <section className="table-header">
          <div className="flex-group">
            <a
              onClick={() => handleClick("all")}
              className={(selectedType === "all" && "active") || "all"}
            >
              Todas
            </a>
            <a
              onClick={() => handleClick("published")}
              className={
                (selectedType === "published" && "active") || "published"
              }
            >
              Publicadas
            </a>
            <a
              onClick={() => handleClick("pending")}
              className={(selectedType === "pending" && "active") || "pending"}
            >
              Pendentes
            </a>
          </div>
        </section>
        <section className="table-body">
          <table className="content-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Status</th>
                <th>Usuário</th>
                <th>
                  <div className="flex-flow">
                    Data de Submissão{" "}
                    <button onClick={handleDateArrow}></button>
                  </div>
                </th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {filteredPaintings.map((painting) => (
                <PaintingRow
                  painting={painting}
                  key={painting.id}
                  onDelete={() => handleDelete(painting.id)}
                  onSuggestionClick={() => setIsSuggestionModalOpen(true)} // Trigger modal
                />
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <ExitContainer>
        <ExitButton onClick={handleExit}>Sair</ExitButton>
      </ExitContainer>
    </Container>
  );
}

function PaintingRow({ painting, onDelete, onSuggestionClick }) {
  return (
    <tr>
      <td>{painting.title}</td>
      <td>
        <span className={painting.isPublished ? "Published" : "Published"}>
          {painting.isPublished ? "Publicada" : "Publicada"}
        </span>
      </td>
      <td>{painting.registeredBy}</td>
      <td>
        {new Date(painting.submittedAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </td>
      <td style={{ display: "flex" }}>
        <button className="secondary" onClick={onSuggestionClick}>
          Sugestão
        </button>
      </td>
    </tr>
  );
}
