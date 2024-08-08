import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import DeleteConfirmationModal from "src/components/DeleteModal";
import Modal from "src/components/Modal"; // Import a modal component for displaying the form
import OptionButton from "src/components/OptionButton";
import SubmitPage from "src/pages/SubmitPage"; // Import your SubmitPage component here
import { Container, ExitButton, ExitContainer, ChurchForm } from "./styles";
import { useNavigate } from "react-router-dom";
import { X, Upload } from "lucide-react";
import { stringify } from "querystring";

const fetchPaintings = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/paintings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching paintings:", error);
    throw error;
  }
};

const fetchChurches = async () => {
  try {
    const response = await axios.get(
      "https://api-museubarroco-east-dev.azurewebsites.net/api/churches?IsPublishedFilter=true"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching churches:", error);
    throw error;
  }
};

export default function Dashboard() {
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
      setIsLoading(false);
    };

    const getChurches = async () => {
      const data = await fetchChurches();
      setChurches(data);
    };

    getPaintings();
    getChurches();
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
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/paintings/${id}`);
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
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/paintings/${paintingToDelete}`);
      toast.success("Painting deleted successfully");
      setPaintings(paintings.filter((painting) => painting.id !== paintingToDelete));
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Error deleting painting: " + error.message);
    }
  };

  const handleEditChurch = (church) => {
    setChurchToEdit(church);
    setImages(church.images);
    setChurchImages(church.images.map((image) => ({ ...image, base64Image: "" })));
    setIsChurchModalOpen(true);
  };

  const handleDeleteChurch = async (id) => {
    try {
      // Fetch all paintings
      const response = await axios.get(
        "https://api-museubarroco-east-dev.azurewebsites.net/api/paintings"
      );
      const paintings = response.data;
      // Check if any painting is associated with the church
      const isPaintingAssociated = paintings.some((painting) => painting.church.id === id);

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
        `https://api-museubarroco-east-dev.azurewebsites.net/api/churches/${deleteChurchId}`
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
      bibliographyReference: churchToEdit.bibliographyReference.split(";"),
      imageUrlsToRemove: [],
    };
    console.log(churchData);
    setIsChurchModalOpen(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    console.log(images[index].url);
    setUrlsToRemove([...urlsToRemove, images[index].url]);
    setImages(updatedImages);
  };

  // Promise.all(base64Promises).then((results) => {
  //   const newImageObjects = results.map((result) => ({
  //     Base64Image: result,
  //     Photographer: null,
  //   }));
  //   setImageObjects((prev) => [...prev, ...newImageObjects]);
  //   setPreviews((prev) => [...prev, ...results]);
  // });

  const handleUpdateChurch = async () => {
    const newImages = images.filter((image) => {
      return !churchToEdit.images.some((existingImage) => existingImage.url === image.url);
    });

    const updatedChurch = {
      name: churchToEdit.name,
      description: churchToEdit.description,
      street: churchToEdit.street,
      city: churchToEdit.city,
      state: churchToEdit.state,
      bibliographyReference: churchToEdit.bibliographyReference.split(";"),
      images: newImages.map((image) => ({
        base64Image: image.url,
        photographer: image.photographer,
      })),
      imageUrlsToRemove: urlsToRemove,
    };

    console.log(JSON.stringify(updatedChurch));

    try {
      await axios.put(
        `https://api-museubarroco-east-dev.azurewebsites.net/api/churches/${churchToEdit.id}`,
        updatedChurch
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
    console.log(images[index].url);
    setUrlsToRemove([...urlsToRemove, images[index].url]);
    setImages(updatedImages);
  };

  console.log(churchToEdit);

  return (
    <Container>
      <Toaster />
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
      <Modal
        isOpen={isChurchModalOpen}
        onClose={() => setIsChurchModalOpen(false)}>
        <ChurchForm>
          <div className="form-container">
            <div className="modal-header">
              <div className="flex-group">
                <h1 className="submit-title">Crie uma nova Igreja</h1>
                <button
                  onClick={() => setIsChurchModalOpen(false)}
                  aria-label="Close modal"
                  className="close-btn">
                  <X />
                </button>
              </div>
            </div>
            <p className="submit-description">Adicione uma igreja ao banco de dados</p>
            <div className="form-fields-container">
              <div className="grid-layout">
                <label className="label-wrapper">
                  <p className="input-label">Nome da Igreja *</p>
                  <input
                    type="text"
                    placeholder="Insira o nome da igreja"
                    value={churchToEdit?.name}
                    onChange={(e) => setChurchToEdit({ ...churchToEdit, name: e.target.value })}
                  />
                </label>
                <label className="label-wrapper">
                  <p className="input-label">Cidade *</p>
                  <input
                    type="text"
                    placeholder="Insira o nome da igreja"
                    value={churchToEdit?.city}
                    onChange={(e) => setChurchToEdit({ ...churchToEdit, city: e.target.value })}
                  />
                </label>
              </div>
              <div className="grid-layout">
                <label className="label-wrapper">
                  <p className="input-label">Estado *</p>
                  <select
                    value={churchToEdit?.state}
                    onChange={(e) => setChurchToEdit({ ...churchToEdit, state: e.target.value })}>
                    <option value="">Selecione um estado</option>
                    {brazilianStates.map((state) => (
                      <option
                        key={state}
                        value={state}>
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
                    onChange={(e) => setChurchToEdit({ ...churchToEdit, street: e.target.value })}
                  />
                </label>
              </div>
              <label className="label-wrapper">
                <p className="input-label">Descrição</p>
                <textarea
                  placeholder="Insira uma descrição da obra"
                  value={churchToEdit?.description}
                  onChange={(e) =>
                    setChurchToEdit({ ...churchToEdit, description: e.target.value })
                  }
                />
              </label>
              <div className="grid-layout">
                <label className="label-wrapper">
                  <p className="input-label">Fontes Bibliográficas</p>
                  <textarea
                    placeholder="Insira as fontes"
                    value={churchToEdit?.bibliographySource}
                    onChange={(e) =>
                      setChurchToEdit({
                        ...churchToEdit,
                        bibliographicSources: e.target.value,
                      })
                    }
                  />
                </label>
                <label className="label-wrapper">
                  <p className="input-label">Referências Bibliográficas</p>
                  <textarea
                    placeholder="Insira as fontes"
                    value={churchToEdit?.bibliographyReference}
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
                      }}>
                      <div>Image {index + 1}</div>
                      <button onClick={() => handleDeleteImage(index)}>Remover</button>
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
                          <span>Arraste ou Clique para adicionar um arquivo</span>
                        )}
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(index, e)}
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor={`photographer-name-${index}`}>Fótografo:</label>
                      <input
                        type="text"
                        placeholder="Yan Tavares"
                        id={`photographer-name-${index}`}
                        value={image.photographer || ""}
                        onChange={(e) => handlePhotographerChange(index, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleAddImage}
                  className="add-gravura-btn">
                  Adicionar Imagem
                </button>
              </div>
            </div>
            <button
              onClick={() => handleUpdateChurch()}
              className="submit-btn">
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
            <a
              onClick={() => handleClick("churches")}
              className={(selectedType === "churches" && "active") || "churches"}>
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
            />
          ) : (
            <table className="content-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Status</th>
                  <th>Usuário</th>
                  <th>
                    <div className="flex-flow">
                      Data de Submissão <button onClick={handleDateArrow}></button>
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
          )}
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
        <OptionButton
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}

function ChurchesTable({ churches, onEdit, onDelete }) {
  return (
    <table className="content-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {churches.map((church) => (
          <tr key={church.id}>
            <td>{church.name}</td>
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
