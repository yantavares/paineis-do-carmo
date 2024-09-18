import React, { useState, useEffect, useCallback } from "react";
import { Container } from "./styles";
import { Upload, PlusCircle, X as CloseIcon } from "lucide-react";
import TagInput from "../TagInput";
import Modal from "../../components/Modal";
import { X } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "src/context/AuthContext";
import { Church } from "src/utils/mockData";

function formatErrorMessages(errors: any): string {
  let formattedMessages: string[] = [""];

  errors &&
    errors.length > 0 &&
    errors.forEach((error: any) => {
      formattedMessages.push("- " + error?.message);
    });

  return formattedMessages.join("\n\n");
}

// Custom hooks
const useFilePreview = (initialPreviews = [], initialPhotographers = []) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(initialPreviews);
  const [imageObjects, setImageObjects] =
    useState<{ Base64Image: string; Photographer: string | null }[]>(
      initialPhotographers
    );

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
        const newImageObjects = results.map((result) => ({
          Base64Image: result,
          Photographer: null,
        }));
        setImageObjects((prev) => [...prev, ...newImageObjects]);
        setPreviews((prev) => [...prev, ...results]);
      });
    }
  };

  return { files, previews, imageObjects, handleFileChange };
};

const useSingleFilePreview = (
  initialPreview = "",
  initialPhotographer = "",
  initialName = ""
) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialPreview);
  const [imageObject, setImageObject] = useState<{
    Base64Image: string;
    Photographer: string | null;
    Name: string | null;
  }>({
    Base64Image: initialPreview,
    Photographer: initialPhotographer,
    Name: initialName,
  });

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
            Photographer: initialPhotographer,
            Name: initialName,
          });
          setPreview(base64Image);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return { file, preview, imageObject, handleFileChange };
};

// Components
const GravuraInput: React.FC<{
  index: number;
  gravura: any;
  onGravuraChange: (index: number, gravura: any) => void;
  onRemove: (index: number) => void;
  painting?: any;
}> = ({ index, gravura, onGravuraChange, onRemove, painting }) => {
  const [gravuraName, setGravuraName] = useState(
    painting?.name || gravura.Name || ""
  );
  const [gravuraPhotographer, setGravuraPhotographer] = useState(
    gravura.createdBy || ""
  );

  const { preview, imageObject, handleFileChange } = useSingleFilePreview(
    gravura?.url || "",
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
    <div className="input-container" style={{ marginBottom: "2rem" }}>
      <div className="flex-group">
        <p className="input-label">Gravura {index + 1}</p>
        <button
          onClick={() => onRemove(index)}
          className="close-btn"
          aria-label="Remove Gravura"
        >
          <CloseIcon size={20} />
        </button>
      </div>
      <label className="file-input-wrapper">
        {preview ? (
          <div className="preview-container">
            <img
              src={preview}
              alt="Gravura Preview"
              className="preview-image"
            />
          </div>
        ) : (
          <>
            <Upload size="20" />
            <p>Clique para fazer o upload ou arraste e solte</p>
          </>
        )}
        <input type="file" onChange={handleFileChange} />
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

const DynamicImageInput: React.FC<{
  index: number;
  image: any;
  onImageChange: (index: number, image: any) => void;
  onRemove: (index: number) => void;
  painting?: any;
}> = ({ index, image, onImageChange, onRemove, painting }) => {
  const [photographer, setPhotographer] = useState(
    painting?.photographer || image.Photographer || ""
  );
  const { preview, handleFileChange } = useSingleFilePreview(
    image.url || "",
    photographer,
    ""
  );

  useEffect(() => {
    if (
      preview &&
      (image.Base64Image !== preview || image.Photographer !== photographer)
    ) {
      onImageChange(index, {
        Base64Image: preview,
        Photographer: photographer,
      });
    }
  }, [
    preview,
    photographer,
    index,
    image.Base64Image,
    image.Photographer,
    onImageChange,
  ]);

  return (
    <div className="input-container" style={{ marginBottom: "2rem" }}>
      <div className="flex-group">
        <p className="input-label">Imagem {index + 1}</p>
        <button
          onClick={() => onRemove(index)}
          className="close-btn"
          aria-label="Remove Image"
        >
          <CloseIcon size={20} />
        </button>
      </div>
      <label className="file-input-wrapper">
        {preview ? (
          <div className="preview-container">
            <img
              src={preview}
              alt={`Preview ${index}`}
              className="preview-image"
            />
          </div>
        ) : (
          <>
            <Upload size="20" />
            <p>Clique para fazer o upload ou arraste e solte</p>
          </>
        )}
        <input type="file" onChange={handleFileChange} />
      </label>
      <label className="label-wrapper">
        <p className="input-label">Fotógrafo</p>
        <input
          type="text"
          placeholder="Insira o nome do fotógrafo"
          value={photographer}
          onChange={(e) => {
            setPhotographer(e.target.value);
            onImageChange(index, {
              Base64Image: preview,
              Photographer: e.target.value,
            });
          }}
        />
      </label>
    </div>
  );
};

// Main Form Component
const SubmitPage: React.FC<{ painting?: any; isEdit?: boolean }> = ({
  painting,
  isEdit,
}) => {
  const { token } = useAuth();

  const [photographer, setPhotographer] = useState(
    painting?.Photographer || ""
  );
  const [gravuras, setGravuras] = useState<any[]>(
    painting?.engravings?.map((eng) => ({ ...eng, Base64Image: eng.url })) || []
  );
  const [images, setImages] = useState<any[]>(
    painting?.images?.map((img) => ({ ...img, Base64Image: img.url })) || []
  );
  const [churchImages, setChurchImages] = useState<any[]>(
    painting?.church?.images?.map((img) => ({
      ...img,
      Base64Image: img.url,
    })) || []
  );
  const [allTags, setAllTags] = useState<{ id: string; name: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<
    { id: string; name: string }[]
  >(painting?.tags || []);
  const [newTags, setNewTags] = useState<{ id: string; name: string }[]>([]);
  const [artifices, setArtifices] = useState<any[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [newAuthor, setNewAuthor] = useState<string>();
  const [artisan, setArtisan] = useState(painting?.artisan || "");
  const [church, setChurch] = useState({
    name: painting?.church?.name || "",
    description: painting?.church?.description || "",
    city: painting?.church?.city || "",
    state: painting?.church?.state || "",
    street: painting?.church?.street || "",
    bibliographicSources: painting?.church?.bibliographicSources || "",
    bibliographicReferences: painting?.church?.bibliographicReferences || "",
  });

  const [churches, setChurches] = useState([]);

  const [originalImages, setOriginalImages] = useState<any[]>(
    painting?.images.map((image) => {
      return {
        Base64Image: image.url,
        Photographer: image.photographer,
      };
    }) || []
  );
  const [originalEngravings, setOriginalEngravings] = useState<any[]>(
    painting?.engravings.map((engraving) => {
      return {
        Name: engraving.name,
        Base64Image: engraving.url,
        Photographer: engraving.createdBy,
      };
    }) || []
  );
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [removedEngravings, setRemovedEngravings] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/paintings/artisans`)
      .then((response) => {
        setArtifices(response.data);
      })
      .catch((error) => {
        toast.error("Erro ao buscar os artífices", {
          style: {
            fontSize: "16px",
            padding: "20px",
          },
        });
      });
  }, []);

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

  const [isPublishing, setIsPublishing] = useState(false);

  const [obra, setObra] = useState({
    name: painting?.title || "",
    description: painting?.description || "",
    bibliographicReferences: painting?.bibliographyReference || "",
    bibliographicSources: painting?.bibliographySource || "",
    dateOfCreation: painting?.dateOfCreation || "",
    placement: painting?.placement || "",
    tags: painting?.tags ? painting.tags.map((tag) => tag.name) : [],
    churchId: painting?.church?.id || "",
    authorId: painting?.artisan || "",
    imagens: painting?.images || [],
  });

  const fetchAllTags = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tags/available`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchAllAuthors = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/paintings/artisans`
      );
      setAuthors(response.data.artisans);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchAllChurches = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/churches/authorized`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response2 = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/churches`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const allChurches = response.data.concat(response2.data);

      const uniqueChurches = allChurches.filter(
        (church: Church, index: number, self: any) =>
          index === self.findIndex((c: Church) => c.id === church.id)
      );

      setChurches(uniqueChurches);

      console.log("Churches:", churches);
    } catch (error) {
      console.error("Error fetching churches:", error);
    }
  };

  useEffect(() => {
    fetchAllTags();
    fetchAllChurches();
    fetchAllAuthors();
  }, []);

  useEffect(() => {
    setObra((prevObra) => ({
      ...prevObra,
      imagens: images,
      tags: selectedTags.map((tag) => tag.id),
    }));
  }, [images, selectedTags]);

  const handleNewObra = async () => {
    setIsPublishing(true);
    const existingTagNames = allTags.map((tag) => tag.name.toLowerCase());
    const newTagsToCreate = selectedTags.filter(
      (tag) => !existingTagNames.includes(tag.name.toLowerCase())
    );

    const newTagIds = [];

    for (const newTag of newTagsToCreate) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/tags`,
          { name: newTag.name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const createdTagId = response.data;
        newTagIds.push(createdTagId.toString());

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

    const allTagIds = [
      ...selectedTags.map((tag) => tag.id).filter((id) => id),
      ...newTagIds,
    ];

    setObra((prevObra) => ({
      ...prevObra,
      tags: allTagIds,
    }));

    const newBibliographicReferences = obra.bibliographicReferences
      .split("\n")
      .filter((source) => source.trim() !== "");

    const payload = {
      title: obra.name,
      description: obra.description,
      images: images.map((img) => ({
        base64Image: img.Base64Image,
        photographer: img.Photographer,
      })),
      dateOfCreation: obra.dateOfCreation,
      bibliographySource: obra.bibliographicSources
        .split("\n")
        .filter((source) => source.trim() !== ""),
      bibliographyReference: newBibliographicReferences,
      engravingRequests: gravuras.map((gravura) => ({
        name: gravura.Name,
        base64Image: gravura.Base64Image,
        createdBy: gravura.Photographer,
      })),
      placement: obra.placement,
      artisan: obra.authorId.toString(),
      churchId: obra.churchId.toString(),
      tagIds: allTagIds,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/paintings`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Obra submetida com Sucesso", {
        duration: 3000,
        style: {
          fontSize: "16px",
          padding: "20px",
        },
      });

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
      const errorResponse = error?.response?.data?.violations || null;

      let formattedErrorMessages = formatErrorMessages(errorResponse);

      if (formattedErrorMessages === "") {
        formattedErrorMessages =
          "Imagem muito grande ou inválida. Por favor, tente novamente com uma imagem menor.";
      }

      console.error("Error posting data:", error);
      toast.error(`Erro ao submeter a obra: ${formattedErrorMessages}`, {
        duration: 3000,
        style: {
          fontSize: "16px",
          padding: "20px",
        },
      });
    }
    setIsPublishing(false);
  };

  const handleUpdateObra = async () => {
    setIsPublishing(true);
    const existingTagNames = allTags.map((tag) => tag.name.toLowerCase());
    const newTagsToCreate = selectedTags.filter(
      (tag) => !existingTagNames.includes(tag.name.toLowerCase())
    );

    const newTagIds = [];

    for (const newTag of newTagsToCreate) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/tags`,
          { name: newTag.name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const createdTagId = response.data;
        newTagIds.push(createdTagId);

        const updatedSelectedTags = selectedTags.map((tag) =>
          tag.name.toLowerCase() === newTag.name.toLowerCase()
            ? { ...tag, id: createdTagId }
            : tag
        );
        setSelectedTags(updatedSelectedTags);
      } catch (error) {
        console.error(`Error creating tag "${newTag.name}":`, error);
        toast.error(`Erro ao criar a tag "${newTag.name}": ${error.message}`);
      }
    }

    const allTagIds = [
      ...selectedTags.map((tag) => tag.id).filter((id) => id),
      ...newTagIds,
    ];

    setObra((prevObra) => ({
      ...prevObra,
      tags: allTagIds,
    }));

    const containsObjectWithKey = (array, key, value) => {
      return array.some((item) => item[key] === value);
    };

    const payload = {
      churchId: obra.churchId,
      title: obra.name,
      description: obra.description,
      dateOfCreation: obra.dateOfCreation,
      bibliographySource: obra.bibliographicSources,
      bibliographyReference: [...obra.bibliographicReferences],
      placement: obra.placement,
      artisan: obra.authorId.toString(),
      images: images
        .filter(
          (img) =>
            !containsObjectWithKey(
              originalImages,
              "Base64Image",
              img.Base64Image
            )
        ) // Only include new images
        .map((img) => ({
          base64Image: img.Base64Image,
          photographer: img.Photographer,
        })),
      engravings: gravuras
        .filter(
          (gravura) =>
            !containsObjectWithKey(
              originalEngravings,
              "Base64Image",
              gravura.Base64Image
            )
        )
        .map((gravura) => ({
          name: gravura.Name,
          base64Image: gravura.Base64Image,
          createdBy: gravura.Photographer,
        })),
      urlImagesToRemove: removedImages,
      urlEngravingsToRemove: removedEngravings,
      tagIds: allTagIds,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/paintings/${painting.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Obra atualizada com sucesso", {
        duration: 3000,
        style: {
          fontSize: "16px",
          padding: "20px",
        },
      });

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
      console.error("Error updating data:", error);

      // TODO fix error handling
      toast.error(`Erro ao atualizar a obra: ${error.response.data.detail}`, {
        duration: 3000,
        style: {
          fontSize: "16px",
          padding: "20px",
        },
      });
    }
    setIsPublishing(false);
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
    const gravura = gravuras[index];
    setRemovedEngravings((prev) => [...prev, gravura.Base64Image]); // Add URL to removedEngravings array
    setGravuras((prevGravuras) => prevGravuras.filter((_, i) => i !== index));
  };

  const handleAddImage = () => {
    setImages((prevImages) => [
      ...prevImages,
      { Base64Image: "", Photographer: "" },
    ]);
  };

  const handleImageChange = (index, image) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = image;
      return newImages;
    });
  };

  const handleRemoveImage = (index) => {
    const image = images[index];
    setRemovedImages((prev) => [...prev, image.Base64Image]); // Add URL to removedImages array
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
    setChurchImages((prevChurchImages) =>
      prevChurchImages.filter((_, i) => i !== index)
    );
  };

  const handleNewChurch = async () => {
    setIsPublishing(true);
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
      bibliographySource: [church.bibliographicSources],
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/churches`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Igreja adicionada com sucesso!", {
        duration: 3000,
        style: {
          fontSize: "16px",
          padding: "20px",
        },
      });

      setChurches((prevChurches) => [...prevChurches, response.data]);
      setObra((prevObra) => ({ ...prevObra, churchId: response.data }));
      setIsChurchModalOpen(false);
      fetchAllChurches();

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
      const errorResponse = error?.response?.data?.violations || null;
      let formattedErrorMessages = formatErrorMessages(errorResponse);

      if (formattedErrorMessages === "") {
        formattedErrorMessages =
          "Imagem muito grande ou inválida. Por favor, tente novamente com uma imagem menor.";
      }

      console.error("Error posting new church:", error);
      toast.error(`Erro ao adicionar igreja: ${formattedErrorMessages}`, {
        style: {
          fontSize: "16px",
          padding: "20px",
        },
      });
    }
    setIsPublishing(false);
  };

  const handleNewAuthor = (newAuthor: string) => {
    setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
    setObra((prevObra) => ({ ...prevObra, authorId: newAuthor }));
    setIsAuthorModalOpen(false);
  };

  return (
    <Container>
      <Toaster />
      <div className="form-container">
        <h1 className="submit-title">
          {isEdit ? "Editar Obra" : "Submeta uma Obra"}
        </h1>
        <p className="submit-description">
          {isEdit
            ? "Edite a obra selecionada"
            : "Os campos marcados com * são obrigatórios."}
        </p>
        <div className="form-fields-container">
          <label className="label-wrapper">
            <p className="input-label">Nome da Obra *</p>
            <input
              type="text"
              placeholder="Insira o nome da obra"
              value={obra.name}
              onChange={(e) => setObra({ ...obra, name: e.target.value })}
            />
          </label>
          <div className="grid-layout">
            <label className="label-wrapper">
              <p className="input-label">Igreja *</p>
              <div className="flex-layout">
                <select
                  value={obra.churchId}
                  onChange={(e) =>
                    setObra({ ...obra, churchId: e.target.value })
                  }
                >
                  <option value="">Selecione uma igreja</option>
                  {churches.map((church) => (
                    <option key={church.id} value={church.id}>
                      {church.name}
                    </option>
                  ))}
                </select>
                <button
                  className="church-form"
                  style={{
                    height: "40px",
                    display: "grid",
                    placeContent: "center",
                  }}
                  onClick={() => {
                    setIsChurchModalOpen(true);
                    setChurch({
                      name: "",
                      description: "",
                      city: "",
                      state: "",
                      street: "",
                      bibliographicSources: "",
                      bibliographicReferences: "",
                    });
                  }}
                >
                  <PlusCircle size={20} />
                </button>
              </div>
            </label>
            <label className="label-wrapper">
              <p className="input-label">Autor</p>
              <div className="flex-layout">
                <select
                  value={obra.authorId}
                  onChange={(e) =>
                    setObra({ ...obra, authorId: e.target.value })
                  }
                >
                  <option value="">Selecione um Artíficie</option>
                  {authors.map((author) => (
                    <option key={author.toString()} value={author.toString()}>
                      {author}
                    </option>
                  ))}
                </select>
                <button
                  className="author-form"
                  style={{
                    height: "40px",
                    display: "grid",
                    placeContent: "center",
                  }}
                  onClick={() => setIsAuthorModalOpen(true)}
                >
                  <PlusCircle size={20} />
                </button>
              </div>
            </label>
          </div>
          <label className="label-wrapper" style={{ marginBottom: "1rem" }}>
            <p className="input-label">Descrição</p>
            <textarea
              placeholder="Insira uma descrição da obra"
              value={obra.description}
              onChange={(e) =>
                setObra({ ...obra, description: e.target.value })
              }
            />
          </label>
          {/* <p style={{ fontSize: 12 }}>
            Observação: Referências Bibliográficas devem ser separadas por Enter
            (uma linha por referência)
          </p> */}
          <div className="grid-layout">
            <label className="label-wrapper">
              <p className="input-label">Fonte Historiográfica</p>
              <textarea
                placeholder="Exemplo: fonte1"
                value={obra.bibliographicSources}
                onChange={(e) =>
                  setObra({ ...obra, bibliographicSources: e.target.value })
                }
              />
            </label>
            <label className="label-wrapper">
              <p className="input-label">Referências Bibliográficas</p>
              <textarea
                placeholder="Insira as referências (uma por linha)"
                value={obra.bibliographicReferences}
                onChange={(e) =>
                  setObra({ ...obra, bibliographicReferences: e.target.value })
                }
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
                onChange={(e) =>
                  setObra({ ...obra, dateOfCreation: e.target.value })
                }
              />
            </label>
            <label className="label-wrapper">
              <p className="input-label">Onde está Posicionada</p>
              <input
                type="text"
                placeholder="Teto da igreja"
                value={obra.placement}
                onChange={(e) =>
                  setObra({ ...obra, placement: e.target.value })
                }
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
            <p className="input-label">Imagens da Obra *</p>
            {images.map((image, index) => (
              <DynamicImageInput
                key={index}
                index={index}
                image={image}
                onImageChange={handleImageChange}
                onRemove={handleRemoveImage}
                painting={image}
              />
            ))}
            <button
              onClick={handleAddImage}
              className="add-gravura-btn"
              style={{ marginBottom: "2rem" }}
            >
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
            painting={gravura}
          />
        ))}
        <button
          style={{ display: "block", width: "100%" }}
          onClick={handleAddGravura}
          className="add-gravura-btn"
        >
          Adicionar Gravura
        </button>
        <button
          onClick={isEdit ? handleUpdateObra : handleNewObra}
          className="submit-btn"
          disabled={isPublishing}
        >
          {isEdit ? "Atualizar" : "Submeter"}
        </button>
      </div>

      {/* Modal for Author Form */}
      <Modal
        isOpen={isAuthorModalOpen}
        onClose={() => setIsAuthorModalOpen(false)}
      >
        <div className="form-container">
          <div className="modal-header">
            <div className="flex-group">
              <h1 className="submit-title">Crie um novo Artíficie</h1>
              <button
                onClick={() => setIsAuthorModalOpen(false)}
                aria-label="Close modal"
                className="close-btn"
              >
                <X />
              </button>
            </div>
          </div>
          <p className="submit-description">
            Adicione um novo artíficie ao banco de dados
          </p>
          <div className="form-fields-container">
            <label className="label-wrapper">
              <p className="input-label">Nome do Artífice</p>
              <input
                type="text"
                placeholder="Insira o nome do Artífice"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
              />
            </label>
          </div>
          <button
            onClick={() => handleNewAuthor(newAuthor)}
            className="submit-btn"
          >
            Adicionar Artífice
          </button>
        </div>
      </Modal>

      {/* Modal for Church Form */}
      <Modal
        isOpen={isChurchModalOpen}
        onClose={() => setIsChurchModalOpen(false)}
      >
        <div className="form-container">
          <div className="modal-header">
            <div className="flex-group">
              <h1 className="submit-title">Crie uma nova Igreja</h1>
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
                  value={church.name}
                  onChange={(e) =>
                    setChurch({ ...church, name: e.target.value })
                  }
                />
              </label>
              <label className="label-wrapper">
                <p className="input-label">Cidade *</p>
                <input
                  type="text"
                  placeholder="Insira o nome da igreja"
                  value={church.city}
                  onChange={(e) =>
                    setChurch({ ...church, city: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="grid-layout">
              <label className="label-wrapper">
                <p className="input-label">Estado *</p>
                <select
                  value={church.state}
                  onChange={(e) =>
                    setChurch({ ...church, state: e.target.value })
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
                  value={church.street}
                  onChange={(e) =>
                    setChurch({ ...church, street: e.target.value })
                  }
                />
              </label>
            </div>
            <label className="label-wrapper">
              <p className="input-label">Descrição</p>
              <textarea
                placeholder="Insira uma descrição da obra"
                value={church.description}
                onChange={(e) =>
                  setChurch({ ...church, description: e.target.value })
                }
              />
            </label>
            <div className="grid-layout">
              <label className="label-wrapper">
                <p className="input-label">Fontes Bibliográficas</p>
                <textarea
                  placeholder="Insira as fontes"
                  value={church.bibliographicSources}
                  onChange={(e) =>
                    setChurch({
                      ...church,
                      bibliographicSources: e.target.value,
                    })
                  }
                />
              </label>
              <label className="label-wrapper">
                <p className="input-label">Referências Bibliográficas</p>
                <textarea
                  placeholder="Insira as fontes"
                  value={church.bibliographicReferences}
                  onChange={(e) =>
                    setChurch({
                      ...church,
                      bibliographicReferences: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className="input-container">
              <p className="input-label">Imagens da Igreja *</p>
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
                className="add-gravura-btn"
              >
                Adicionar Imagem
              </button>
            </div>
          </div>
          <button
            disabled={isPublishing}
            onClick={handleNewChurch}
            className="submit-btn"
          >
            Submeter
          </button>
        </div>
      </Modal>
    </Container>
  );
};

export default SubmitPage;
