import "./login.css";
import Logo from "../../assets/Logo.svg";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { setItem } from "../../utils/storage";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });

  function handleChangeInputValue(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  });

  async function HandleSubmit(event) {
    event.preventDefault();

    try {
      if (!form.email || !form.senha) {
        window.alert("preencha todos os campos");
        return;
      }

      const response = await api.post("/login", {
        email: form.email,
        senha: form.senha,
      });

      const { usuario, token } = response.data;

      setItem("token", token);
      setItem("usuario", JSON.stringify(usuario));
      setItem("userId", usuario.id);
      setItem("userNome", usuario.nome);

      navigate("/home");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container">
      <div className="container-login">
        <img className="logo" src={Logo} width="300" alt="Dindin" />
        <div className="container-info">
          <h1>
            Controle suas <span className="purple">finanças</span>,<br />
            sem planilha chata.
          </h1>
          <p>
            Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você
            tem tudo num único lugar e em um clique de distância.
          </p>
          <Link to="/cadastro">
            <button className="form_register_btn">Cadastre-se</button>
          </Link>
        </div>

        <div className="group_input">
          <form className="form_login" onSubmit={HandleSubmit}>
            <h1>Login</h1>
            <label htmlFor="email" className="form_login_label">
              E-mail
            </label>
            <input
              id="email"
              className="form_login_input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChangeInputValue}
            />
            <label htmlFor="password" className="form_login_label">
              Senha
            </label>
            <input
              id="password"
              className="form_login_input"
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChangeInputValue}
            />

            <button className="form_login_btn" type="submit">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
