// import CircularProgress from "@mui/material/CircularProgress";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExamplePage from "src/pages/ExamplePage";
import "src/App.css";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="">
        <Routes>
          <Route path="/" element={<ExamplePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
