import {React,useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Positive from "./Positive"
import Main from "./Main";
import Negative from "./Negative";
import UserContext from "../context/UserContext";

export default function App(){
    const [user, setUser] = useState({});
    return(
        <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/cadastro" element={<SignUp/>} />
                <Route path="/principal" element={<Main/>} />
                <Route path="/adicionar" element={<Positive/>} />
                <Route path="/remover" element={<Negative/>} />
            </Routes>
        </BrowserRouter>
        </UserContext.Provider>
    );
}

