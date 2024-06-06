import igreja1 from "src/assets/igreja1.jpeg";
import igreja2 from "src/assets/igreja2.jpg";
import pintura1 from "src/assets/pintura1.jpeg";
import pintura2 from "src/assets/pintura2.jpeg";
import artista1 from "src/assets/artista1.jpg";
import artista2 from "src/assets/artista2.jpg";

type Image = {
  url: string;
};

export interface Tag {
  name: string;
}

export interface Church {
  id: number;
  name: string;
  images: Image[];
  street?: string;
  city?: string;
  state?: string;
  tags?: Tag[];
}

export const brazilianChurches: Church[] = [
  {
    id: 1,
    name: "Catedral Metropolitana de Brasília",
    images: [{ url: igreja1 }],
    city: "Brasília",
    state: "DF",
    tags: [{ name: "catedral" }, { name: "moderna" }, { name: "arquitetura" }],
  },
  {
    id: 2,
    name: "Igreja de Nossa Senhora do Brasil",
    images: [{ url: igreja2 }],
    city: "São Paulo",
    state: "SP",
    tags: [{ name: "barroco" }, { name: "igreja" }, { name: "século 18" }],
  },
  {
    id: 3,
    name: "Igreja da Candelária",
    images: [{ url: igreja1 }],
    city: "Rio de Janeiro",
    state: "RJ",
    tags: [{ name: "barroco" }, { name: "igreja" }, { name: "século 18" }],
  },
  {
    id: 4,
    name: "Igreja de São Francisco de Assis",
    images: [{ url: igreja2 }],
    city: "Ouro Preto",
    state: "MG",
    tags: [{ name: "barroco" }, { name: "igreja" }, { name: "século 18" }],
  },
  {
    id: 5,
    name: "Catedral da Sé",
    images: [{ url: igreja1 }],
    city: "São Paulo",
    state: "SP",
    tags: [{ name: "catedral" }, { name: "moderna" }, { name: "arquitetura" }],
  },
];

export interface Painting {
  id: number;
  title: string;
  images: Image[];
  dateOfCreation: number;
  city: string;
  state: string;
  tags: Tag[];
  church?: Church;
}

export const brazilianPaintings: Painting[] = [
  {
    id: 1,
    title: "A Primeira Missa no Brasil",
    images: [{ url: pintura1 }],
    dateOfCreation: 1860,
    city: "Rio de Janeiro",
    state: "RJ",
    tags: [{ name: "pintura" }, { name: "história" }, { name: "brasil" }],
  },
  {
    id: 2,
    title: "Abaporu",
    images: [{ url: pintura2 }],
    dateOfCreation: 1928,
    city: "São Paulo",
    state: "SP",
    tags: [{ name: "pintura" }, { name: "moderna" }, { name: "brasil" }],
  },
  {
    id: 3,
    title: "Retirantes",
    images: [{ url: pintura1 }],
    dateOfCreation: 1944,
    city: "São Paulo",
    state: "SP",
    tags: [{ name: "pintura" }, { name: "social" }, { name: "brasil" }],
  },
  {
    id: 4,
    title: "Guerra e Paz",
    images: [{ url: pintura2 }],
    dateOfCreation: 1956,
    city: "Rio de Janeiro",
    state: "RJ",
    tags: [{ name: "pintura" }, { name: "painel" }, { name: "brasil" }],
  },
  {
    id: 5,
    title: "O Vendedor de Frutas",
    images: [{ url: pintura1 }],
    dateOfCreation: 1893,
    city: "São Paulo",
    state: "SP",
    tags: [{ name: "pintura" }, { name: "realismo" }, { name: "brasil" }],
  },
];

export interface Artist {
  id: number;
  name: string;
  images: Image[];
  specialty: string;
  city: string;
  state: string;
  dateOfBirth: string;
  tags: Tag[];
}

export const brazilianArtists: Artist[] = [
  {
    id: 1,
    name: "Tarsila do Amaral",
    images: [{ url: artista1 }],
    specialty: "Pintura Modernista",
    city: "São Paulo",
    state: "SP",
    dateOfBirth: "1886",
    tags: [{ name: "artista" }, { name: "moderna" }, { name: "brasil" }],
  },
  {
    id: 2,
    name: "Cândido Portinari",
    images: [{ url: artista2 }],
    specialty: "Pintura Social",
    city: "Brodowski",
    state: "SP",
    dateOfBirth: "1886",
    tags: [{ name: "artista" }, { name: "social" }, { name: "brasil" }],
  },
  {
    id: 3,
    name: "Di Cavalcanti",
    images: [{ url: artista1 }],
    specialty: "Pintura Modernista",
    city: "Rio de Janeiro",
    state: "RJ",
    dateOfBirth: "1886",
    tags: [{ name: "artista" }, { name: "moderna" }, { name: "brasil" }],
  },
  {
    id: 4,
    name: "Anita Malfatti",
    images: [{ url: artista2 }],
    specialty: "Expressionismo",
    city: "São Paulo",
    state: "SP",
    dateOfBirth: "1886",
    tags: [{ name: "artista" }, { name: "expressionismo" }, { name: "brasil" }],
  },
  {
    id: 5,
    name: "Lygia Clark",
    images: [{ url: artista1 }],
    specialty: "Escultura e Pintura",
    city: "Belo Horizonte",
    state: "MG",
    dateOfBirth: "1886",
    tags: [{ name: "artista" }, { name: "moderna" }, { name: "brasil" }],
  },
];

export const tags: Tag[] = [
  { name: "arte" },
  { name: "barroco" },
  { name: "igrejas" },
  { name: "pinturas" },
  { name: "artistas" },
  { name: "história" },
  { name: "cultura" },
  { name: "brasil" },
  { name: "moderna" },
  { name: "século 18" },
  { name: "social" },
  { name: "realismo" },
  { name: "expressionismo" },
  { name: "escultura" },
  { name: "painel" },
  { name: "catedral" },
  { name: "arquitetura" },
  { name: "artista" },
  { name: "pintura" },
  { name: "cultural" },
  { name: "arte-sacra" },
];
