import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import temp from "../../assets/temp.png";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const EngravingCarousel = () => {
  return (
    <Carousel
      arrows={false}
      swipeable={true}
      autoPlay={true}
      autoPlaySpeed={2000}
      infinite={true}
      responsive={responsive}
      showDots={true}
      focusOnSelect={true}
      centerMode={true}
      transitionDuration={2000}
      customTransition="transform 2000ms ease-in-out"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "3rem",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <img
          src={temp}
          style={{ maxWidth: "90%", userSelect: "none", pointerEvents: "none" }}
          alt=""
        />
        Item 1
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <img
          src={temp}
          style={{ maxWidth: "90%", userSelect: "none", pointerEvents: "none" }}
          alt=""
        />
        Item 2
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <img
          src={temp}
          style={{ maxWidth: "90%", userSelect: "none", pointerEvents: "none" }}
          alt=""
        />
        Item 3
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <img
          src={temp}
          style={{ maxWidth: "90%", userSelect: "none", pointerEvents: "none" }}
          alt=""
        />
        Item 4
      </div>
    </Carousel>
  );
};

export default EngravingCarousel;
