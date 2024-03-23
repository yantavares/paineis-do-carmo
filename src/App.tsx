import { CircularProgress } from "@mui/material";
import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "src/pages/Home";
import LoginPage from "src/pages/LoginPage";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import SearchPage from "./pages/SearchPage";

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

          <Route path="/pesquisa/:selected" element={<SearchPage />} />
          <Route
            path="/paineis-do-carmo/pesquisa/:selected"
            element={<SearchPage />}
          />
          <Route
            path="/paineis-do-carmo/pesquisa/"
            element={<Navigate to="/paineis-do-carmo/pesquisa/obras" />}
          />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
