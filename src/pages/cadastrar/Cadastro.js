import "./cadastro.css";
import Logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cadastrar } from "../../utils/funcoes";

function Register() {
  const rota = "/usuario";

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmacaoSenha: "",
  });

  function handleChangeInputValue(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleClearForm() {
    setForm({ nome: "", email: "", senha: "", confirmacaoSenha: "" });
    return;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (!form.nome || !form.email || !form.senha) {
        window.alert("Todos os campos são obirgatórios!");
        return;
      }

      if (form.senha.length < 8) {
        window.alert("Informe uma senha com mínimo 8 caracteres!");
        return;
      }
      if (form.senha !== form.confirmacaoSenha) {
        window.alert("As senhas não conferem!");
        return;
      }

      const dataUser = {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
      };

      const response = await cadastrar(rota, dataUser);
      console.log(response);
      if (response.status === 201) {
        window.alert("Registro realizado com sucesso!");
        handleClearForm();

        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container_register">
      <img className="logo" src={Logo} width="300" alt="Dindin" />
      <form className="form_register" onSubmit={handleSubmit}>
        <h1>Cadastro</h1>

        <div className="group_input">
          <label htmlFor="name" className="form_register_label">
            Nome
          </label>
          <input
            id="name"
            className="form_register_input"
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChangeInputValue}
          />
        </div>

        <div className="group_input">
          <label htmlFor="email" className="form_register_label">
            E-mail
          </label>
          <input
            id="email"
            className="form_register_input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChangeInputValue}
          />
        </div>

        <div className="group_input">
          <label htmlFor="password" className="form_register_label">
            Senha
          </label>
          <input
            id="senha"
            className="form_register_input"
            type="password"
            name="senha"
            minLength={8}
            value={form.senha}
            onChange={handleChangeInputValue}
          />
        </div>

        <div className="group_input">
          <label htmlFor="password" className="form_register_label">
            Confirmação de senha
          </label>
          <input
            id="confirmacaoSenha"
            className="form_register_input"
            type="password"
            name="confirmacaoSenha"
            value={form.confirmacaoSenha}
            onChange={handleChangeInputValue}
          />
        </div>

        <button className="form_register__btn" type="submit">
          Cadastrar
        </button>
        <Link to="/">
          <button className="form_register_link" href="/">
            Já tem cadastro? Clique aqui!
          </button>
        </Link>
      </form>
      <span className="error"></span>
    </div>
  );
}

export default Register;
