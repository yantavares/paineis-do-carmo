import { CircularProgress } from "@mui/material";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "src/pages/Home";
import LoginPage from "src/pages/LoginPage";
import Header from "src/components/Header";
import Footer from "src/components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paineis-do-carmo" element={<Home />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/paineis-do-carmo/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
