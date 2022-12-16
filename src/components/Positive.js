import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import {React, useContext, useState } from 'react';
import UserContext from "../context/UserContext";
import { ThreeDots } from  'react-loader-spinner';
import dayjs from "dayjs";


export default function LoginScreen(){

    const now = dayjs().locale("pt-br");

    const [value, setValue]=useState("");
    const [description,setDescription]=useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);
    const {token} = user;

    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    };

    function Send(event){
        event.preventDefault();
        setIsLoading(true);
        const postTransaction={
            value,
            description,
            type:"positive",
            date:now.format("DD/MM/YY")
        }

        const promise=axios.post(process.env.REACT_APP_BACK_URL+`/transaction`,postTransaction,config);

        promise.then(resposta => {
            setValue("");
            setDescription("");
            setIsLoading(false);
            navigate("/principal");
        });
    }
    
    return(
        <>
        <Header>
            <h1>Nova Entrada</h1>     
            <ion-icon onClick={()=>navigate("/principal")} name="arrow-back-circle-outline"></ion-icon>
        </Header>
        <Container>
            {isLoading ? (
                <Form background={"#f2f2f2"} color={"#afafaf"}>
                    <input disabled id="value" value={value} placeholder="Valor" required onChange={(e)=>setValue(e.target.value)} />
                    <input disabled type="description" id="description" value={description} placeholder="Descrição" required onChange={(e)=>setDescription(e.target.value)} />
                    <button type="submit" disabled opacity={0.7}>{<ThreeDots color={"#ffffff"} width={51} />}</button>
                </Form>
                 ) : ( 
                <Form background={"#ffffff"} color={"#000000"} onSubmit={Send}>
                    <input  id="value" value={value} placeholder="Valor" required onChange={(e)=>setValue(e.target.value)} />
                    <input type="description" id="description" value={description} placeholder="Descrição" required onChange={(e)=>setDescription(e.target.value)} />
                    <button type="submit">Enviar entrada</button>
                </Form>
            )}
        </Container>
        </>
    )
}
const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 36px;
    margin-left: 36px;
    
    input {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;

        height: 45px;
        margin-right: 36px;
        margin-left: 36px;
        min-width:  100px;
        margin-bottom: 6px;
        border-radius: 5px;
        border: 1px solid #D4D4D4; 
        padding-left:11px ;
        color: ${props => props.color};
        background-color: ${props => props.background};
    }
    input::placeholder {
        
        color: darkgray;
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
const Header=styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color:#8C11BE ;
    justify-content: space-between;
    position:fixed;
    top:0;
    right:0;
    h1{
        margin:18px; 
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }
    ion-icon{
        color:white;
        margin:18px;
        width: 30px;
        height: 51px;
        border-radius: 98.5px;
    }

`
const Container=styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 80px;
justify-content: space-between;
width: 90%;
font-family: 'Lexend Deca', sans-serif;
h1{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;

    color: #8C11BE;
}
`