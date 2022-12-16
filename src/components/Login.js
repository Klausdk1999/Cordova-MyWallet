import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { React, useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { ThreeDots } from "react-loader-spinner";
import logo from "./media/MyWallet.png";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  function Login(event) {
    event.preventDefault();
    setIsLoading(true);
    const postLogin = {
      email,
      password,
    };

    const promise = axios.post(
      process.env.REACT_APP_BACK_URL + `/login`,
      postLogin
    );

    promise.then((resposta) => {
      setEmail("");
      setPassword("");
      setIsLoading(false);
      setUser({
        name: resposta.data.name,
        token: resposta.data.token,
      });
      navigate("/principal");
    });
    promise.catch((error) => {
      alert("Falha ao fazer login");
      console.log(error.message)
      setPassword("");
      setIsLoading(false);
    });
  }

  return (
    <Container>
      <Logo>MyWallet</Logo>
      {isLoading ? (
        <Form background={"#f2f2f2"} color={"#afafaf"}>
          <input
            disabled
            type="email"
            id="email"
            value={email}
            placeholder="E-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            disabled
            type="password"
            id="password"
            value={password}
            placeholder="Senha"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled opacity={0.7}>
            {<ThreeDots color={"#ffffff"} width={51} />}
          </button>
        </Form>
      ) : (
        <Form background={"#ffffff"} color={"#000000"} onSubmit={Login}>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="E-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Senha"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </Form>
      )}
      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </Container>
  );
}
const Logo = styled.h1`
  font-family: "Saira Stencil One";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 50px;
  margin-bottom: 35px;
  color: #ffffff;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 100px;
  background-color: #8c11be;
  font-family: "Raleway";

  a {
    margin-top: 20px;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    text-decoration: none;

    color: #ffffff;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 36px;
  margin-left: 36px;

  input {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;

    height: 45px;
    margin-right: 36px;
    margin-left: 36px;
    min-width: 100px;
    margin-bottom: 6px;
    border-radius: 5px;
    border: 1px solid #d4d4d4;
    padding-left: 11px;
    color: ${(props) => props.color};
    background-color: ${(props) => props.background};
  }
  input::placeholder {
    color: darkgray;
    font-size: 20px;
    font-style: italic;
  }
  button {
    font-family: "Raleway";
    font-weight: 700;
    min-width: 100px;
    height: 45px;
    margin-right: 36px;
    margin-left: 36px;
    text-align: center;
    background-color: #a328d6;
    color: #ffffff;
    font-size: 21px;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      text-decoration: none;
    }
  }
`;
