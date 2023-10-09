import EngravingCarousel from "../EngravingCarousel";
import { EngravingTitle, EngravingsContainer } from "./styles";

const Engravings = () => {
  return (
    <EngravingsContainer>
      <EngravingTitle>Gravuras</EngravingTitle>
      <EngravingCarousel />
    </EngravingsContainer>
  );
};
export default Engravings;
