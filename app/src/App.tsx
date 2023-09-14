import { useState } from "react";
import garfield from "./assets/garfield.jpeg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
        }}
      >
        <h1>Paineis do Carmo (Acabamo o PIBIC)</h1>
        <img src={garfield} alt="garfield with hat" height="400px" />
        <h2>Qauntas pessoas acharam esse garfield fofo ^ </h2>
        <h3>{count}</h3>
        <button style={{ width: "15%" }} onClick={() => setCount(count + 1)}>
          Eu!!!
        </button>
      </div>
    </>
  );
}

export default App;
