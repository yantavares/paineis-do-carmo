import { faLaptop, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Assistant from "./assistant";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { PreventRightClickProvider } from "./context/PreventRightClickContext";
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

interface Message {
  sender: "user" | "bot";
  text: string;
}

function Layout({ children }) {
  const [showAssistant, setShowAssistant] = useState(false);
  const [conversation, setConversaation] = useState<Message[]>([
    { sender: "bot", text: "Olá! Como posso te ajudar?" },
  ]);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 860);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 860);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-container">
      <ScrollToTop />
      <Header isMobile={isMobile} />
      <main className="main-content">{children}</main>
      <Footer isMobile={isMobile} />

      <div
        className="assistant-button"
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
            <Assistant
              setShowAssistant={setShowAssistant}
              conversation={conversation}
              setConversation={setConversaation}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
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
                  style={{ color: colors.mainColor }}
                />
              </div>
            }
          >
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />

                <Route
                  path="submit"
                  element={
                    <ProtectedRoute>
                      <SubmitPage />
                    </ProtectedRoute>
                  }
                />

                <Route path="pesquisa/:selected" element={<SearchPage />} />

                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <DashbordPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="pesquisa/igrejas/:state"
                  element={<ChurchState />}
                />

                <Route path="topicos/:tag" element={<TagDetail />} />

                <Route path="item/:id" element={<PaintingDetail />} />

                <Route path="item/paintings/:id" element={<PaintingDetail />} />

                <Route path="item/churches/:id" element={<ChurchDetail />} />

                <Route path="sobre" element={<AboutPage />} />

                <Route path="sobre" element={<AboutPage />} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </Suspense>
        </BrowserRouter>
      </PreventRightClickProvider>
    </AuthProvider>
  );
}

export default App;
