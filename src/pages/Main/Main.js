import Login from "../Login/Login";
import "./Main.css";
import { Routes, Route } from "react-router-dom";
import Cadastro from "../cadastrar/Cadastro";
import Home from "../Home/Home";

function Main() {
  return (
    //rotas refatorar component
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default Main;
