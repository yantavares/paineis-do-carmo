import PaintingDescription from "../../components/PaintingDesciption";
import Engravings from "../../components/Engravings";

const PaintingDetail = () => {
  return (
    <div style={{ padding: "0 10%", display: "flex", flexDirection: "column" }}>
      <PaintingDescription />
      <Engravings />
    </div>
  );
};
export default PaintingDetail;
