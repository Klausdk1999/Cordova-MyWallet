import React,{ useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"; 

export default function SignUp() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");
  const [password, setPassword] = useState("");

  function submitData(event) {
    event.preventDefault();

    let postObject=
        {
            email ,
            password,
            name,
            passwordConfirmation
        };
    
    const promise=axios.post(process.env.REACT_APP_BACK_URL+`/cadastrar`,postObject);

    promise.then(resposta => {
        setEmail("");
        setName("");
        setpasswordConfirmation("");
        setPassword("");
        navigate("/");
        console.log(resposta.data);
    });
    promise.catch((error) => {
        alert("Falha ao fazer cadastro");
        console.log(error.message)
      });
  }

  return (
    <>
        
      <Container>
        <Logo>MyWallet</Logo>
        <Form onSubmit={submitData}>
            <input type="text" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name} />
            <input type="text" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <input type="text"  placeholder="Confirme sua senha" onChange={(e) => setpasswordConfirmation(e.target.value)} value={passwordConfirmation} />
            <button type="submit">Cadastrar</button>
        </Form>
        <Link to='/'>Já tem uma conta? Entre agora!</Link>
      </Container>
    </>  
  );
}
const Logo=styled.h1`
    font-family: 'Saira Stencil One';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    margin-bottom: 35px;
    color: #FFFFFF;
`
const Container=styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 100px;
    background-color: #8C11BE;
    font-family: 'Raleway';
    
    a{
        margin-top: 20px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        text-align: center;
        text-decoration: none;

        color: #FFFFFF;
    }
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 36px;
    margin-left: 36px;
    
    input {
        font-family: 'Raleway';
        font-weight: 700;
        height: 45px;
        margin-right: 36px;
        margin-left: 36px;
        min-width: 303px;
        margin-bottom: 6px;
        border-radius: 5px;
        border: 1px solid #D4D4D4; 
        padding-left:11px ;
        box-sizing: border-box;
    }
    input::placeholder {
        color: #afafaf;
        font-size: 20px;
        font-style: italic;
    }
    button {
        font-family: 'Raleway';
        font-weight: 700;
        min-width: 100px;
        height: 45px;
        margin-right: 36px;
        margin-left: 36px;
        text-align: center;
        background-color: #A328D6;
        color: #FFFFFF;
        font-size: 21px;
        border: none;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        a{
            text-decoration: none;
        }
    }
`