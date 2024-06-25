import React, { useState, useEffect, useCallback } from "react";
import { Container } from "./styles";
import { Upload, PlusCircle, X as CloseIcon } from "lucide-react";
import TagInput from "../../pages/TagInput";
import Modal from "../../components/Modal";
import { X } from "lucide-react";
import axios from "axios";

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
    <div className="input-container">
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

const DashForm: React.FC = () => {
  const [photographer, setPhotographer] = useState("");
  const [gravuras, setGravuras] = useState<any[]>([]);
  // Declare the all tags as an array of objects with name string and id string
  const [allTags, setAllTags] = useState<{ id: string; name: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<{ id: string; name: string }[]>([]); // Selected tags by the user
  const [newTags, setNewTags] = useState<{ id: string; name: string }[]>([]); // New tags to be created

  const churchOptions = [
    { name: "Church A", id: "1" },
    { name: "Church B", id: "2" },
    { name: "Church C", id: "3" },
  ]; // Example church options

  const artisanOptions = [
    { name: "Artisan A", id: "1" },
    { name: "Artisan B", id: "2" },
    { name: "Artisan C", id: "3" },
  ]; // Example artisan options

  const {
    previews: previewObras,
    imageObjects: obrasObjects,
    handleFileChange: handleObrasChange,
  } = useFilePreview(photographer);

  const {
    previews: previewArtistas,
    imageObjects: artistasObjects,
    handleFileChange: handleArtistasChange,
  } = useFilePreview(photographer);

  const {
    previews: previewIgrejas,
    imageObjects: igrejasObjects,
    handleFileChange: handleIgrejasChange,
  } = useFilePreview(photographer);

  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isChurchModalOpen, setIsChurchModalOpen] = useState(false);

  const [obra, setObra] = useState({
    Title: "",
    Description: "",
    isPublic: true,
    Placement: "",
    Images: [],
    EngravingRequests: [],
    DateOfCreation: "",
    BibliographySource: "",
    BibliographyReference: "",
    ChurchId: "",
    UserId: "9424833e-72d3-46c3-a396-f0646486e384",
    TagsIds: [],
    ArtisanIds: "",
  });

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const response = await axios.get(
          "https://b0f1-2804-14c-658b-4c9b-b129-60f2-f3d4-eb98.ngrok-free.app/api/tags"
        );
        console.log("All tags:", response.data);
        setAllTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchAllTags();
  }, []);

  useEffect(() => {
    setObra((prevObra) => ({
      ...prevObra,
      Images: obrasObjects,
      EngravingRequests: gravuras,
      TagsIds: selectedTags.map((tag) => tag.id),
    }));
  }, [obrasObjects, gravuras, selectedTags]);

  const handleNewObra = async () => {
    // Check for new tags that do not exist in allTags
    const existingTagNames = allTags.map((tag) => tag.name.toLowerCase());
    const newTagsToCreate = selectedTags.filter(
      (tag) => !existingTagNames.includes(tag.name.toLowerCase())
    );

    // Create new tags in the database
    if (newTagsToCreate.length > 0) {
      try {
        const response = await fetch("/api/tags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tags: newTagsToCreate.map((tag) => tag.name) }),
        });
        const createdTags = await response.json();
        const newTagIds = createdTags.map((tag) => tag.id);

        // Update obra with new tag IDs
        setObra((prevObra) => ({
          ...prevObra,
          TagsIds: [...prevObra.TagsIds, ...newTagIds],
        }));
      } catch (error) {
        console.error("Error creating new tags:", error);
      }
    }

    // Proceed with the obra submission
    console.log("New Obra", obra);
    // Here, you would typically send the `obra` object to your backend server
  };

  const handleNewArtista = () => {
    console.log("New Artista", artistasObjects);
  };

  const handleNewIgreja = () => {
    console.log("New Igreja", igrejasObjects);
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

  return (
    <Container>
      <div className="form-container">
        <h1 className="submit-title">Submeta uma Obra</h1>
        <p className="submit-description">
          Submeta uma obra para ser adicionada ao nosso banco de dados
        </p>
        <div className="grid-layout">
          <label className="label-wrapper">
            <p className="input-label">Nome da Obra</p>
            <input
              type="text"
              placeholder="Insira o nome da obra"
              value={obra.Title}
              onChange={(e) => setObra({ ...obra, Title: e.target.value })}
            />
          </label>
          <label className="label-wrapper">
            <p className="input-label">Autor</p>
            <div className="flex-layout">
              <select
                value={obra.ArtisanIds}
                onChange={(e) => setObra({ ...obra, ArtisanIds: e.target.value })}>
                <option value="">Selecione um Artíficie</option>
                {artisanOptions.map((artisan) => (
                  <option
                    key={artisan.name}
                    value={artisan.id}>
                    {artisan.name}
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
        <div className="grid-layout">
          <label className="label-wrapper">
            <p className="input-label">Igreja</p>
            <div className="flex-layout">
              <select
                value={obra.ChurchId}
                onChange={(e) => setObra({ ...obra, ChurchId: e.target.value })}>
                <option value="">Selecione uma igreja</option>
                {churchOptions.map((church) => (
                  <option
                    key={church.name}
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
            <p className="input-label">Autoria das Fotos</p>
            <input
              type="text"
              placeholder="ex.: Yan Tavares"
              value={photographer}
              onChange={(e) => setPhotographer(e.target.value)}
            />
          </label>
        </div>
        <label
          className="label-wrapper"
          style={{ marginBottom: "1rem" }}>
          <p className="input-label">Descrição</p>
          <textarea
            placeholder="Insira uma descrição da obra"
            value={obra.Description}
            onChange={(e) => setObra({ ...obra, Description: e.target.value })}
          />
        </label>
        <div className="grid-layout">
          <label className="label-wrapper">
            <p className="input-label">Fontes Bibliográficas</p>
            <textarea
              placeholder="Insira as fontes"
              value={obra.BibliographySource}
              onChange={(e) => setObra({ ...obra, BibliographySource: e.target.value })}
            />
          </label>
          <label className="label-wrapper">
            <p className="input-label">Referências Bibliográficas</p>
            <textarea
              placeholder="Insira as fontes"
              value={obra.BibliographyReference}
              onChange={(e) => setObra({ ...obra, BibliographyReference: e.target.value })}
            />
          </label>
        </div>
        <div className="grid-layout">
          <label className="label-wrapper">
            <p className="input-label">Data da criação</p>
            <input
              type="date"
              value={obra.DateOfCreation}
              onChange={(e) => setObra({ ...obra, DateOfCreation: e.target.value })}
            />
          </label>
          <label className="label-wrapper">
            <p className="input-label">Onde está Posicionada</p>
            <input
              type="text"
              placeholder="No teto"
              value={obra.Placement}
              onChange={(e) => setObra({ ...obra, Placement: e.target.value })}
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
          <label className="file-input-wrapper">
            {previewObras.length > 0 ? (
              <div className="preview-container">
                {previewObras.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Obra Preview ${index}`}
                    style={{ maxWidth: "100%", maxHeight: "100px" }}
                  />
                ))}
              </div>
            ) : (
              <>
                <Upload size="20" />
                <p>Clique para fazer o upload ou arraste e solte</p>
              </>
            )}
            <input
              type="file"
              multiple
              onChange={handleObrasChange}
            />
          </label>
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
          style={{ display: "block" }}
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
          <div className="grid-layout">
            <label className="label-wrapper">
              <p className="input-label">Nome do Artíficie</p>
              <input
                type="text"
                placeholder="Insira o nome da obra"
              />
            </label>
            <label className="label-wrapper">
              <p className="input-label">Fotógrafo</p>
              <input
                type="text"
                placeholder="Insira o autor da obra"
              />
            </label>
          </div>
          <div className="input-container">
            <p className="input-label">Imagem do Artista</p>
            <label className="file-input-wrapper">
              {previewArtistas.length > 0 ? (
                <div className="preview-container">
                  {previewArtistas.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Artista Preview ${index}`}
                      style={{ maxWidth: "100%", maxHeight: "100px" }}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <Upload size="20" />
                  <p>Clique para fazer o upload ou arraste e solte</p>
                </>
              )}
              <input
                type="file"
                multiple
                onChange={handleArtistasChange}
              />
            </label>
          </div>
          <button
            onClick={handleNewArtista}
            className="submit-btn">
            Submeter
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
          <div className="grid-layout">
            <label className="label-wrapper">
              <p className="input-label">Nome da Igreja</p>
              <input
                type="text"
                placeholder="Insira o nome da obra"
              />
            </label>
            <label className="label-wrapper">
              <p className="input-label">Fotógrafo</p>
              <input
                type="text"
                placeholder="Insira o autor da obra"
              />
            </label>
          </div>
          <label className="label-wrapper">
            <p className="input-label">Descrição</p>
            <textarea placeholder="Insira uma descrição da obra" />
          </label>
          <div className="grid-layout">
            <label className="label-wrapper">
              <p className="input-label">Fontes Bibliográficas</p>
              <textarea placeholder="Insira as fontes" />
            </label>
            <label className="label-wrapper">
              <p className="input-label">Referências Bibliográficas</p>
              <textarea placeholder="Insira as fontes" />
            </label>
          </div>

          <div className="input-container">
            <p className="input-label">Imagens da Igreja</p>
            <label className="file-input-wrapper">
              {previewIgrejas.length > 0 ? (
                <div className="preview-container">
                  {previewIgrejas.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Igreja Preview ${index}`}
                      style={{ maxWidth: "100%", maxHeight: "100px" }}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <Upload size="20" />
                  <p>Clique para fazer o upload ou arraste e solte</p>
                </>
              )}
              <input
                type="file"
                multiple
                onChange={handleIgrejasChange}
              />
            </label>
          </div>
          <button
            style={{ display: "block", width: "100%" }}
            onClick={handleNewIgreja}
            className="submit-btn">
            Submeter
          </button>
        </div>
      </Modal>
    </Container>
  );
};

export default DashForm;
