import axios from "axios";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "src/components/DeleteModal";
import Modal from "src/components/Modal";
import OptionButton from "src/components/OptionButton";
import SubmitPage from "src/pages/SubmitPage";
import colors from "src/utils/colors";
import { ChurchForm, Container, ExitButton, ExitContainer } from "./styles";
import { useAuth } from "src/context/AuthContext";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteChurchId, setDeleteChurchId] = useState(null);
  const [isChurchModalOpen, setIsChurchModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [churchToEdit, setChurchToEdit] = useState(null);
  const [churchImages, setChurchImages] = useState([]);
  const [urlsToRemove, setUrlsToRemove] = useState([]);
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
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/churches/authorized`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching churches:", error);
      throw error;
    }
  };

  const navigate = useNavigate();

  const fetchPaintings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/paintings/authorized`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error("Error fetching paintings:", error);
      setIsLoading(false);
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

  const filteredPaintings =
    selectedType === "all"
      ? paintings
      : selectedType === "published"
      ? paintings.filter((painting) => painting.isPublished)
      : paintings.filter((painting) => !painting.isPublished);

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

    const updatedChurch = {
      name: churchToEdit.name,
      description: churchToEdit.description,
      street: churchToEdit.street,
      city: churchToEdit.city,
      state: churchToEdit.state,
      bibliographyReference: [...churchToEdit.bibliographyReferences],
      bibliographySource: [...churchToEdit.bibliographySource],
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
    console.log("Publish Church", church);
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
      <h1 style={{ color: colors.darkGreen, fontWeight: 400 }}>
        Bem vindo(a) {user?.name ?? "Admin"}!
      </h1>
      <Toaster />
      <DeleteConfirmationModal
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
              <div className="grid-layout">
                <label className="label-wrapper">
                  <p className="input-label">Fontes Bibliográficas</p>
                  <textarea
                    placeholder="Insira as fontes"
                    value={churchToEdit?.bibliographySource || ""}
                    onChange={(e) =>
                      setChurchToEdit({
                        ...churchToEdit,
                        bibliographySource: e.target.value, // Corrected this line
                      })
                    }
                  />
                </label>
                <label className="label-wrapper">
                  <p className="input-label">Referências Bibliográficas</p>
                  <textarea
                    placeholder="Insira as fontes"
                    value={churchToEdit?.bibliographyReferences}
                    onChange={(e) =>
                      setChurchToEdit({
                        ...churchToEdit,
                        bibliographicReferences: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeleteChurch}
      />
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
              churches={churches}
              onEdit={handleEditChurch}
              onDelete={handleDeleteChurch}
              onPublish={handlePublishChurch}
            />
          ) : (
            <table className="content-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Status</th>
                  <th>Usuário</th>
                  <th>
                    <div className="flex-flow">Data de Submissão</div>
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
                    onPublish={() => handlePublish(painting)}
                  />
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>

      <ExitContainer>
        <ExitButton onClick={handleExit}>Sair</ExitButton>
      </ExitContainer>
    </Container>
  );
}

function PaintingRow({ painting, onEdit, onDelete, onPublish }) {
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

function ChurchesTable({ churches, onEdit, onDelete, onPublish }) {
  return (
    <table className="content-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Status</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Opções</th>
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
            <td>{church.city}</td>
            <td>{church.state}</td>
            <td>
              <OptionButton
                onEdit={() => onEdit(church)}
                onDelete={() => onDelete(church.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
