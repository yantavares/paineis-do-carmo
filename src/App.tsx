import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Assistant from "./assistant";
import { PreventRightClickProvider } from "./providers/PreventRightClickContext";
import colors from "./utils/colors";
import ScrollToTop from "./utils/scrollToTop";

const Home = lazy(() => import("src/pages/Home"));
const LoginPage = lazy(() => import("src/pages/LoginPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const ChurchState = lazy(() => import("./pages/ChurchState"));
const TagDetail = lazy(() => import("./pages/TagDetail"));
const AboutPage = lazy(() => import("./pages/About"));
const PaintingDetail = lazy(() => import("src/pages/Details/PaintingDetail"));
const ChurchDetail = lazy(() => import("src/pages/Details/ChurchDetail"));
const RegisterPage = lazy(() => import("src/pages/RegisterPage"));
const SubmitPage = lazy(() => import("src/pages/SubmitPage"));
const DashbordPage = lazy(() => import("src/pages/Dashboard"));

function Layout({ children }) {
  const location = useLocation();
  const isDashboardRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/paineis-do-carmo/dashboard");

  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <div className="app-container">
      <ScrollToTop />
      {!isDashboardRoute && <Header />}
      <main className="main-content">{children}</main>
      {!isDashboardRoute && <Footer />}
      {!isDashboardRoute && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
          }}
        >
          {!showAssistant ? (
            <button
              style={{
                backgroundColor: "white",
                opacity: 0.9,
                borderRadius: "1.6rem",
              }}
              onClick={() => setShowAssistant(true)}
            >
              <FontAwesomeIcon icon={faRobot} size="2x" />
            </button>
          ) : (
            <div>
              <Assistant setShowAssistant={setShowAssistant} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <PreventRightClickProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div
              style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress
                size={"10rem"}
                style={{ color: colors.green }}
              />
            </div>
          }
        >
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/paineis-do-carmo" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/paineis-do-carmo/register"
                element={<RegisterPage />}
              />

              <Route path="/submit" element={<SubmitPage />} />
              <Route path="/paineis-do-carmo/submit" element={<SubmitPage />} />

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
              <Route
                path="/pesquisa/igrejas/:state"
                element={<ChurchState />}
              />
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

              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/paineis-do-carmo/sobre" element={<AboutPage />} />

              <Route path="/dashboard/:page" element={<DashbordPage />} />
              <Route
                path="/paineis-do-carmo/dashboard/:page"
                element={<DashbordPage />}
              />
            </Routes>
          </Layout>
        </Suspense>
      </BrowserRouter>
    </PreventRightClickProvider>
  );
}

export default App;
