import { CircularProgress } from "@mui/material";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "src/pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paineis-do-carmo" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
