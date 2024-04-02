import igreja1 from "src/assets/igreja1.jpeg";
import igreja2 from "src/assets/igreja2.jpg";
import pintura1 from "src/assets/pintura1.jpeg";
import pintura2 from "src/assets/pintura2.jpeg";
import artista1 from "src/assets/artista1.jpg";
import artista2 from "src/assets/artista2.jpg";

export interface Painting {
  id: number;
  title: string;
  image: string;
  name?: string;
  date?: string | number;
  city?: string;
  state?: string;
}

export interface Artist {
  id: number;
  name: string;
  image: string;
  specialty?: string;
  dateOfBirth?: string;
  city?: string;
  state?: string;
}

export interface Church {
  id: number;
  name: string;
  image: string;
  city?: string;
  state?: string;
}

export const brazilianChurches: Church[] = [
  {
    id: 1,
    name: "Catedral Metropolitana de Brasília",
    image: igreja1,
    city: "Brasília",
    state: "DF",
  },
  {
    id: 2,
    name: "Igreja de Nossa Senhora do Brasil",
    image: igreja2,
    city: "São Paulo",
    state: "SP",
  },
  {
    id: 3,
    name: "Igreja da Candelária",
    image: igreja1,
    city: "Rio de Janeiro",
    state: "RJ",
  },
  {
    id: 4,
    name: "Igreja de São Francisco de Assis",
    image: igreja2,
    city: "Ouro Preto",
    state: "MG",
  },
  {
    id: 5,
    name: "Obra teste",
    image: pintura1,
    city: "São Paulo",
    state: "SP",
  },
];

export const brazilianPaintings: Painting[] = [
  {
    id: 1,
    title: "A Primeira Missa no Brasil",
    image: pintura1,
    date: 1860,
    city: "Rio de Janeiro",
    state: "RJ",
  },
  {
    id: 2,
    title: "Abaporu",
    image: pintura2,
    date: 1928,
    city: "São Paulo",
    state: "SP",
  },
  {
    id: 3,
    title: "Retirantes",
    image: igreja1,
    date: 1944,
    city: "São Paulo",
    state: "SP",
  },
  {
    id: 4,
    title: "Guerra e Paz",
    image: igreja2,
    date: 1956,
    city: "Rio de Janeiro",
    state: "RJ",
  },
  {
    id: 3,
    title: "Retirantes",
    image: igreja1,
    date: 1944,
    city: "São Paulo",
    state: "SP",
  },
];

export const brazilianArtists: Artist[] = [
  {
    id: 1,
    name: "Tarsila do Amaral",
    image: artista1,
    specialty: "Pintura Modernista",
    city: "São Paulo",
    state: "SP",
    dateOfBirth: "1886",
  },
  {
    id: 2,
    name: "Cândido Portinari",
    image: artista2,
    specialty: "Pintura Social",
    city: "Brodowski",
    state: "SP",
    dateOfBirth: "1886",
  },
  {
    id: 3,
    name: "Di Cavalcanti",
    image: artista1,
    specialty: "Pintura Modernista",
    city: "Rio de Janeiro",
    state: "RJ",
    dateOfBirth: "1886",
  },
  {
    id: 4,
    name: "Anita Malfatti",
    image: artista2,
    specialty: "Expressionismo",
    city: "São Paulo",
    state: "SP",
    dateOfBirth: "1886",
  },
  {
    id: 5,
    name: "Lygia Clark",
    image: artista1,
    specialty: "Escultura e Pintura",
    city: "Belo Horizonte",
    state: "MG",
    dateOfBirth: "1886",
  },
];
