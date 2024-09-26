import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import DeleteConfirmationModal from "src/components/DeleteModal";
import Modal from "src/components/Modal"; // Import the modal component
import { Container, ExitButton, ExitContainer, FormContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Button, TextField, IconButton } from "@mui/material";
import { Plus, Trash, X } from "lucide-react";
import { useAuth } from "src/context/AuthContext";
import SubmitPage from "../../SubmitPage";
import colors from "src/utils/colors";

// const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/paintings`, payload, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

export default function Dashboard() {
  const [paintings, setPaintings] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [dateSort, setDateSort] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [paintingToDelete, setPaintingToDelete] = useState(null);
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);
  const [suggestionText, setSuggestionText] = useState("");
  const [images, setImages] = useState([{ base64Image: "", photographer: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPaintings, setIsLoadingPaintings] = useState(false);
  const [isLoadingChurches, setIsLoadingChurches] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [paintingToEdit, setPaintingToEdit] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const fetchPaintings = async ({ token, filter = "all" }) => {
    setIsLoading(true);
    let url = `${import.meta.env.VITE_API_URL}/api/paintings/authorized`;

    if (filter === "published") {
      url += "?filter=published";
    } else if (filter === "unpublished") {
      url += "?filter=unpublished";
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${filter} paintings:`, error);
      setIsLoading(false);
      throw error;
    }
  };

  const handleExit = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const { token, user } = useAuth();

  useEffect(() => {
    const getPaintings = async () => {
      const data = await fetchPaintings({ token, filter: "all" });
      setPaintings(data);
    };

    getPaintings();
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
    setIsDeleting(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/paintings/${paintingToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Pintura deletada com sucesso!");
      setPaintings(
        paintings.filter((painting) => painting.id !== paintingToDelete)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Erro ao deletar pintura: " + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddImage = () => {
    setImages([...images, { base64Image: "", photographer: "" }]);
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/paintings/authorized/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPaintingToEdit(response.data);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Error fetching painting:", error);
      toast.error("Erro ao buscar pintura: " + error.message);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePhotographerChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = { ...updatedImages[index], photographer: value };
    setImages(updatedImages);
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return; // Exit if no file is selected

    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedImages = [...images];
      updatedImages[index] = {
        ...updatedImages[index],
        base64Image: reader.result.toString(),
      };
      setImages(updatedImages);
    };

    reader.readAsDataURL(file); // Start reading the file
  };

  const handleSubmitSuggestion = async () => {
    // Logic to handle the submission of the suggestion

    const payload = {
      reason: suggestionText,
      images,
    };

    // Send the suggestion to the API: http://museubarroco-vm.eastus.cloudapp.azure.com/paintings/id/add-suggestion
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/api/paintings/${selectedPainting}/add-suggestion`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Suggestion submitted successfully!");
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      toast.error("Erro ao submeter sugestão: " + error.message);
    }

    // Reset form fields
    setSuggestionText("");
    setImages([{ base64Image: "", photographer: "" }]);
    setIsSuggestionModalOpen(false);
    toast.success("Suggestion submitted successfully!");
  };

  return (
    <Container>
      <h1 style={{ color: colors.darkMain, fontWeight: 400 }}>
        Bem vindo(a) {user?.name ?? "Admin"}!
      </h1>
      <Toaster />
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <SubmitPage painting={paintingToEdit} isEdit={true} />
      </Modal>
      <DeleteConfirmationModal
        isDeleting={isDeleting}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />

      <Modal
        isOpen={isSuggestionModalOpen}
        onClose={() => setIsSuggestionModalOpen(false)}
      >
        <FormContainer>
          <div className="flex-between">
            <h2>Envie uma Sugestão</h2>
            <a
              className="close-btn"
              onClick={() => setIsSuggestionModalOpen(false)}
            >
              <X />
            </a>
          </div>
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
                onChange={(e) => handleImageChange(index, e)}
              />
              <input
                placeholder="Fotógrafo"
                value={image.photographer}
                onChange={(e) =>
                  handlePhotographerChange(index, e.target.value)
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

      {isLoading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={70} style={{ color: colors.mainColor }} />
        </div>
      ) : (
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
                className={
                  (selectedType === "pending" && "active") || "pending"
                }
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
                    onEdit={() => handleEdit(painting.id)}
                    onSuggestionClick={() => {
                      setIsSuggestionModalOpen(true);
                      setSelectedPainting(painting.id);
                    }}
                  />
                ))}
              </tbody>
            </table>
          </section>
        </main>
      )}

      <ExitContainer>
        <ExitButton onClick={handleExit}>Sair</ExitButton>
      </ExitContainer>
    </Container>
  );
}

function PaintingRow({ painting, onDelete, onSuggestionClick, onEdit }) {
  return (
    <tr>
      <td>{painting.title}</td>
      <td>
        <span className={painting.isPublished ? "Published" : "Pending"}>
          {painting.isPublished ? "Publicada" : "Pendente"}
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
        {painting.isPublished && (
          <button className="secondary" onClick={onSuggestionClick}>
            Sugestão
          </button>
        )}
        {!painting.isPublished && (
          <button className="secondary" onClick={onEdit}>
            Editar
          </button>
        )}
      </td>
    </tr>
  );
}
