import "./App.css";
import React from "react";
import Icon from "./assets/baroque-no-bg.png";

function App() {
  return (
    <div
      style={{
        display: "flex",
        height: "8rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img height={"100%"} src={Icon} alt="Museu Barroco" />
      <h1>Museu Barroco</h1>
    </div>
  );
}

export default App;
