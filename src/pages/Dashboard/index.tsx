import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "src/components/DeleteModal";
import Modal from "src/components/Modal"; // Import a modal component for displaying the form
import OptionButton from "src/components/OptionButton";
import SubmitPage from "src/pages/SubmitPage"; // Import your SubmitPage component here
import { Container, ExitButton, ExitContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import colors from "src/utils/colors";

const fetchPaintings = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/paintings`
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [paintingToEdit, setPaintingToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.removeItem("user");
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

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/paintings/${id}`
      );
      setPaintingToEdit(response.data);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Error fetching painting:", error);
      toast.error("Error fetching painting data: " + error.message);
    }
  };

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

  return (
    <Container>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <SubmitPage painting={paintingToEdit} isEdit={true} />
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
                  onEdit={() => handleEdit(painting.id)}
                  onDelete={() => handleDelete(painting.id)}
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

function PaintingRow({ painting, onEdit, onDelete }) {
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
        <OptionButton onEdit={onEdit} onDelete={onDelete} />
      </td>
    </tr>
  );
}
