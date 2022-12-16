import {React,useEffect,useState,useContext} from "react";
import styled from 'styled-components';
import dayjs from "dayjs";
import locale from  "dayjs/locale/pt-br";
import axios from "axios";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function Today(){

    const navigate = useNavigate();

    const [transactions,setTransactions]=useState([]);
    
    const { user , setUser} = useContext(UserContext);
    
    const {name,token} = user;
 
    const now = dayjs().locale("pt-br");

    function loadTransactions(){
        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
        };

        const promise = axios.get(process.env.REACT_APP_BACK_URL+`/transaction`,config);
    
        promise.then(resposta => {
            setTransactions(resposta.data);
        });
        
    }

    useEffect(() => {
        loadTransactions();
        
    }, []);
    let balance=0;
    calcBalance();
    function calcBalance(){
        for(let i=0;i<transactions.length;i++){
            if(transactions[i].type==="positive"){
                console.log(transactions[i]);
                balance+=Number(transactions[i].value);
            }else{
                balance-=Number(transactions[i].value);
            }
            console.log(balance);
        }
    }

    return(
        <>
        <Header>
            <h1>Olá, {name}</h1>     
            <ion-icon onClick={()=>navigate("/")} name="log-out-outline"></ion-icon>
        </Header>
        <Page>
           
            <Register>
                {transactions.length>0?
                <><Column>
                {transactions.map((transaction) => transaction.type==="positive"?(
                    <Container><Row><Data>{transaction.date}</Data>{transaction.description}</Row><h3>R$ {transaction.value}</h3></Container>
                ):(
                    <Container><Row><Data>{transaction.date}</Data>{transaction.description}</Row><h2>R$ {transaction.value}</h2></Container>
                ))}
                </Column>
                <Container><strong>SALDO</strong><>R$ {balance}</></Container></>
                :
                <>
                <Container><Data><strong>Não há registros de entrada ou saída</strong></Data></Container>
                </>}
            </Register>
            <Container>
                <Button onClick={()=>navigate("/adicionar")}>
                    <Column>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <Text>Nova entrada</Text>
                    </Column>
                </Button>
                <Button onClick={()=>navigate("/remover")}>
                    <Column>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <Text>Nova saída</Text>
                    </Column>
                </Button>
            </Container>
        </Page>
        </>
    )
    
}
const Row=styled.div`
display: flex;

`
const Header=styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color:#8C11BE ;
    justify-content: space-between;
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
const Data=styled.h1`font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
margin-right: 10px;
color: #C6C6C6;
`
const Button=styled.button`
        font-family: 'Raleway';
        font-weight: 700;
        width: 155px;
        height: 114px;
        text-align: center;
        background-color: #A328D6;
        color: #FFFFFF;
        font-size: 21px;
        border: none;
        border-radius: 5px;
        display: flex;
        margin:7px;
        justify-content: center;
        align-items: center;
        a{
            text-decoration: none;
        }
`
const Column=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center ;
    justify-content: start;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 5px;
`
const Text=styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;

    color: #FFFFFF;
`
const Page=styled.div`
    margin-bottom: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100vh - 80px);
    overflow-x: scroll;
`
const Register=styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
    width: 90%;
    height: 80%;
    background-color: white;
    border-radius: 5px;
    padding-bottom:10px;
`
const Container=styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    min-width: 70vw;
    width: 95%;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: left;

    h2{
        text-align: right;
        color: #C70000;
    }
    h3{
        text-align: right;
        color: #03AC00;
    }
`