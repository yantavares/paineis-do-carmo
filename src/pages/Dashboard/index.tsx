import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container } from "./styles";
import OptionButton from "src/components/OptionButton";
import DeleteConfirmationModal from "src/components/DeleteModal";
import SubmitPage from "src/pages/SubmitPage"; // Import your SubmitPage component here
import toast from "react-hot-toast";
import { Ellipsis } from "lucide-react";
import Modal from "src/components/Modal"; // Import a modal component for displaying the form

const mockPaintings = [
  // Your mock data here
];

const fetchPaintings = async () => {
  try {
    const response = await axios.get(
      "https://api-museubarroco-east-dev.azurewebsites.net/api/paintings"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching paintings:", error);
    throw error;
  }
};

export default function Dashboard() {
  const [paintings, setPaintings] = useState(mockPaintings);
  const [selectedType, setSelectedType] = useState("all");
  const [dateSort, setDateSort] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [paintingToDelete, setPaintingToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [paintingToEdit, setPaintingToEdit] = useState(null);

  useEffect(() => {
    const getPaintings = async () => {
      const data = await fetchPaintings();
      setPaintings(data);
      console.log("Paintings fetched:", data);
    };

    getPaintings();
  }, []);

  const handleDateArrow = (e) => {
    e.currentTarget.classList.toggle("rotate");
    const dateSorted = [...paintings].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
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
        `https://api-museubarroco-east-dev.azurewebsites.net/api/paintings/${id}`
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
        `https://api-museubarroco-east-dev.azurewebsites.net/api/paintings/${paintingToDelete}`
      );
      toast.success("Painting deleted successfully");
      setPaintings(paintings.filter((painting) => painting.id !== paintingToDelete));
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
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}>
        <SubmitPage
          painting={paintingToEdit}
          isEdit={true}
        />
      </Modal>
      <h2>SUBMISSÕES RECENTES</h2>
      <main className="table">
        <section className="table-header">
          <div className="flex-group">
            <a
              onClick={() => handleClick("all")}
              className={(selectedType === "all" && "active") || "all"}>
              Todas
            </a>
            <a
              onClick={() => handleClick("published")}
              className={(selectedType === "published" && "active") || "published"}>
              Publicadas
            </a>
            <a
              onClick={() => handleClick("pending")}
              className={(selectedType === "pending" && "active") || "pending"}>
              Pendentes
            </a>
          </div>
        </section>
        <section className="table-body">
          <table className="content-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>User</th>
                <th>
                  <div className="flex-flow">
                    Submission Date <button onClick={handleDateArrow}></button>
                  </div>
                </th>
                <th>Options</th>
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
        <OptionButton
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}
