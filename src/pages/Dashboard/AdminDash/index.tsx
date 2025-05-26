import {
  faCircleArrowDown,
  faCircleArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "src/components/DeleteModal";
import Modal from "src/components/Modal";
import OptionButton from "src/components/OptionButton";
import { useAuth } from "src/context/AuthContext";
import SubmitPage from "src/pages/SubmitPage";
import colors from "src/utils/colors";
import { ChurchForm, Container, ExitButton, ExitContainer } from "./styles";

function SortableHeader({ label, column, sortState, onSort }) {
  return (
    <th
      onClick={() => onSort(column)}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      {label}{" "}
      {sortState.column === column ? (
        sortState.direction === "asc" ? (
          <FontAwesomeIcon icon={faCircleArrowUp} />
        ) : (
          <FontAwesomeIcon icon={faCircleArrowDown} />
        )
      ) : (
        ""
      )}
    </th>
  );
}

export default function Dashboard() {
  const { token } = useAuth();

  const [paintings, setPaintings] = useState([]);
  const [churches, setChurches] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [dateSort, setDateSort] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [paintingToDelete, setPaintingToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [paintingToEdit, setPaintingToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPaintings, setIsLoadingPaintings] = useState(false);
  const [isLoadingChurches, setIsLoadingChurches] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteChurchId, setDeleteChurchId] = useState(null);
  const [isChurchModalOpen, setIsChurchModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [churchToEdit, setChurchToEdit] = useState(null);
  const [churchImages, setChurchImages] = useState([]);
  const [urlsToRemove, setUrlsToRemove] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 860);

  const [paintingsSort, setPaintingsSort] = useState({
    column: "title",
    direction: "asc",
  });
  const [churchesSort, setChurchesSort] = useState({
    column: "name",
    direction: "asc",
  });

  const handleSortPaintings = (column) => {
    setPaintingsSort((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSortChurches = (column) => {
    setChurchesSort((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortStrings = (a, b, dir) =>
    dir === "asc" ? a.localeCompare(b) : b.localeCompare(a);
  const sortDates = (a, b, dir) =>
    dir === "asc"
      ? new Date(a).getTime() - new Date(b).getTime()
      : new Date(b).getTime() - new Date(a).getTime();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 860);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const brazilianStates = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  // ENDPOINTS P/ /AUTHORIZED

  const { user } = useAuth();

  const fetchChurches = async () => {
    setIsLoadingChurches(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/churches/authorized`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoadingChurches(false);

      return response.data;
    } catch (error) {
      console.error("Error fetching churches:", error);
      setIsLoadingChurches(false);
      throw error;
    }
  };

  const navigate = useNavigate();

  const fetchPaintings = async () => {
    setIsLoadingPaintings(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/paintings/authorized`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoadingPaintings(false);

      return response.data;
    } catch (error) {
      console.error("Error fetching paintings:", error);
      setIsLoadingPaintings(false);
      throw error;
    }
  };

  const handleExit = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const getPaintings = async () => {
      const data = await fetchPaintings();
      setPaintings(data);
      setIsLoading(false);
    };

    const getChurches = async () => {
      const data = await fetchChurches();
      setChurches(data);
    };

    getPaintings();
    getChurches();
  }, []);

  const handleClick = (typeName) => {
    setSelectedType(typeName);
  };

  useEffect(() => {
    setIsLoading(isLoadingChurches || isLoadingPaintings);
  }, [isLoadingChurches, isLoadingPaintings]);

  const filteredPaintings =
    selectedType === "all"
      ? paintings
      : selectedType === "published"
      ? paintings.filter((p) => p.isPublished)
      : selectedType === "pending"
      ? paintings.filter((p) => !p.isPublished)
      : paintings;

  const sortedPaintings = [...filteredPaintings].sort((a, b) => {
    const { column, direction } = paintingsSort;
    switch (column) {
      case "title":
        return sortStrings(a.title, b.title, direction);
      case "status":
        return sortStrings(
          a.isPublished ? "1" : "0",
          b.isPublished ? "1" : "0",
          direction
        );
      case "registeredBy":
        return sortStrings(
          a.registeredBy || "",
          b.registeredBy || "",
          direction
        );
      case "submittedAt":
        return sortDates(a.submittedAt, b.submittedAt, direction);

      case "church.name":
        return sortStrings(
          a.church?.name || "",
          b.church?.name || "",
          direction
        );

      default:
        return 0;
    }
  });

  const sortedChurches = [...churches].sort((a, b) => {
    const { column, direction } = churchesSort;
    switch (column) {
      case "name":
        return sortStrings(a.name, b.name, direction);
      case "city":
        return sortStrings(a.city || "", b.city || "", direction);
      case "state":
        return sortStrings(a.state || "", b.state || "", direction);
      case "status":
        return sortStrings(
          a.isPublished ? "1" : "0",
          b.isPublished ? "1" : "0",
          direction
        );
      default:
        return 0;
    }
  });

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

  const handleDelete = (id) => {
    setPaintingToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/paintings/${paintingToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Pintura deletada com sucesso");
      setPaintings(
        paintings.filter((painting) => painting.id !== paintingToDelete)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Erro ao deletar pintura: " + error.message);
    }
  };

  const handleEditChurch = (church) => {
    setChurchToEdit(church);
    setImages(church.images);
    setChurchImages(
      church.images.map((image) => ({ ...image, base64Image: "" }))
    );
    setIsChurchModalOpen(true);
  };

  const handleDeleteChurch = async (id) => {
    try {
      // Fetch all paintings
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/paintings/authorized`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const paintings = response.data;
      // Check if any painting is associated with the church
      const isPaintingAssociated = paintings.some(
        (painting) => painting.church.id === id
      );

      if (isPaintingAssociated) {
        toast.error(
          "Essa igreja não pode ser deletada, ela está relacionada com uma pintura existente"
        );
      } else {
        // Open confirmation modal
        setDeleteChurchId(id);
        setIsModalOpen(true);
      }
    } catch (error) {
      toast.error("Erro ao verificar pinturas: " + error.message);
    }
  };

  const confirmDeleteChurch = async () => {
    setIsDeleting(true);
    try {
      // Proceed with deletion
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/churches/${deleteChurchId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Igreja deletada com sucesso");
      setChurches(churches.filter((church) => church.id !== deleteChurchId));
      setIsModalOpen(false);
      setDeleteChurchId(null);
    } catch (error) {
      toast.error("Erro ao deletar igreja: " + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePhotographerChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index].photographer = value;
    setImages(updatedImages);
  };

  // Function to handle file input change
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return; // Exit if no file is selected

    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedImages = [...images];
      updatedImages[index] = {
        ...updatedImages[index],
        url: reader.result, // Update image URL (base64 data)
        file: file,
      };
      setImages(updatedImages);
    };

    reader.readAsDataURL(file); // Start reading the file
  };

  const handleRemoveChurchImage = (index) => {
    const newImages = churchImages.filter((_, i) => i !== index);
    setChurchImages(newImages);
  };

  const handleAddChurchImage = () => {
    setChurchImages([...churchImages, { base64Image: "", photographer: "" }]);
  };

  const handleNewChurch = () => {
    const churchData = {
      ...churchToEdit,
      images: churchImages.map((image) => ({
        ...image,
        base64Image: image.base64Image || image.url, // Use URL if base64 is not available
      })),
      bibliographyReference: churchToEdit.bibliographyReference,
      imageUrlsToRemove: [],
    };
    setIsChurchModalOpen(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setUrlsToRemove([...urlsToRemove, images[index].url]);
    setImages(updatedImages);
  };

  const handleUpdateChurch = async () => {
    const newImages = images.filter((image) => {
      return !churchToEdit.images.some(
        (existingImage) => existingImage.url === image.url
      );
    });

    // const newBibliographyReferences = churchToEdit?.bibliographyReferences;
    // const newBilbiographySources =
    //   churchToEdit?.bibliographySource &&
    //   churchToEdit?.bibliographySource
    //     ?.split(",")
    //     ?.filter((source) => source.trim() !== "");

    console.log(churchToEdit);

    const newBibliographyReferences =
      typeof churchToEdit?.bibliographyReferences === "string"
        ? churchToEdit.bibliographyReferences
            .split("\n")
            .filter((source) => source.trim() !== "")
        : churchToEdit?.bibliographyReferences || [];

    const newBilbiographySources =
      typeof churchToEdit?.bibliographySource === "string"
        ? churchToEdit.bibliographySource
            .split("\n")
            .filter((source) => source.trim() !== "")
        : churchToEdit?.bibliographySource || [];

    const updatedChurch = {
      name: churchToEdit.name,
      description: churchToEdit.description,
      street: churchToEdit.street,
      city: churchToEdit.city,
      state: churchToEdit.state,
      bibliographyReference: newBibliographyReferences,
      bibliographySource: newBilbiographySources,
      images: newImages.map((image) => ({
        base64Image: image.url,
        photographer: image.photographer,
      })),
      imageUrlsToBeRemoved: urlsToRemove,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/churches/${churchToEdit.id}`,
        updatedChurch,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Igreja atualizada com sucesso");
      setIsChurchModalOpen(false);
    } catch (error) {
      toast.error("Erro ao atualizar igreja: " + error.message);
    }
  };

  const handleAddImage = () => {
    setImages([...images, { url: "", photographer: "", file: null }]);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setUrlsToRemove([...urlsToRemove, images[index].url]);
    setImages(updatedImages);
  };

  const handlePublishChurch = async (church) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/churches/${church.id}/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Igreja publicada com sucesso");
      setChurches(
        churches.map((c) =>
          c.id === church.id ? { ...c, isPublished: true } : c
        )
      );
    } catch (error) {
      toast.error("Erro ao publicar a igreja: " + error.message);
    }
  };

  const handlePublish = async (painting) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/paintings/${painting.id}/publish`,
        {}, // Empty object since there is no request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("A Obra foi publicada com sucesso!");
      setPaintings(
        paintings.map((p) =>
          p.id === painting.id ? { ...p, isPublished: true } : p
        )
      );
    } catch (error) {
      toast.error("Erro ao publicar a obra: " + error.message);
    }
  };

  return (
    <Container>
      <h1 style={{ color: colors.darkMain, fontWeight: 400 }}>
        Bem vindo(a) {user?.name ?? "Admin"}!
      </h1>
      <Toaster />
      <DeleteConfirmationModal
        isDeleting={isDeleting}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <SubmitPage painting={paintingToEdit} isEdit={true} />
      </Modal>
      <Modal
        isOpen={isChurchModalOpen}
        onClose={() => setIsChurchModalOpen(false)}
      >
        <ChurchForm>
          <div className="form-container">
            <div className="modal-header">
              <div className="flex-group">
                <h1 className="submit-title">Edite a Igreja</h1>
              </div>
            </div>
            <p className="submit-description">
              Adicione uma igreja ao banco de dados
            </p>
            <div className="form-fields-container">
              <div className="grid-layout">
                <label className="label-wrapper">
                  <p className="input-label">Nome da Igreja *</p>
                  <input
                    type="text"
                    placeholder="Insira o nome da igreja"
                    value={churchToEdit?.name}
                    onChange={(e) =>
                      setChurchToEdit({ ...churchToEdit, name: e.target.value })
                    }
                  />
                </label>
                <label className="label-wrapper">
                  <p className="input-label">Cidade *</p>
                  <input
                    type="text"
                    placeholder="Insira o nome da igreja"
                    value={churchToEdit?.city}
                    onChange={(e) =>
                      setChurchToEdit({ ...churchToEdit, city: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="grid-layout">
                <label className="label-wrapper">
                  <p className="input-label">Estado *</p>
                  <select
                    value={churchToEdit?.state}
                    onChange={(e) =>
                      setChurchToEdit({
                        ...churchToEdit,
                        state: e.target.value,
                      })
                    }
                  >
                    <option value="">Selecione um estado</option>
                    {brazilianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="label-wrapper">
                  <p className="input-label">Rua</p>
                  <input
                    type="text"
                    placeholder="Insira o nome da igreja"
                    value={churchToEdit?.street}
                    onChange={(e) =>
                      setChurchToEdit({
                        ...churchToEdit,
                        street: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <label className="label-wrapper">
                <p className="input-label">Descrição</p>
                <textarea
                  className="big-input"
                  placeholder="Insira uma descrição da obra"
                  value={churchToEdit?.description}
                  onChange={(e) =>
                    setChurchToEdit({
                      ...churchToEdit,
                      description: e.target.value,
                    })
                  }
                />
              </label>
              <label className="label-wrapper">
                <p className="input-label">Fontes Historiográficas</p>
                <textarea
                  className="big-input"
                  placeholder="Insira as fontes"
                  value={
                    Array.isArray(churchToEdit?.bibliographySource)
                      ? churchToEdit.bibliographySource.join("\n\n")
                      : churchToEdit?.bibliographySource || ""
                  }
                  onChange={(e) =>
                    setChurchToEdit({
                      ...churchToEdit,
                      bibliographySource: e.target.value,
                    })
                  }
                />
              </label>
              <label className="label-wrapper">
                <p className="input-label">Referências Bibliográficas</p>
                <textarea
                  className="big-input"
                  placeholder="Insira as Referências"
                  value={
                    Array.isArray(churchToEdit?.bibliographyReferences)
                      ? churchToEdit.bibliographyReferences.join("\n\n")
                      : churchToEdit?.bibliographyReferences || ""
                  }
                  onChange={(e) =>
                    setChurchToEdit({
                      ...churchToEdit,
                      bibliographyReferences: e.target.value,
                    })
                  }
                />
              </label>
              <div className="input-container">
                <p className="input-label">Imagens da Igreja *</p>
                {images.map((image, index) => (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>Image {index + 1}</div>
                      <button onClick={() => handleDeleteImage(index)}>
                        Remover
                      </button>
                    </div>
                    <div>
                      <label className="file-input-wrapper">
                        {image.url ? (
                          <img
                            src={image.url}
                            alt={`Preview ${index}`}
                            style={{
                              width: "150px",
                              height: "auto",
                              display: "block",
                            }}
                          />
                        ) : (
                          <span>
                            Arraste ou Clique para adicionar um arquivo
                          </span>
                        )}
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(index, e)}
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor={`photographer-name-${index}`}>
                        Fótografo:
                      </label>
                      <input
                        type="text"
                        placeholder="Yan Tavares"
                        id={`photographer-name-${index}`}
                        value={image.photographer || ""}
                        onChange={(e) =>
                          handlePhotographerChange(index, e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
                <button onClick={handleAddImage} className="add-gravura-btn">
                  Adicionar Imagem
                </button>
              </div>
            </div>
            <button onClick={() => handleUpdateChurch()} className="submit-btn">
              Atualizar
            </button>
          </div>
        </ChurchForm>
      </Modal>
      <DeleteConfirmationModal
        isDeleting={isDeleting}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeleteChurch}
      />
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
              {!isMobile && (
                <>
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
                </>
              )}
              <a
                onClick={() => handleClick("churches")}
                className={
                  (selectedType === "churches" && "active") || "churches"
                }
              >
                Igrejas
              </a>
            </div>
          </section>

          <section className="table-body">
            {selectedType === "churches" ? (
              <ChurchesTable
                churches={sortedChurches}
                onEdit={handleEditChurch}
                onDelete={handleDeleteChurch}
                onPublish={handlePublishChurch}
                isMobile={isMobile}
                sortState={churchesSort}
                onSort={handleSortChurches}
              />
            ) : (
              <table className="content-table">
                <thead>
                  <tr>
                    <SortableHeader
                      label="Nome"
                      column="title"
                      sortState={paintingsSort}
                      onSort={handleSortPaintings}
                    />
                    <SortableHeader
                      label="Status"
                      column="status"
                      sortState={paintingsSort}
                      onSort={handleSortPaintings}
                    />
                    {!isMobile && (
                      <>
                        <SortableHeader
                          label="Usuário"
                          column="registeredBy"
                          sortState={paintingsSort}
                          onSort={handleSortPaintings}
                        />
                        <SortableHeader
                          label="Submissão"
                          column="submittedAt"
                          sortState={paintingsSort}
                          onSort={handleSortPaintings}
                        />
                        <SortableHeader
                          label="Igreja"
                          column="church.name"
                          sortState={paintingsSort}
                          onSort={handleSortPaintings}
                        />
                        <th>Opções</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {sortedPaintings.map((painting) => (
                    <PaintingRow
                      key={painting.id}
                      painting={painting}
                      onEdit={() => handleEdit(painting.id)}
                      onDelete={() => handleDelete(painting.id)}
                      onPublish={() => handlePublish(painting)}
                      isMobile={isMobile}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </main>
      )}

      <ExitContainer>
        <ExitButton onClick={handleExit}>Sair</ExitButton>
      </ExitContainer>
    </Container>
  );
}

function PaintingRow({ painting, onEdit, onDelete, onPublish, isMobile }) {
  return (
    <tr>
      <td>{painting.title}</td>
      <td>
        <span className={painting.isPublished ? "Published" : "Publish-btn"}>
          {painting.isPublished ? (
            "Publicada"
          ) : (
            <button onClick={onPublish}>Publicar</button>
          )}
        </span>
      </td>
      {!isMobile && (
        <>
          <td>{painting.registeredBy}</td>
          <td>
            {new Date(painting.submittedAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </td>
          <td title={painting.church?.name || "—"}>
            {painting.church?.name
              ? painting.church.name.length > 15
                ? painting.church.name.slice(0, 15) + "..."
                : painting.church.name
              : "—"}
          </td>

          <td style={{ display: "flex" }}>
            <OptionButton onEdit={onEdit} onDelete={onDelete} />
          </td>
        </>
      )}
    </tr>
  );
}

function ChurchesTable({
  churches,
  onEdit,
  onDelete,
  onPublish,
  isMobile,
  sortState,
  onSort,
}) {
  return (
    <table className="content-table">
      <thead>
        <tr>
          <SortableHeader
            label="Nome"
            column="name"
            sortState={sortState}
            onSort={onSort}
          />
          <SortableHeader
            label="Status"
            column="status"
            sortState={sortState}
            onSort={onSort}
          />
          {!isMobile && (
            <>
              <SortableHeader
                label="Cidade"
                column="city"
                sortState={sortState}
                onSort={onSort}
              />
              <SortableHeader
                label="Estado"
                column="state"
                sortState={sortState}
                onSort={onSort}
              />
              <th>Opções</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {churches.map((church) => (
          <tr key={church.id}>
            <td>{church.name}</td>
            <td>
              <span className={church.isPublished ? "Published" : "Pending"}>
                {church.isPublished ? (
                  "Publicada"
                ) : (
                  <button onClick={() => onPublish(church)}>Publicar</button>
                )}
              </span>
            </td>
            {!isMobile && (
              <>
                <td>{church.city}</td>
                <td>{church.state}</td>
                <td>
                  <OptionButton
                    onEdit={() => onEdit(church)}
                    onDelete={() => onDelete(church.id)}
                  />
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
