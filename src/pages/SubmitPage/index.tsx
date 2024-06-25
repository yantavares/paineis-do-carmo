import React, { useState, useEffect, useCallback } from "react";
import { Container } from "./styles";
import { Upload, PlusCircle, X as CloseIcon } from "lucide-react";
import TagInput from "../TagInput";
import Modal from "../../components/Modal";
import { X } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const useFilePreview = (photographerName) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [imageObjects, setImageObjects] = useState<
    { Base64Image: string; Photographer: string | null }[]
  >([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setFiles(filesArray);

      const base64Promises = filesArray.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              resolve(reader.result.toString());
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(base64Promises).then((results) => {
        const imageObjects = results.map((result) => ({
          Base64Image: result,
          Photographer: photographerName || null,
        }));
        setImageObjects(imageObjects);
        setPreviews(results.filter((result) => typeof result === "string") as string[]);
      });
    }
  };

  return { files, previews, imageObjects, handleFileChange };
};

const useSingleFilePreview = (photographerName, gravuraName) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageObject, setImageObject] = useState<{
    Base64Image: string;
    Photographer: string | null;
    Name: string | null;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const base64Image = reader.result.toString();
          setImageObject({
            Base64Image: base64Image,
            Photographer: photographerName || null,
            Name: gravuraName || null,
          });
          setPreview(base64Image);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return { file, preview, imageObject, handleFileChange };
};

const GravuraInput: React.FC<{
  index: number;
  gravura: any;
  onGravuraChange: (index: number, gravura: any) => void;
  onRemove: (index: number) => void;
}> = ({ index, gravura, onGravuraChange, onRemove }) => {
  const [gravuraName, setGravuraName] = useState(gravura.Name || "");
  const [gravuraPhotographer, setGravuraPhotographer] = useState(gravura.Photographer || "");

  const { preview, imageObject, handleFileChange } = useSingleFilePreview(
    gravuraPhotographer,
    gravuraName
  );

  useEffect(() => {
    if (imageObject) {
      onGravuraChange(index, {
        ...imageObject,
        Name: gravuraName,
        Photographer: gravuraPhotographer,
      });
    }
  }, [imageObject, gravuraName, gravuraPhotographer, index, onGravuraChange]);

  return (
    <div
      className="input-container"
      style={{ marginBottom: "2rem" }}>
      <div className="flex-group">
        <p className="input-label">Gravura {index + 1}</p>
        <button
          onClick={() => onRemove(index)}
          className="close-btn"
          aria-label="Remove Gravura">
          <CloseIcon size={20} />
        </button>
      </div>
      <label className="file-input-wrapper">
        {preview ? (
          <div className="preview-container">
            <img
              src={preview}
              alt="Gravura Preview"
              style={{ maxWidth: "100%", maxHeight: "100px" }}
            />
          </div>
        ) : (
          <>
            <Upload size="20" />
            <p>Clique para fazer o upload ou arraste e solte</p>
          </>
        )}
        <input
          type="file"
          onChange={handleFileChange}
        />
      </label>
      <div className="grid-layout">
        <label className="label-wrapper">
          <p className="input-label">Nome da Gravura</p>
          <input
            type="text"
            placeholder="Insira o nome da gravura"
            value={gravuraName}
            onChange={(e) => {
              setGravuraName(e.target.value);
              onGravuraChange(index, {
                ...gravura,
                Name: e.target.value,
                Photographer: gravuraPhotographer,
              });
            }}
          />
        </label>
        <label className="label-wrapper">
          <p className="input-label">Fotógrafo da Gravura</p>
          <input
            type="text"
            placeholder="Insira o nome do fotógrafo"
            value={gravuraPhotographer}
            onChange={(e) => {
              setGravuraPhotographer(e.target.value);
              onGravuraChange(index, {
                ...gravura,
                Name: gravuraName,
                Photographer: e.target.value,
              });
            }}
          />
        </label>
      </div>
    </div>
  );
};

const DynamicImageInput = ({ index, image, onImageChange, onRemove }) => {
  const [photographer, setPhotographer] = useState(image.Photographer || "");
  const { preview, handleFileChange } = useSingleFilePreview(photographer, "");

  useEffect(() => {
    if (preview && (image.Base64Image !== preview || image.Photographer !== photographer)) {
      onImageChange(index, { Base64Image: preview, Photographer: photographer });
    }
  }, [preview, photographer, index, image.Base64Image, image.Photographer, onImageChange]);

  return (
    <div
      className="input-container"
      style={{ marginBottom: "2rem" }}>
      <div className="flex-group">
        <p className="input-label">Imagem {index + 1}</p>
        <button
          onClick={() => onRemove(index)}
          className="close-btn"
          aria-label="Remove Image">
          <CloseIcon size={20} />
        </button>
      </div>
      <label className="file-input-wrapper">
        {preview ? (
          <div className="preview-container">
            <img
              src={preview}
              alt={`Preview ${index}`}
              style={{ maxWidth: "100%", maxHeight: "100px" }}
            />
          </div>
        ) : (
          <>
            <Upload size="20" />
            <p>Clique para fazer o upload ou arraste e solte</p>
          </>
        )}
        <input
          type="file"
          onChange={handleFileChange}
        />
      </label>
      <label className="label-wrapper">
        <p className="input-label">Fotógrafo</p>
        <input
          type="text"
          placeholder="Insira o nome do fotógrafo"
          value={photographer}
          onChange={(e) => setPhotographer(e.target.value)}
        />
      </label>
    </div>
  );
};

const SubmitPage: React.FC = () => {
  const [photographer, setPhotographer] = useState("");
  const [gravuras, setGravuras] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [churchImages, setChurchImages] = useState<any[]>([]);
  const [allTags, setAllTags] = useState<{ id: string; name: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<{ id: string; name: string }[]>([]);
  const [newTags, setNewTags] = useState<{ id: string; name: string }[]>([]);
  const [artifices, setArtifices] = useState<any[]>([]);
  const [newAuthor, setNewAuthor] = useState({ name: "", biography: "" });

  const [church, setChurch] = useState({
    name: "",
    description: "",
    city: "",
    state: "",
    street: "",
    bibliographicSources: "",
    bibliographicReferences: "",
  });

  const [churches, setChurches] = useState([]);

  const [authors, setAuthors] = useState([
    { name: "Author A", id: "1" },
    { name: "Author B", id: "2" },
    { name: "Author C", id: "3" },
  ]);

  const brazilianStates = [
    "AP",
    "AC",
    "AL",
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

  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isChurchModalOpen, setIsChurchModalOpen] = useState(false);

  const [obra, setObra] = useState({
    name: "",
    description: "",
    bibliographicReferences: "",
    bibliographicSources: "",
    dateOfCreation: "",
    placement: "",
    tags: [],
    churchId: "",
    authorId: "",
    imagens: [],
  });

  const fetchAllTags = async () => {
    try {
      const response = await axios.get(
        "https://api-museubarroco-east-dev.azurewebsites.net/api/tags"
      );
      console.log("Fetched tags:", response.data);
      setAllTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchAllChurches = async () => {
    try {
      const response = await axios.get(
        "https://api-museubarroco-east-dev.azurewebsites.net/api/churches"
      );
      console.log("Fetched churches:", response.data);
      setChurches(response.data);
    } catch (error) {
      console.error("Error fetching churches:", error);
    }
  };

  useEffect(() => {
    fetchAllTags();
    fetchAllChurches();
  }, []);

  useEffect(() => {
    setObra((prevObra) => ({
      ...prevObra,
      imagens: images,
      tags: selectedTags.map((tag) => tag.id), // Adjusted to use tag IDs
    }));
  }, [images, selectedTags]);

  const handleNewObra = async () => {
    const existingTagNames = allTags.map((tag) => tag.name.toLowerCase());
    const newTagsToCreate = selectedTags.filter(
      (tag) => !existingTagNames.includes(tag.name.toLowerCase())
    );

    console.log("New tags to create:", newTagsToCreate);

    const newTagIds = [];

    // Create new tags in the database individually
    for (const newTag of newTagsToCreate) {
      try {
        const response = await axios.post(
          "https://api-museubarroco-east-dev.azurewebsites.net/api/tags",
          { name: newTag.name }
        );
        console.log("Created tag:", response.data);

        const createdTagId = response.data; // Adjusted to get the id from response
        newTagIds.push(createdTagId.toString());

        // Update selectedTags with the new ID
        const updatedSelectedTags = selectedTags.map((tag) =>
          tag.name.toLowerCase() === newTag.name.toLowerCase()
            ? { ...tag, id: createdTagId.toString() }
            : tag
        );
        setSelectedTags(updatedSelectedTags);
      } catch (error) {
        console.error(`Error creating tag "${newTag.name}":`, error);
        toast.error(`Erro ao criar a tag "${newTag.name}": ${error.message}`);
      }
    }

    console.log("New tag IDs:", newTagIds);

    // Combine the existing tags' IDs with the new tag IDs
    const allTagIds = [...selectedTags.map((tag) => tag.id).filter((id) => id), ...newTagIds];

    // Update obra with all tag IDs
    setObra((prevObra) => ({
      ...prevObra,
      tags: allTagIds,
    }));

    console.log("Obra with all tags:", allTagIds);

    // Construct the payload for obra submission
    const payload = {
      title: obra.name,
      description: obra.description,
      images: images.map((img) => ({
        base64Image: img.Base64Image,
        photographer: img.Photographer,
      })),
      dateOfCreation: obra.dateOfCreation,
      bibliographySource: obra.bibliographicSources,
      bibliographyReference: [obra.bibliographicReferences],
      engravingRequests: gravuras.map((gravura) => ({
        name: gravura.Name,
        base64Image: gravura.Base64Image,
        createdBy: gravura.Photographer,
      })),
      placement: obra.placement,
      artisan: obra.authorId.toString(),
      churchId: obra.churchId.toString(),
      tagIds: allTagIds, // Ensure tags are strings
    };

    console.log("Payload:", payload);

    try {
      const response = await axios.post(
        "https://api-museubarroco-east-dev.azurewebsites.net/api/paintings",
        payload
      );
      console.log("Success:", response.data);
      toast.success("Obra submetida com Sucesso", {
        duration: 3000, // 5 seconds
        style: {
          fontSize: "16px", // Increase font size
          padding: "20px", // Increase padding
        },
      });

      // Reset form fields
      setObra({
        name: "",
        description: "",
        bibliographicReferences: "",
        bibliographicSources: "",
        dateOfCreation: "",
        placement: "",
        tags: [],
        churchId: "",
        authorId: "",
        imagens: [],
      });
      setImages([]);
      setSelectedTags([]);
      setGravuras([]);
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error(`Erro ao submeter a obra: ${error.message}`, {
        duration: 3000, // 5 seconds
        style: {
          fontSize: "16px", // Increase font size
          padding: "20px", // Increase padding
        },
      });
    }
  };

  const handleAddGravura = () => {
    setGravuras((prevGravuras) => [
      ...prevGravuras,
      { Name: "", Base64Image: "", Photographer: "" },
    ]);
  };

  const handleGravuraChange = useCallback((index: number, gravura: any) => {
    setGravuras((prevGravuras) => {
      const newGravuras = [...prevGravuras];
      newGravuras[index] = gravura;
      return newGravuras;
    });
  }, []);

  const handleRemoveGravura = (index: number) => {
    setGravuras((prevGravuras) => prevGravuras.filter((_, i) => i !== index));
  };

  const handleAddImage = () => {
    setImages((prevImages) => [...prevImages, { Base64Image: "", Photographer: "" }]);
  };

  const handleImageChange = (index, image) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = image;
      return newImages;
    });
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleAddChurchImage = () => {
    setChurchImages((prevChurchImages) => [
      ...prevChurchImages,
      { Base64Image: "", Photographer: "" },
    ]);
  };

  const handleChurchImageChange = (index, image) => {
    setChurchImages((prevChurchImages) => {
      const newChurchImages = [...prevChurchImages];
      newChurchImages[index] = image;
      return newChurchImages;
    });
  };

  const handleRemoveChurchImage = (index) => {
    setChurchImages((prevChurchImages) => prevChurchImages.filter((_, i) => i !== index));
  };

  const handleNewChurch = async () => {
    const payload = {
      name: church.name,
      description: church.description,
      street: church.street,
      city: church.city,
      state: church.state,
      images: churchImages.map((img) => ({
        base64Image: img.Base64Image,
        photographer: img.Photographer,
      })),
      bibliographyReference: [church.bibliographicReferences],
    };

    console.log("New Church Payload:", payload);

    try {
      const response = await axios.post(
        "https://api-museubarroco-east-dev.azurewebsites.net/api/churches",
        payload
      );
      console.log("New Church Added:", response.data);
      toast.success("Igreja adicionada com sucesso!", {
        duration: 3000, // 5 seconds
        style: {
          fontSize: "16px", // Increase font size
          padding: "20px", // Increase padding
        },
      });

      setIsChurchModalOpen(false);
      fetchAllChurches(); // Fetch the updated list of churches after adding the new one

      // Reset church form fields
      setChurch({
        name: "",
        description: "",
        city: "",
        state: "",
        street: "",
        bibliographicSources: "",
        bibliographicReferences: "",
      });
      setChurchImages([]);
    } catch (error) {
      console.error("Error posting new church:", error);
      toast.error(`Erro ao adicionar igreja: ${error.message}`);
    }
  };

  const handleNewAuthor = () => {
    console.log("New Author", newAuthor);
    setAuthors((prevAuthors) => [
      ...prevAuthors,
      { name: newAuthor.name, id: (prevAuthors.length + 1).toString() },
    ]);
    setNewAuthor({ name: "", biography: "" });
    setIsAuthorModalOpen(false);
  };

  return (
    <Container>
      <Toaster />
      <div
        className="form-container"
        style={{ marginTop: "4rem", borderRadius: "2rem" }}>
        <h1 className="submit-title">Submeta uma Obra</h1>
        <p className="submit-description">
          Submeta uma obra para ser adicionada ao nosso banco de dados
        </p>
        <div className="form-fields-container">
          <label className="label-wrapper">
            <p className="input-label">Nome da Obra</p>
            <input
              type="text"
              placeholder="Insira o nome da obra"
              value={obra.name}
              onChange={(e) => setObra({ ...obra, name: e.target.value })}
            />
          </label>
          <div className="grid-layout">
            <label className="label-wrapper">
              <p className="input-label">Igreja</p>
              <div className="flex-layout">
                <select
                  value={obra.churchId}
                  onChange={(e) => setObra({ ...obra, churchId: e.target.value })}>
                  <option value="">Selecione uma igreja</option>
                  {churches.map((church) => (
                    <option
                      key={church.id}
                      value={church.id}>
                      {church.name}
                    </option>
                  ))}
                </select>
                <button
                  className="church-form"
                  style={{ height: "40px", display: "grid", placeContent: "center" }}
                  onClick={() => setIsChurchModalOpen(true)}>
                  <PlusCircle size={20} />
                </button>
              </div>
            </label>
            <label className="label-wrapper">
              <p className="input-label">Autor</p>
              <div className="flex-layout">
                <select
                  value={obra.authorId}
                  onChange={(e) => setObra({ ...obra, authorId: e.target.value })}>
                  <option value="">Selecione um Artíficie</option>
                  {authors.map((author) => (
                    <option
                      key={author.id}
                      value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
                <button
                  className="author-form"
                  style={{ height: "40px", display: "grid", placeContent: "center" }}
                  onClick={() => setIsAuthorModalOpen(true)}>
                  <PlusCircle size={20} />
                </button>
              </div>
            </label>
          </div>
          <label
            className="label-wrapper"
            style={{ marginBottom: "1rem" }}>
            <p className="input-label">Descrição</p>
            <textarea
              placeholder="Insira uma descrição da obra"
              value={obra.description}
              onChange={(e) => setObra({ ...obra, description: e.target.value })}
            />
          </label>
          <div className="grid-layout">
            <label className="label-wrapper">
              <p className="input-label">Fontes Bibliográficas</p>
              <textarea
                placeholder="Insira as fontes"
                value={obra.bibliographicSources}
                onChange={(e) => setObra({ ...obra, bibliographicSources: e.target.value })}
              />
            </label>
            <label className="label-wrapper">
              <p className="input-label">Referências Bibliográficas</p>
              <textarea
                placeholder="Insira as fontes"
                value={obra.bibliographicReferences}
                onChange={(e) => setObra({ ...obra, bibliographicReferences: e.target.value })}
              />
            </label>
          </div>
          <div className="grid-layout">
            <label className="label-wrapper">
              <p className="input-label">Data da criação</p>
              <input
                type="text"
                placeholder="Século XVII, 1918, etc."
                value={obra.dateOfCreation}
                onChange={(e) => setObra({ ...obra, dateOfCreation: e.target.value })}
              />
            </label>
            <label className="label-wrapper">
              <p className="input-label">Onde está Posicionada</p>
              <input
                type="text"
                placeholder="No teto"
                value={obra.placement}
                onChange={(e) => setObra({ ...obra, placement: e.target.value })}
              />
            </label>
          </div>
          <label className="label-wrapper">
            <p className="input-label">Tags para indexação</p>
            <TagInput
              allTags={allTags}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />
          </label>
          <div className="input-container">
            <p className="input-label">Imagens da Obra</p>
            {images.map((image, index) => (
              <DynamicImageInput
                key={index}
                index={index}
                image={image}
                onImageChange={handleImageChange}
                onRemove={handleRemoveImage}
              />
            ))}
            <button
              onClick={handleAddImage}
              className="add-gravura-btn"
              style={{ marginBottom: "2rem" }}>
              Adicionar Imagem
            </button>
          </div>
        </div>
        {gravuras.map((gravura, index) => (
          <GravuraInput
            key={index}
            index={index}
            gravura={gravura}
            onGravuraChange={handleGravuraChange}
            onRemove={handleRemoveGravura}
          />
        ))}
        <button
          style={{ display: "block", width: "100%" }}
          onClick={handleAddGravura}
          className="add-gravura-btn">
          Adicionar Gravura
        </button>
        <button
          onClick={handleNewObra}
          className="submit-btn">
          Submeter
        </button>
      </div>

      {/* Modal for Author Form */}
      <Modal
        isOpen={isAuthorModalOpen}
        onClose={() => setIsAuthorModalOpen(false)}>
        <div className="form-container">
          <div className="modal-header">
            <div className="flex-group">
              <h1 className="submit-title">Crie um novo Artíficie</h1>
              <button
                onClick={() => setIsAuthorModalOpen(false)}
                aria-label="Close modal"
                className="close-btn">
                <X />
              </button>
            </div>
          </div>
          <p className="submit-description">Adicione um novo artíficie ao banco de dados</p>
          <div className="form-fields-container">
            <div className="grid-layout">
              <label className="label-wrapper">
                <p className="input-label">Nome do Artífice</p>
                <input
                  type="text"
                  placeholder="Insira o nome do Artífice"
                  value={newAuthor.name}
                  onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                />
              </label>
              <label className="label-wrapper">
                <p className="input-label">Biografia</p>
                <input
                  type="text"
                  placeholder="Insira a Biografia do artífice"
                  value={newAuthor.biography}
                  onChange={(e) => setNewAuthor({ ...newAuthor, biography: e.target.value })}
                />
              </label>
            </div>
          </div>
          <button
            onClick={handleNewAuthor}
            className="submit-btn">
            Adicionar Artífice
          </button>
        </div>
      </Modal>

      {/* Modal for Church Form */}
      <Modal
        isOpen={isChurchModalOpen}
        onClose={() => setIsChurchModalOpen(false)}>
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
                <p className="input-label">Nome da Igreja</p>
                <input
                  type="text"
                  placeholder="Insira o nome da igreja"
                  value={church.name}
                  onChange={(e) => setChurch({ ...church, name: e.target.value })}
                />
              </label>
              <label className="label-wrapper">
                <p className="input-label">Cidade*</p>
                <input
                  type="text"
                  placeholder="Insira o nome da igreja"
                  value={church.city}
                  onChange={(e) => setChurch({ ...church, city: e.target.value })}
                />
              </label>
            </div>
            <div className="grid-layout">
              <label className="label-wrapper">
                <p className="input-label">Estado*</p>
                <select
                  value={church.state}
                  onChange={(e) => setChurch({ ...church, state: e.target.value })}>
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
                  value={church.street}
                  onChange={(e) => setChurch({ ...church, street: e.target.value })}
                />
              </label>
            </div>
            <label className="label-wrapper">
              <p className="input-label">Descrição</p>
              <textarea
                placeholder="Insira uma descrição da obra"
                value={church.description}
                onChange={(e) => setChurch({ ...church, description: e.target.value })}
              />
            </label>
            <div className="grid-layout">
              <label className="label-wrapper">
                <p className="input-label">Fontes Bibliográficas</p>
                <textarea
                  placeholder="Insira as fontes"
                  value={church.bibliographicSources}
                  onChange={(e) => setChurch({ ...church, bibliographicSources: e.target.value })}
                />
              </label>
              <label className="label-wrapper">
                <p className="input-label">Referências Bibliográficas</p>
                <textarea
                  placeholder="Insira as fontes"
                  value={church.bibliographicReferences}
                  onChange={(e) =>
                    setChurch({ ...church, bibliographicReferences: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="input-container">
              <p className="input-label">Imagens da Igreja</p>
              {churchImages.map((image, index) => (
                <DynamicImageInput
                  key={index}
                  index={index}
                  image={image}
                  onImageChange={handleChurchImageChange}
                  onRemove={handleRemoveChurchImage}
                />
              ))}
              <button
                onClick={handleAddChurchImage}
                className="add-gravura-btn">
                Adicionar Imagem
              </button>
            </div>
          </div>
          <button
            onClick={handleNewChurch}
            className="submit-btn">
            Submeter
          </button>
        </div>
      </Modal>
    </Container>
  );
};

export default SubmitPage;
