import "./styles.css";
import { useState } from "react";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import Close from "../../assets/close.svg";
import { useNavigate } from "react-router-dom";

function EditUser({
  visible,
  id = "modal",
  onClose = () => {
    visible(false);
  },
}) {
  const userData = JSON.parse(getItem("usuario"));
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: userData.nome,
    email: userData.email,
    senha: "",
    confirmacaoSenha: "",
  });

  const handleOutsideClick = (event) => {
    console.log(event.target.id);
    if (event.target.id === id) onClose();
  };

  function handleChangeInputValue(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (
        !form.nome ||
        !form.email ||
        !form.senha ||
        form.senha !== form.confirmacaoSenha
      ) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${getItem("token")}`,
        },
      };

      const updateData = {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
      };

      const response = await api.put("/usuario", updateData, config);

      if (response.status === 204) {
        setAlert(true);
        handleSuccess();
      } else {
        setAlert(false);
        handleFail();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleFail() {
    setShowAlert(!showAlert);
    setTimeout(() => {
      setShowAlert(!showAlert);
      navigate("/", { replace: true });
    }, 2000);
  }

  function handleSuccess() {
    setShowAlert(!showAlert);
    setTimeout(() => {
      setShowAlert(!showAlert);
      navigate("/");
    }, 5000);
  }

  return (
    <div id={id} className="container-put" onClick={handleOutsideClick}>
      <form className="form-put_register" onSubmit={handleSubmit}>
        <button onClick={onClose} className="btn-close">
          <img className="close-form" src={Close} alt="close" />
        </button>

        <h1>Editar Perfil</h1>

        <div className="group-put_input">
          <label htmlFor="name" className="form-put_register_label">
            Nome
          </label>
          <input
            id="name"
            className="form-put_register_input"
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChangeInputValue}
          />
        </div>

        <div className="group-put_input">
          <label htmlFor="email" className="form-put_register_label">
            E-mail
          </label>
          <input
            id="email"
            className="form-put_register_input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChangeInputValue}
          />
        </div>

        <div className="group-put_input">
          <label htmlFor="password" className="form-put_register_label">
            Senha
          </label>
          <input
            id="senha"
            className="form-put_register_input"
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChangeInputValue}
          />
        </div>

        <div className="group-put_input">
          <label htmlFor="password" className="form-put_register_label">
            Confirmação de senha
          </label>
          <input
            id="confirmacaoSenha"
            className="form-put_register_input"
            type="password"
            name="confirmacaoSenha"
            value={form.confirmacaoSenha}
            onChange={handleChangeInputValue}
          />
        </div>

        <button className="form-put_register__btn" type="submit">
          Confirmar
        </button>
        {showAlert ? (
          <div className={alert ? "alert green" : "alert red"}>
            {alert
              ? "Registro atualizado com sucesso!"
              : "Ocorreu um erro! verifique os dados."}
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default EditUser;
