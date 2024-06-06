import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import { PreventRightClickProvider } from "./providers/PreventRightClickContext";
import ScrollToTop from "./utils/scrollToTop";

const Home = lazy(() => import("src/pages/Home"));
const LoginPage = lazy(() => import("src/pages/LoginPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const ChurchState = lazy(() => import("./pages/ChurchState"));
const TagDetail = lazy(() => import("./pages/TagDetail"));
const AboutPage = lazy(() => import("./pages/About"));
const PaintingDetail = lazy(() => import("src/pages/Details/PaintingDetail"));
const ChurchDetail = lazy(() => import("src/pages/Details/ChurchDetail"));
const ArtistDetail = lazy(() => import("src/pages/Details/ArtistDetail"));

function App() {
  return (
    <PreventRightClickProvider>
      <BrowserRouter>
        <ScrollToTop />
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
              path="/paineis-do-carmo/pesquisa/igrejas/:state"
              element={<ChurchState />}
            />
            <Route path="/pesquisa/igrejas/:state" element={<ChurchState />} />
            <Route
              path="/paineis-do-carmo/pesquisa/"
              element={<Navigate to="/paineis-do-carmo/pesquisa/obras" />}
            />
            <Route path="/topicos/:tag" element={<TagDetail />} />
            <Route
              path="/paineis-do-carmo/topicos/:tag"
              element={<TagDetail />}
            />
            <Route path="/item/:id" element={<PaintingDetail />} />
            <Route
              path="/paineis-do-carmo/item/paintings/:id"
              element={<PaintingDetail />}
            />
            <Route path="/item/paintings/:id" element={<PaintingDetail />} />

            <Route
              path="/paineis-do-carmo/item/churches/:id"
              element={<ChurchDetail />}
            />
            <Route path="/item/churches/:id" element={<ChurchDetail />} />

            <Route
              path="/paineis-do-carmo/item/artists/:id"
              element={<ArtistDetail />}
            />
            <Route path="/item/artists/:id" element={<ArtistDetail />} />

            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/paineis-do-carmo/sobre" element={<AboutPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </PreventRightClickProvider>
  );
}

export default App;
