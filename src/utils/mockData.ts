import igreja1 from "src/assets/utils/igreja1.jpg";
import igreja2 from "src/assets/utils/igreja2.jpg";
import pintura1 from "src/assets/utils/pintura1.jpg";
import pintura2 from "src/assets/utils/pintura2.jpg";
import pintura3 from "src/assets/utils/pintura3.jpg";
import pintura4 from "src/assets/utils/pintura4.jpg";

type Image = {
  url: string;
  photographer?: string;
};

export interface Tag {
  name: string;
}

export interface Church {
  id: number;
  description?: string;
  bibliographyReference?: string[];
  paintings?: Painting[];
  name: string;
  images: Image[];
  street?: string;
  city?: string;
  state?: string;
  tags?: Tag[];
}

export const brazilianChurches: Church[] = [
  {
    id: 158,
    name: "Igreja de Santa Teresa de Jesus da Ordem Terceira do Carmo do Recife",
    images: [{ url: igreja1 }],
    city: "Recife",
    state: "PE",
    tags: [],
  },
  {
    id: 162,
    name: "Basílica de Nossa Senhora do Carmo",
    images: [{ url: igreja2 }],
    city: "Recife",
    state: "PE",
    tags: [],
  },
];

export interface Engraving {
  name: string;
  url: string;
}

export interface Painting {
  id: number;
  title: string;
  images: Image[];
  dateOfCreation: number | string;
  artisan?: string;
  bibliographyReference?: string[];
  bibliographySource?: string;
  engravings?: Engraving[];
  description?: string;
  city: string;
  state: string;
  tags: Tag[];
  church?: Church;
  placement?: string;
}

export const brazilianPaintings: Painting[] = [
  {
    id: 152,
    title: "A monja Teresa é protegida por Jesus",
    images: [{ url: pintura1 }],
    dateOfCreation: "Século XVIII ",
    city: "Recife",
    state: "PE",
    tags: [
      { name: "teresa" },
      { name: "jesus" },
      { name: "anjo" },
      { name: "sepulveda" },
    ],
  },
  {
    id: 156,
    title: "Visão: Santo Eduardo, rei da Inglaterra ",
    images: [{ url: pintura2 }],
    dateOfCreation: "Século XIX",
    city: "Recife",
    state: "PE",
    tags: [{ name: "eduardo" }, { name: "crucifixo" }, { name: "coroa" }],
  },
  {
    id: 153,
    title: "O Nascimento do Profeta Elias",
    images: [{ url: pintura3 }],
    dateOfCreation: "Segunda metade do século XVIII ",
    city: "Recife",
    state: "PE",
    tags: [
      { name: "santo elias" },
      { name: "profeta" },
      { name: "fogo" },
      { name: "brasa" },
    ],
  },
  {
    id: 154,
    title: "O Profeta Elias e o Profeta Eliseu",
    images: [{ url: pintura4 }],
    dateOfCreation: "Segunda metade do século XVIII  ",
    city: "Recife",
    state: "PE",
    tags: [
      { name: "santo elias" },
      { name: "profeta" },
      { name: "santo eliseu" },
      { name: "arado" },
      { name: "boi" },
      { name: "manto" },
    ],
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
  tag: Tag[];
}

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

export const dataTableRows = [
  {
    id: 1,
    name: "Mona Lisa",
    status: "Approved",
    user: "Leonardo",
    date: "2024-01-01",
  },
  {
    id: 2,
    name: "The Starry Night",
    status: "Pending",
    user: "Vincent",
    date: "2024-02-01",
  },
  {
    id: 3,
    name: "The Persistence of Memory",
    status: "Rejected",
    user: "Salvador",
    date: "2024-03-01",
  },
  {
    id: 4,
    name: "The Scream",
    status: "Approved",
    user: "Edvard",
    date: "2024-04-01",
  },
  {
    id: 5,
    name: "Girl with a Pearl Earring",
    status: "Pending",
    user: "Johannes",
    date: "2024-05-01",
  },
  {
    id: 6,
    name: "Guernica",
    status: "Approved",
    user: "Pablo",
    date: "2024-06-01",
  },
  {
    id: 7,
    name: "The Birth of Venus",
    status: "Rejected",
    user: "Sandro",
    date: "2024-07-01",
  },
  {
    id: 8,
    name: "The Night Watch",
    status: "Pending",
    user: "Rembrandt",
    date: "2024-08-01",
  },
  {
    id: 9,
    name: "American Gothic",
    status: "Approved",
    user: "Grant",
    date: "2024-09-01",
  },
];
