import React from "react";
import { useState } from "react";

import { Container } from "./styles";
import googleLogo from "../../assets/utils/google_symbol.svg.png";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "src/context/AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const handleGoogleLogin = (credentialResponse: { credential: any }) => {
    const token = credentialResponse.credential;

    const decoded = jwtDecode(token);
    console.log("Usuário Google:", decoded);

    login(token);
    navigate("/dashboard");
  };

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        email,
        password,
      })
      .then((response) => {
        login(response.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        toast.error("Usuário ou senha incorretos");
      });
  };

  return (
    <div
      style={{
        paddingTop: "6rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <div style={{ fontSize: "1.6rem" }}>
          <Toaster />
        </div>
        <h3 className="login-title">Login</h3>
        <p className="login-description">
          Faça login para buscar obras <br /> no nosso banco de dados
        </p>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.log("Erro no login")}
        />
        <div className="divider"></div>
        <form
          className="form-container"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <label className="label-wrapper">
            <p className="input-label">Email</p>
            <input
              type="text"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="label-wrapper">
            <p className="input-label">Senha</p>
            <input
              type="password"
              placeholder="Insira sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="flex-group">
            <button className="login-btn">Login</button>
          </div>
        </form>
        <p className="register-cta">
          Não tem uma conta ainda? <a href="register">Registre-se agora</a>
        </p>
      </Container>
    </div>
  );
};
export default LoginPage;
