import EngravingCarousel from "../EngravingCarousel";
import { EngravingTitle, EngravingsContainer } from "./styles";

import arnold from "../../assets/arnold-van-westerhout2.jpeg";
import claudine from "../../assets/claudine-brunard3.png";
import via from "../../assets/vita-effigiata-et-essercizi2.jpg";

const engravings = [
  {
    id: 1,
    author: "Arnold Vans WesterHout",
    title:
      "Vita effigiata della serafica vergine S. Teresa di Gesú fondatrice dell’Ordine Carmelitano Scalzo. (Prancha XXXVI)",
    image: arnold,
  },
  {
    id: 2,
    author: "Claudine Brunard",
    title:
      "La Vie de Ia séraphique Mère sainte Thérèse de Jesus, fondatrice dês Carmes Déchaussez & dês Carmelites Déchaussées, en figures & en vers François & Latins (Folha 209; Prancha 33)",
    image: claudine,
  },
  {
    id: 3,
    title:
      "Vita effigiata et essercizi affettiui di S. Teresa di giesu maestra di celeste dottrina per il giorno delia sacra comunione (Página 220; Prancha 45)",
    image: via,
    author: "Anônimo",
  },
];

const Engravings = () => {
  return (
    <EngravingsContainer>
      <EngravingTitle>Gravuras</EngravingTitle>
      <EngravingCarousel engravings={engravings} />
    </EngravingsContainer>
  );
};
export default Engravings;
