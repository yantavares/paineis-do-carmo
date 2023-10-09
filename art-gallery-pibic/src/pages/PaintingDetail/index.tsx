import PaintingDescription from "../../components/PaintingDesciption";
import EngravingCarousel from "../../components/EngravingCarousel";

const PaintingDetail = () => {
  return (
    <div style={{ padding: "0 10%", display: "flex", flexDirection: "column" }}>
      <PaintingDescription />
      <EngravingCarousel />
    </div>
  );
};
export default PaintingDetail;
