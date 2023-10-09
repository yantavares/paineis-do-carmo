import PaintingDescription from "../../components/PaintingDesciption";
import Engravings from "../../components/Engravings";
import { DetailContainer } from "./styles";

const PaintingDetail = () => {
  return (
    <DetailContainer>
      <PaintingDescription />
      <Engravings />
    </DetailContainer>
  );
};
export default PaintingDetail;
